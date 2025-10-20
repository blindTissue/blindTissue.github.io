---
layout: post
title: Induction as a Reduction
date: 2024-05-30 01:00:00
description: Generate or Reduce?
tags: for-fun math not-rigorous
featured: false
---

Induction is a powerful tool in mathematics. The general steps of induction are as follows:

1. **Base case**: Prove that the statement is true for the smallest possible value.
2. **Inductive step**: Assume that the statement is true for some value, and prove that the statement is true for the next value.
3. **Conclusion**: The statement is true for all values.

A simple example is to prove that

$$\sum_{i=1}^{n} i = \frac{n(n+1)}{2}$$

1. **Base case**: For $$n=1$$, $$\sum_{i=1}^{1} i = 1 = \frac{1(1+1)}{2}$$
2. **Inductive step**: Assume that the statement is true for some $$n=k$$. Then, $$\sum_{i=1}^{k} i = \frac{k(k+1)}{2}$$. We want to prove that the statement is true for $$n=k+1$$.
3. **Conclusion**: The statement is true for all $$n$$.

For 2 we see that

$$
\begin{aligned}
\sum_{i=1}^k i &= \frac{k(k+1)}{2} \\
(\sum_{i=1}^{k} i) + (k+1) &= \frac{k(k+1)}{2} + (k+1) \\
&= \frac{k(k+1) + 2(k+1)}{2} \\
&= \frac{(k+1)(k+2)}{2} \\
&= \sum_{i=1}^{k+1} i
\end{aligned}
$$

So, the statement is true for all $$n$$.

For induction examples shown in elementary discrete math, it is often the case that you can start from the $$n = k$$ case and show that the statement is true for $$n=k+1$$.
However, for some problems, viewing the inductive step as a reduction problem can conceptually simplify your reasoning

### General Outline of Reduction

In general, Induction can be used to prove that all elements of set $$S$$ satisfies a mathematical statement with free variable.
Let $$f$$ be such mathematical statement that takes an element of set $$S$$ and returns a boolean value. Then, induction can be used to prove that $$f(x)$$ is true for all $$x \in S$$.
For simplicity say that $$S_k$$ is a subset of $$S$$. Similary, let's say that $$f(S_k) = 1$$ if and only if $$f(x) = 1$$ for all $$x \in S_k$$ and 0 otherwise.

For induction, we divide the set $$S$$ into indexable subsets $$S_1, S_2, \cdots$$ such that their union is $$S$$.
Then we prove that $$f(S_k) = 1$$ for all $$k$$ by the induction step above.

In our inductive step, mentally thinking the problem as a reduction is often easier.
Instead of starting from items of $$S_i$$, and expand to items of $$S_{i+1}$$, we should treat the problem as finding reduction from items of $$S_{i+1}$$ to items of $$S_i$$.
This is advantageous as for justification of expanding $$S_i$$ to $$S_{i+1}$$, we must show that the map from $$S_{i+1} spans all elements of $$S_{i+1}$$.

This is often hard. There are edge cases that one has to consider. Below is a simple example.

#### Problem

**A binary tree is a rooted tree in which each node has at most two children. Using
induction, show that in any binary tree the number of nodes with two children
is exactly one less than the number of leaves.**

## Proof

For this problem, the set $$S$$ is the set of all binary trees. $$f$$ is statement that in $$x$$, the number of nodes with two children
is exactly one less than the number of leaves.

We would split the set by depth with $$S_k$$ being binary trees with depth $$k$$.

For the base case, single node tree has 1 node and 0 edges, so the statement is true.

Now look at case of $$S_{k+1}$$. we look at nodes in depth $$k+1$$. If the parent of the node has two children,
then deleting the children of that parent would reduce the number of nodes and edges by 2. If the parent has a single child,
then deleting the child would reduce the number of nodes and edges by 1. Deleting all parents of nodes of depth $$k+1$$
would reduce the number of nodes and edges by same amount, and result in a tree of depth $$k$$. So if $$f(S_k) = 1$$, then $$f(S_{k+1}) = 1$$.

So, the statement is true for all binary trees.

---

We have shown the inductive step by reducing the problem.
If we were to do the opposite, we would need to show that our "addition" of nodes from depth $$k$$ spans all trees of depth $$k+1$$.
Using the reduction method, we can avoid this problem.

Reduction is a strong tool in computer science. [Dynamic Programming](https://en.wikipedia.org/wiki/Dynamic_programming) and [Turing Reduction](https://en.wikipedia.org/wiki/Turing_reduction)
also simplifies the problem by reducing it to a problem we already know.
