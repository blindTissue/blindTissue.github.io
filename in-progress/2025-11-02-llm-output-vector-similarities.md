---
layout: post
title: Cosine Similarity with LLM Head Vectors vs Logits
date: 2025-11-01
description: Exploration into driving force for large Logits
tags: machine-learning
featured: True
---

### Premise

This can be seen as a follow up from the 10-19 writeup.

In my opinion, the lm head embeddings in LLMs should act similarly with word2vec embeddings, where the word vectors are trained with respect to the words around them. The LM head embedding is often shared in LLMs, using the same embedding to encode tokens into vectors, and decode vectors into token probabilities. I was interested in exploring this embedding.

### Distribution of LM Head Vectors.

These vectors can be seen in the previous [article](https://sungwon-kim.com/blog/2024/token-encoding-decoding/).

### Word2Vec vs LM Head

One fun quality of Word2Vec is the ability to map relationships in words. For example, people would be able to reason that the blank in King : Queen = Man : **\_** as woman. In word2vec, the closest vector to Vec(Qween) + Vec(an) - Vec(King) would be Woman, or some synonym of it. An interesting experiment would be to see if this is also the case for the LM head Embeddings
