---
layout: post
title: Simple Llama Token Embedding to Model Head Experiment
description: Does Same Token Encoded by embeder and then decoded by LM Head Yield Same Result?
tags: Machine Learning
featured: True
---


### Outline

With the help of [Huggingface's Transformers](https://huggingface.co/docs/transformers/index), the model architecture and weights of open source models are available to the public.

Methods on Mechanistic Interpretability by [Welch Labs](https://www.youtube.com/watch?v=UGO_Ehywuxc&t=3s&ab_channel=WelchLabs) made me think of a feature in LLM that I was not aware of. The experiments done in the video presupposes that token embedder (tokens to vector translator) and the LM Head (final vector to token logits) are identical.

I checked if this was the case for LMs as I was not familiar with this change. I thought that naturally, the LM head layer and the embedder layer were different. Turns out, it is a widely used method called [weight tying](https://paperswithcode.com/method/weight-tying). 

Because of this characteristic, we can "estimate" the token of the intermediate layer by multiplying intermediate layer's output with the LM head's weight matrix, then taking the argmax of the result. Pretty useful trick for mechanistic interpretability.

So, I played around with this idea. The first question I had was if the LM head's weights were L2 normalized. If the LM head's weights are L2 normalized, then it follows that given token $$t$$, and the head matrix $$W$$, $$t = \text{argmax}(WW^T(t))$$. If this were true, then it would give some solid baseline on future mechanistic interpretability experiments.


### Experiment with Llama 3.2 on L2 Norm

However, the LM heads are not L2 normalized for Llama 3.2 models.

```python
tokenizer_1b = AutoTokenizer.from_pretrained("meta-llama/Llama-3.2-1B-Instruct")
model_1b = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-3.2-1B-Instruct")
tokenizer_3b = AutoTokenizer.from_pretrained("meta-llama/Llama-3.2-3B-Instruct")
model_3b = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-3.2-3B-Instruct")

model_1b_embedding = model_1b.model.embed_tokens
lm_head_1b = model_1b.lm_head

model_3b_embedding = model_3b.model.embed_tokens
lm_head_3b = model_3b.lm_head

def find_embedding_l2_info(model_embedding):
    model_embedding_weights = model_embedding.weight
    l2_norms = torch.norm(model_embedding_weights, p=2, dim=1)
    return l2_norms

def find_max_min_var(l2_norms):
    max_val = torch.max(l2_norms)
    min_val = torch.min(l2_norms)
    variance = torch.var(l2_norms)
    return max_val, min_val, variance

def find_max_min_indices(l2_norms):
    max_val = torch.max(l2_norms)
    min_val = torch.min(l2_norms)
    max_indices = torch.where(l2_norms == max_val)[0].item()
    min_indices = torch.where(l2_norms == min_val)[0].item()
    return max_indices, min_indices

l2_norms_1b = find_embedding_l2_info(model_1b_embedding)
l2_norms_3b = find_embedding_l2_info(model_3b_embedding)

max_val_1b, min_val_1b, var_1b = find_max_min_var(l2_norms_1b)
max_val_3b, min_val_3b, var_3b = find_max_min_var(l2_norms_3b)

print(f"Max value 1b: {max_val_1b}")
print(f"Min value 1b: {min_val_1b}")
print(f"Variance 1b: {var_1b}")
print(f"Max value 3b: {max_val_3b}")
print(f"Min value 3b: {min_val_3b}")
print(f"Variance 3b: {var_3b}")

max_indices_1b, min_indices_1b = find_max_min_indices(l2_norms_1b)
max_indices_3b, min_indices_3b = find_max_min_indices(l2_norms_3b)

print(f"Max indices 1b: {max_indices_1b}")
print(f"Min indices 1b: {min_indices_1b}")
print(f"Max indices 3b: {max_indices_3b}")
print(f"Min indices 3b: {min_indices_3b}")
```

```
Max value 1b: 1.3203290700912476
Min value 1b: 0.5214595794677734
Variance 1b: 0.008283221162855625
Max value 3b: 1.4694581031799316
Min value 3b: 0.6221248507499695
Variance 3b: 0.012782144360244274
Max indices 1b: 58996
Min indices 1b: 72710
Max indices 3b: 58996
Min indices 3b: 81259
```

As a fun note, the max, min index tokens are

```
Max
1b: yourselves
3b: yourselves
```

```
Min
1b: -->
3b: 


artisanlib
```

Yes. The newlines and spaces are included in the tokens. Now, this means that there might be some tokens that does not map to itself after function $$\text{argmax}(WW^T())$$.

### Does tokens map to itself?

So, I checked if the tokens map to itself.

```python

def find_mismatch_indices(tot_token_count, model_embedding, lm_head, batch_size=167): #set to 167 since 167 | 128256
    original_different_indices = []
    mismatched_indices = []
    for i in tqdm(range(tot_token_count // batch_size)):
        inputs = [j + i * batch_size for j in range(batch_size)]
        inputs = torch.tensor(inputs)
        embedding_out = model_embedding(inputs)
        head_out = lm_head(embedding_out)
        returned_items = torch.argmax(head_out, dim=-1)
        if not torch.all(returned_items == inputs):
            original_different_indices.extend(inputs[returned_items != inputs].tolist())
            mismatched_indices.extend(returned_items[returned_items != inputs].tolist())
    return original_different_indices, mismatched_indices
    

original_different_indices_1b, mismatched_indices_1b = find_mismatch_indices(128256, model_1b_embedding, lm_head_1b)
original_different_indices_3b, mismatched_indices_3b = find_mismatch_indices(128256, model_3b_embedding, lm_head_3b)

embedding_1b_correct_rate = (128256 - len(original_different_indices_1b)) / 128256
embedding_3b_correct_rate = (128256 - len(original_different_indices_3b)) / 128256

print(len(original_different_indices_1b))
print(len(original_different_indices_3b))

print(f"1b embedding correct rate: {embedding_1b_correct_rate}")
print(f"3b embedding correct rate: {embedding_3b_correct_rate}")
```

```
614
602
1b embedding correct rate: 0.9952126996007984
3b embedding correct rate: 0.9953062624750499
```

Less than .5 percent of the tokens does not map to itself. Then, which tokens does the unmatched tokens map to?

```python
def create_count_dict(mismatched_indices):
    count_dict = {}
    for index in mismatched_indices:
        if index in count_dict:
            count_dict[index] += 1
        else:
            count_dict[index] = 1
    return count_dict

count_dict_1b = create_count_dict(mismatched_indices_1b)
count_dict_3b = create_count_dict(mismatched_indices_3b)

print(count_dict_1b)
print(count_dict_3b)
```

```
{122456: 477, 528: 1, 738: 1 ...}
{66325: 482, 528: 1, 738: 1 ...}
```

Surprisingly, the majority of the mismatched tokens map to the same token. In the case of 1b, 477 tokens map to token 122456 and in the case of 3b, 482 tokens map to token 66325. 

```
Token 122456: организа
Token 66325: ♪
```

When I manually skimmed through the tokens mapped to 122456 and 66325, most of them were special tokens programming words, non-english words. Nevertheless, I found the result interesting. Why do the majority of the unmaatched tokens map to the same token?

If you have any ideas, please let me know. Thanks for reading!

Code can be found [https://github.com/blindTissue/embedding_matrix_experiment][https://github.com/blindTissue/embedding_matrix_experiment]








