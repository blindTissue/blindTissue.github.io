---
layout: post
title: MLE for categorical distribution
date: 2024-08-27
description: Simple Derivation of MLE
tags: Machine Learning
featured: False
---

### What is an MLE?

In real-world scenarios, we often do not know the true probability distribution underlying an event; we can only observe the outcomes. From these observed results, we attempt to infer the true probability distribution. Likelihood refers to the probability of observing a particular outcome given a specific distribution. The Maximum Likelihood Estimate (MLE) method is used to find the set of parameters that maximize the likelihood for a given family of distributions (multinomial, bernouli, etc), thus providing the best estimate of the true underlying parameters.

Here is the derivation of MLE for [categorical distribution](https://en.wikipedia.org/wiki/Categorical_distribution). Note that the following will use a more general approach for deriving MLE for output with multiple dimensions.

Just as a side note, in Natural Language Processing, people often mean categorical distribution when they say multinomial distribution.


Let $$M$$ be set of observations. Also, let's say that there are $$C$$ categories. Each item of $$M$$, call it $$m$$ will be one-hot vector encoded. (ex: $$\[0,0,0,1, \cdots 0,0,0]\]$$).
We would want to create an estimate for $$C$$ parameters. Again, in MLE, we want to maximize the probability of the observation. Let's say the parameters are in one hot, and denote them $$\theta$$.
The likelihood of $$M$$ would be

$$L(M) = \prod_{i = 1} ^ {|M|} p(x_i |\theta)$$

Since the distribution is categorical, we can further simplify this as follows. let $$\delta_{ij}$$ denote a delta function where $$\delta_{ij} = 1$$ if the $$i$$th element of $$M$$ is labelled $$j$$ and else 0.

$$ \prod_{i = 1} ^ {|M|} p(x_i |\theta) = \prod_{i = 1}^{|M|} \sum_{j = 1}^C \delta_{ij} \theta_{j}$$.

Now, in order to maximize likelihood, we would want to find points where the derivative is $$0$$. Doing this is complicated. We can simplify the following by taking the log first.

The reason why log works well is

1. Changes multiplication to addition, simplifying calculation of derivative.
2. It is a strictly increasing smooth function. Maximizing logged function also maximizes original function

Now, taking log, we have

$$\log (L(M)) =  \log (\prod_{i = 1}^{|M|} \sum_{j = 1}^C \delta_{ij} \theta_{j}) = \sum_{i = 1}^{|M|} \log( \sum_{j = 1}^C \delta_{ij}\theta_j)$$

Now, we would take the derivative. There is one constraint though. $$\sum \theta_j = 1$$. We want probabilities to sum up to 1.

Using [Lagrange multiplier](https://en.wikipedia.org/wiki/Lagrange_multiplier), we would want

$$\frac{\partial (\log (L(M))+ 
\lambda(1 - \sum_{j = 1}^|C| \theta_j)}{\partial \theta_i} = 0$$ for all $$\theta_i$$.

and 

$$\frac{\partial (\log (L(M))+ 
\lambda(1 - \sum_{j = 1}^{|C|} \theta_j)}{\partial \lambda} = 0$$ 

for derivative with respect to theta, we have

$$\frac{\partial \log (L(M))}{\partial \theta_i} = \sum_{i = 1}^{|M|} \frac{\delta_{ij}}{\sum_{j = 1}^C \delta_{ij} \theta_j} = 0$$







