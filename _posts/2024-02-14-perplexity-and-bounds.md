---
layout: post
title: Bounds for Language Model Perplexity
date: 2024-02-14 14:00:00
description: What is perplexity in language modelling and the sensible bounds for it?
tags: machine-learning
featured: true
---

Language model's quality is often measured by perplexity. In this post, we will derive bounds for perplexity.

### What is Perplexity?

Given a language model $L$, perplexity of the model on sequence of words $w_1, w_2, \ldots, w_n$ is defined as:

$$ppl(w_1, \ldots w_n) = P(w_1, \ldots w_n)^{-\frac{1}{n}}$$

where $P(w_1, \ldots w_n)$ is the probability of the sequence $w_1, \ldots w_n$ under the language model $L$.

We can think of perplexity as wordwise uncertainty of the language model. Let's look at some properties of perplexity.

### Properties of Perplexity

Assume that a language model has a vocab size $V$. If the model guesses the next word uniformly at random, then the perplexity is $V$. This is because the probability of the next word is $1/V$ and hence the perplexity is 

$$ppl(w_1, \ldots w_n) = (P(w_1) P(w_2 | w_1) \ldots P(w_n | w_{n-1} \ldots w_1))^{-\frac{1}{n}} = (\frac{1}{V}^n)^{-\frac{1}{n}} = V$$

If the model has memorized the word sequence, then it will assign probability 1 to the next word. In this case, the perplexity is

$$ppl(w_1, \ldots w_n) = (P(w_1) P(w_2 | w_1) \ldots P(w_n | w_{n-1} \ldots w_1))^{-\frac{1}{n}} = (1^n)^{-\frac{1}{n}} = 1$$

However, let's say that the model sees a new word in the sequence, let's say, at position $i$. Then we see that 

$$ppl(w_1, \ldots w_n) = (p(w_1) \cdots p(w_i | \ldots) \cdots p(w_n | \ldots))^{-\frac{1}{n}} = 0^{-\frac{1}{n}} = \infty$$

### Bounds for Perplexity

Let's now look at bound properties for perplexity. In this part, we will look into average sentencewise perplexity and show some interesting results.

**Proposition 1**: Given any corpus, there is a language model that has average sentencewise perplexity less than or equal to the vocabulary size. 

**Proof**:  we can always construct a language model that has perplexity of the vocabulary size by assigning same probability to all words. Thus the perplexity of a sensible language model should be at most the vocabulary size, $V$.

An interesting question is whether there is a corpus where the best language model has perplexity equal to the vocabulary size.

**Proposition 2**: A corpus where every word is chosen independently with same probability has the best language model with perplexity equal to the vocabulary size.

Let's now look at a theoretical corpus where every word is chosen independently with same probability. 
$$ppl(w_1, \ldots w_n) = (P(w_1) P(w_2) \ldots P(w_n))^{-\frac{1}{n}} \sim ((P(v_1)P(v_2) \ldots P(v_V))^\frac{n}{V})^{-\frac{1}{n}} = (P(v_1)P(v_2) \ldots P(v_V))^{-\frac{1}{V}}$$

We know the lower bound to the following inequality using the AM-GM inequality.

$$\frac{1}{V} \sum_{i=1}^V P(v_i) = \frac{1}{V} \geq \left(\prod_{i=1}^V P(v_i)\right)^{\frac{1}{V}}$$

Thus we have that the lower bound of perplexity on this corpus is $V$. Furthermore, this perplexity is achieved if and only if $P(v_i) = \frac{1}{V}$ for all $i$ from AM-GM inequality.

Thus the bound for proposition 1 is tight.







