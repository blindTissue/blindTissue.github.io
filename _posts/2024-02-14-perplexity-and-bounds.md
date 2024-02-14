---
layout: post
title: a post with code
date: 2024-02-14 14:00:00
description: bounds for perplexity on language models
tags:
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

If the model has memorized the word sequence, then it will assign probability 1 to the next word. In this case, the perplexity is 1.

However, let's say that the model sees a new word in the sequence that it has not seen before. Then from the perplexity definition, we have perplexity of infinity.

