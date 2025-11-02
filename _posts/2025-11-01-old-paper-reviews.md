---
layout: post
title: Paper Review of Old NLP Papers
date: 2025-11-01
description: A review of influential old papers in natural language processing.
tags: machine-learning
featured: True
---

# Premise

This is part of an ongoing series where I revisit influential papers in NLP. Each post will briefly summarize the core ideas, highlight what I found interesting (or confusing), and sometimes include small experiments. The goal isn’t to be exhaustive.

## Attention is All You need (Vaswani et al., 2017)

Written in Oct 30, 2025

Many people consider this the landmark paper that ignited the Transformer revolution.

$$ \text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V $$

This is the mechanism that started it all. Much have changed since then: I will focus on what I found interesting when reading the paper again.

### About Attention Mechanism

> The two most commonly used attention functions are additive attention [2], and dot-product (multiplicative) attention. Dot-product attention is identical to our algorithm, except for the scaling factor of $$\sqrt{d_k}$$. Additive attention computes the compatibility function using a feed-forward network with a single hidden layer. While the two are similar in theoretical complexity, dot-product attention is much faster and more space-efficient in practice, since it can be implemented using highly optimized matrix multiplication code.

This shows that the idea of **attention** itself was not new. Previous [paper](https://arxiv.org/pdf/1409.0473) also introduced attention mechanism. It was used as a middle layer connecting encoder and decoder RNNs. The novelty of this paper was showing that attention mechanism alone can be used to replace RNNs.

That said, I think that the title "Attention Is All You Need" is slightly misleading. When I first read the paper, I assumed attention parameters dominated model size. In reality, most parameters come from the feed forward layers (FFN) within each attention block. Many LLMs use 4 times dimension expansion in the [FFN layer](https://self-supervised.cs.jhu.edu/fa2025/files/slides/transformers-language-models.pdf), with some recent MoE models even more aggressively expanding the FFN dimensions. (95%+ of parameters in case of [OpenAI OSS models](https://arxiv.org/pdf/2508.10925)).

| Component | Complexity   | Parameter Share |
| --------- | ------------ | --------------- |
| Attention | \(O(n^2 d)\) | ~30 %           |
| FFN (MLP) | \(O(n d^2)\) | ~70 %           |

Parameter share numbers are estimates if we use 4x dimension expansion in FFN layers with standard attention.

Furthermore, works have focused on the calculation of the attention weights, which is $$(O(n^2 \cdot d))$$. However, the feed-forward layers also have complexity of $$(O(n \cdot d^2))$$, Since in the earlier days of transformers, $$d$$ was often larger than $$n$$, the feed-forward layers were more computationally expensive on simple tasks.

### About Positional Embeddings

The paper introduced sinusodial positional embedding. That is,

$$ \text{PE}_{(pos, 2i)} = \sin\left(\frac{pos}{10000^{2i/d_{model}}}\right) $$

$$\text{PE}_{(pos, 2i+1)} = \cos\left(\frac{pos}{10000^{2i/d_{model}}}\right) $$

> where pos is the position and i is the dimension. That is, each dimension of the positional encoding corresponds to a sinusoid. The wavelengths form a geometric progression from 2π to 10000 · 2π. We chose this function because we hypothesized it would allow the model to easily learn to attend by relative positions, since for any fixed offset k, $$PE_{pos+k}$$ can be represented as a linear function of $$PE_{pos}$$

So what does this mean? Simply, put, we can design a rotational matrix $$\mathbf{R}^k$$ such that

$$\mathbf{R}^k \cdot PE_{pos} = PE_{pos+k}$$

Such rotational matrix can be created by the following block diagonal matrix.

$$R_i^k = \begin{pmatrix}\cos k / 10000^{2i/ d_{model}} & -\sin k / 10000^{2i/ d_{model}}\\ \sin k / 10000^{2i/ d_{model}}& \cos k / 10000^{2i/ d_{model}}\end{pmatrix}$$

$$
\mathbf{R}^k =
\begin{pmatrix}
R_0 & & & \\
& R_1 & & \\
& & \ddots & \\
& & & R_{d_{model}/2}
\end{pmatrix}.
$$

This also means position embedding difference between two tokens are determined by its relative distance.

I personally find this formulation elegant but slightly lacking. We can express this as:

$$\mathbf{R}^k \times PE_{pos} + emb = PE_{pos + k} + emb$$

However, the attention mechanism is not additive. It uses dot product attention. Thus the following would have made more sense.

$$\mathbf{F}(P(x,pos), k) = P(x, pos + k)$$

$$P(x, pos)$$ here is a function that encodes the position $$pos$$ and token embedding $$x$$ together. A position encoding should have some function $$\mathbf{F}$$ that allows shifting the position by $$k$$ when applied. Rotary Position Embeddings [(RoPE)](https://arxiv.org/pdf/2104.09864) satisfy this property.

The paper also notes that replacing the sinusoidal embedding with a **learnable** one barely affects performance.

### Simple Experiments

1. Sinusodial Embedding vs Learnable.
2. Additive (Bahdanau-style) vs Dot product attention.

For the base transformer implementation, I used the Andrej Karpathy's [minGPT](https://www.youtube.com/watch?v=kCc8FmEb1nY) and evaluated based on the perplexity of the Shakespeare dataset. The code can be found [here](https://github.com/blindTissue/additive-attention-experiment).

There was a minor difficulty in implementing the Bahdanau Attention. The original attention mechanism in the paper (Which connects encoder with decoder) uses the following

$$
    \alpha_{ij} = \frac{\exp(e_{ij})}{\sum_{k=1}^{T_x} \exp(e_{ik})} \quad \\
    e_{ij} = v_a^T \tanh(W_a s_{i - 1} + U_a h_j)
$$

where $$v_a \in \mathbb{R}^n$$, $$W_a \in \mathbb{R}^{n \times m}$$, $$U_a \in \mathbb{R}^{n \times 2m}$$. More detail can be found in the [original paper](https://arxiv.org/pdf/1409.0473).

To fit this implementation to Transformers, I modified the equation a bit.

$$
    e_{ij} = vx_i\tanh(W_q x_i + W_k x_j)
$$

Let head size be denoted $$h$$. Then, we have $$v \in \mathbb{R}^{h}$$, $$W_q \in \mathbb{R}^{h \times h}$$, $$W_k \in \mathbb{R}^{h \times h}$$.

Notice that $$v$$ here is a 1d vector instead of a matrix as in transformer. This was a design choice to be closer to the original Bahdanau attention. The $$q,k$$ vectors are same as the original transformer.

But this approach takes up too much memory in parallel computation. We need to materialize matrix of (B, T, T, h) tensor to parallelize adding the $$q,k$$ vectors. So I used an alternative implementation.

$$
    e_{ij} = v(\tanh(W_q x_i)) + v(\tanh(W_k x_j))
$$

This way, we do not need to materialize the full (B, T, T, h) tensor. The two implemtations are not equivalent, but I think this is a reasonable approximation.

### Results

{% include figure.liquid loading="eager" path="assets/img/paper_review/attention_is_all_you_need/results.png" class="img-fluid rounded z-depth-1" %}

All models produced similar perplexity curves — confirming that both learnable vs. sinusoidal embeddings and additive vs. dot-product attention behave comparably on small datasets.

### Takeaways

- **Attention wasn’t new** — the innovation was using attention-based blocks.
- **FFN layers dominate** parameters, and sometimes, compute — attention is important, but not the whole story.
- **Sinusoidal embeddings** are fixed position embedding which allow relative position encoding via rotation.

## Chain of Thought Prompting Elicits Reasoning in Large Language Models (Wei et al., 2022)

Written on Nov 1, 2025

This paper is widely regarded as the beginning of the "reasoning" era in large language models. **Chain-of-Thought (CoT)** prompting demonstrated that simply adding step-by-step reasoning in prompts dramatically improves performance on arithmetic, commonsense, and symbolic tasks.
CoT directly inspired later frameworks such as [ReAct](https://arxiv.org/pdf/2210.03629) (reasoning + acting) and motivated the development of models explicitly trained on reasoning traces.  
Building on this, researchers began using reinforcement learning on reasoning processes to create “thinking” or “reasoning” models—systems that learn to generate intermediate reasoning steps before producing a final answer. OpenAI's [o1](https://openai.com/index/learning-to-reason-with-llms/) was one of the first marketed LLMs to incorporate these ideas.

### Core Idea

Prompting LLMs with few-shot step-by-step reasoning examples significantly improves performance on complex reasoning tasks. The authors showed that this works on arithmetic, commonsense, and symbolic reasoning benchmarks.

This method worked better than standard few-shot prompting, especially as the model size increased. Models with size less than 10B often degraded in performance with CoT while larger models such as GPT-3 and PaLM 540B showed improved performance.

The authors hypothesize that the ability to reason might be an emergent behavior with model size.

{% include figure.liquid loading="eager" path="assets/img/paper_review/chain_of_thought/chain_of_thought_results.png" class="img-fluid rounded z-depth-1" %}

### Additional Tests

In order to see which aspect of the CoT prompting helped, the authors designed several prompt variants.

{% include figure.liquid loading="eager" path="assets/img/paper_review/chain_of_thought/different_methods.png" class="img-fluid rounded z-depth-1" %}

For GSM8k, they provided models with

1. Standard Prompting (few-shot)
2. Equations only, no reasoning steps.
3. Variable compute only, where the llm was given sequence of dots (...) equal to the original CoT.
4. Chain of Thought After the Answer.
5. Chain of Thought Before the Answer (original CoT).

The results show that only the original CoT prompting significantly improves performance. This suggests that the step-by-step reasoning process itself is crucial.

### Personal Thoughts

I wonder if their claim about model size and emergence still holds true in 2025. We have different training pipelines: training data, model architecture and SFT -> RL is different from 2020. One major problem is that the comparison is not an apples to apples comparison, as recent training data often includes the reasoning rollout. I do think that retesting the claim with curated data, MoE model would be interesting.

Since CoT and its variants are popular methods for prompting, I assumed that some organization would have kept a record of the results. With this, I would have been able to compare the accuracy increase claims on newer models. I couldn't find it, and decided to test on smaller models.

After being unhappy on my own CoT prompts and answer extractor, I used ElutherAI's [LM Evaluation Harness](https://github.com/EleutherAI/lm-evaluation-harness) to prompt and evalute LLM responses from GSM8k. As a side note, I think the uncentralized evaluation for LLMs is quite problematic: Some of the small improvements can be due to a more broad regex extractor, or from the randomness of the evaluative LLMs.

{% include figure.liquid loading="eager" path="assets/img/paper_review/chain_of_thought/prompting_diff.png" class="img-fluid rounded z-depth-1" %}

The 0-shot Chain of Thought version here isn't the popular [Zero shot CoT](https://arxiv.org/pdf/2205.11916) (Often referred as just CoT in some context) but prompt with zero examplars. The left bars could be seen as standard prompting with 0-shot standard and Chain-of-Thought prompting can be seen as directly asking the question without any context. (The difference between the two should be the variance).

We see that CoT prompting hurts performance for Llama 3.2 1B model, while slightly improving Llama 3.2 3B and Qwen3 4B model. Furthermore, we see that standard prompting outperform the CoT version when prompted with the Llama 3.2 1B and Qwen3 4B models. The model performance with and without CoT is model dependent in this experiment, and probably is dataset dependent.

### Closing Remarks

Chain of Thought had a great impact on LLMs, affecting the prompting strategies and fine tuning pipelines. This can be directly seen in LLMs. Earlier tended to output only the final answer for mathematical and reasoning tasks. Now, even small models tend to explain their steps and output the final answers.

This is an instance where human understanding of the world have improved ML model. Prompting and training models on how humans think resulted in a better model performance, counter to the spirit of [bitter lesson](http://www.incompleteideas.net/IncIdeas/BitterLesson.html), which argues that progress in AI comes from building system that learn on that own, not from encoding what we know.

Maybe Chain of Thought style training will hit a wall in the near future. Of course, there are alternatives such as teaching the models to [reason in latent space](https://arxiv.org/pdf/2412.06769).
