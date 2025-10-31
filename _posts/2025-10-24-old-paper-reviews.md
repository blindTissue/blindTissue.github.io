---
layout: post
title: Paper Review of Old NLP Papers
date: 2025-10-30
description: A review of influential old papers in natural language processing.
tags: machine-learning
featured: False
math: true
---

# Premise

Bullet points, summary, and simple experiment from the old influential papers in NLP. Will update this post over time. This isn't supposed to be an in-depth review, just a quick overview and my thoughts. Sometimes perhaps some experiments.

<div class="accordion my-3" id="papers">

  <!-- ========== Paper 1 ========== -->
  <div class="accordion-item">
    <h2 class="accordion-header" id="h-aiayn">
      <button class="accordion-button collapsed" type="button"
              data-bs-toggle="collapse" data-bs-target="#c-aiayn"
              aria-expanded="false" aria-controls="c-aiayn">
        Attention is All You Need (Vaswani et&nbsp;al., 2017)
      </button>
    </h2>
    <div id="c-aiayn" class="accordion-collapse collapse" aria-labelledby="h-aiayn" data-bs-parent="#papers">
      <div class="accordion-body" markdown="1">

Many people consider this to be the Landmark paper that started the Transformer revolution.

$$ \text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V $$

This is the mechanism what started it all. 

#### About Attention Mechanism

> The two most commonly used attention functions are additive attention [2], and dot-product (multiplicative) attention. Dot-product attention is identical to our algorithm, except for the scaling factor of $$\sqrt{d_k}$$. Additive attention computes the compatibility function using a feed-forward network with a single hidden layer. While the two are similar in theoretical complexity, dot-product attention is much faster and more space-efficient in practice, since it can be implemented using highly optimized matrix multiplication code.

This shows that the idea of attention was not new. Previous [paper](https://arxiv.org/pdf/1409.0473) also introduced attention mechanism. It was used as a middle layer connecting encoder and decoder RNNs. The novelty of this paper was showing that attention mechanism alone can be used to replace RNNs.

I think that the name of the paper "attention is all you need" is misleading. When reading this paper for the first time, I assumed that parameters for attention mechanisms were the majority of the model parameters, as the paper just briefly mentions about the MLP layers. However, I was surprised to find, when reading MoE models that majority of the parameters were in the feed-forward layers. Furthermore, as people, when talking about the complexity, focused on the calculation of the attention weights, which is $$(O(n^2 \cdot d))$$. However, the feed-forward layers also have complexity of $$(O(n \cdot d^2))$$, Since in the earlier days of transformers, $$d$$ was often larger than $$n$$, the feed-forward layers were more computationally expensive on simple tasks.

In current transformer models, the MLP layer consists around 80 percent of the paramters. I would argue that attention mechanism is not all you need, but the Decoder Layer, which includes the attention and the FFN is what is all you need.

#### About Positional Embeddings

The paper introduced sinusodial positional embedding. That is, 

$$ \text{PE}_{(pos, 2i)} = \sin\left(\frac{pos}{10000^{2i/d_{model}}}\right) $$

$$ \text{PE}_{(pos, 2i+1)} = \cos\left(\frac{pos}{10000^{2i/d_{model}}}\right) $$

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

I thought that this formulation wasn't that great. I thought that a formulation where 

$$\mathbf{A}^k (PE_{pos} + emb) = PE_{pos + k} + emb$$ 

$$\mathbf{R}^k \times PE_{pos} + emb = PE_{pos + k} + emb$$

Equation above is more intuitive than that of the below, which is the sinusodial positional embedding. The attention mechanism does a matrix multiplication with the position embedded token embedding. Other positional embedding implementations such as RoPE solves this problem.

The paper further says that changing the positional embedding to learned embeddings do not make much difference.

#### Simple Experiments

1. Sinusodial Embedding vs Learnable.
2. Additive (Bahdanau-style) vs Dot product attention.

For the base transformer implementation, I used the Andrej Karpathy's [minGPT](https://www.youtube.com/watch?v=kCc8FmEb1nY) and evaluated based on the perplexity of the Shakespeare dataset. The code can be found [here](https://github.com/blindTissue/additive-attention-experiment). 

There was a minor difficulty in implementing the Bahdanau Attention. The original attention mechanism in the paper (Which connects encoder with decoder) uses the following

$$
    \alpha_{ij} = \frac{\exp(e_{ij})}{\sum_{k=1}^{T_x} \exp(e_{ik})} \quad \\
    e_{ij} = v_a^T \tanh(W_a s_{i - 1} + U_a h_j)
$$

where $$v_a \in \mathbb{R}^n$$, $$W_a \in \mathbb{R}^{n \times m}$$, $$U_a \in \mathbb{R}^{n \times 2m}$$. The actual implementation is interesting. You should take a look into it in the [original paper](https://arxiv.org/pdf/1409.0473).

To fit this implementation to Transformers, I modified the equation a bit.

$$
    e_{ij} = vx_i\tanh(W_q x_i + W_k x_j)
$$

where $$v \in \mathbb{R}^{head\_size}$$, $$W_q \in \mathbb{R}^{head\_size \times head\_size}$$, $$W_k \in \mathbb{R}^{head\_size \times head\_size}$$.

Notice that $$v$$ here is a 1d vector instead of a matrix as in transformer. This was a design choice by me to be closer to the original Bahdanau attention. The $$q,k$$ vectors are same as the original transformer. 

But this approach takes up too much memory in parallel computation. We need to materialize matrix of (B, T, T, head_size) tensor to parallelize adding the $$q,k$$ vectors. So I used an alternative implementation.

$$
    e_{ij} = v(\tanh(W_q x_i)) + v(\tanh(W_k x_j))
$$

This way, we do not need to materialize the full (B, T, T, head_size) tensor. The two implemtations are not equivalent, but I think this is a reasonable approximation.

#### Results

{% raw %}{% include figure.liquid loading="eager" path="assets/img/paper_review/attention_is_all_you_need/results.png" class="img-fluid rounded z-depth-1" %}{% endraw %}

All models show similar curves. 

      </div>
    </div>
  </div>

  <!-- ========== Template for more papers (copy/paste and edit IDs) ========== -->
  <!--
  <div class="accordion-item">
    <h2 class="accordion-header" id="h-UNIQUE_ID">
      <button class="accordion-button collapsed" type="button"
              data-bs-toggle="collapse" data-bs-target="#c-UNIQUE_ID"
              aria-expanded="false" aria-controls="c-UNIQUE_ID">
        Paper Title (Author et al., YEAR)
      </button>
    </h2>
    <div id="c-UNIQUE_ID" class="accordion-collapse collapse" aria-labelledby="h-UNIQUE_ID" data-bs-parent="#papers">
      <div class="accordion-body" markdown="1">
        Your Markdown and $$\LaTeX$$ here.
      </div>
    </div>
  </div>
  -->

</div>
