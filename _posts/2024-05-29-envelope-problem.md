---
layout: post
title: Two Envelope Problem
date: 2024-05-29 14:00:00
description: Switch or not to switch, that is the question.
tags: for-fun math
featured: true
---

The Two Envelope Proglem is a paradox in probability theory. The problem goes like this:

Imagine you are given two identical envelopes, each containing money. One contains twice as much as the other. You may pick one envelope and keep the money it contains. Having chosen an envelope at will, but before inspecting it, you are given the chance to switch envelopes. Should you switch?

The switching argument goes like this.

Let's say that your envelope contains x dollars. Then the other envelope contains either 2x or x/2 dollars with equal probability. The expected value of the other envelope is then: 

$$\frac{1}{2} 2x + \frac{1}{2} \frac{x}{2} = \frac{5}{4} x$$

Which is greater than x. So, you should switch.

However, if you switch, the same argument can be made for the other envelope. You can keep switching to set the expected value to infinity. This is a paradox. What is the problem?

Classical approach of this problem uses conditional probability. A simple solution which can be found in wikipedia is as follows. Say $$A$$ is the value of the chosen envelope and $$B$$ is the value of the other envelope. Furthermore, let $$x$$ be the amount of money in smaller envelope. We have

$$
\begin{aligned}
E(B) &= E(B | A< B) P(A < B) + E(B | A > B) P(A > B) \\
&= \frac{1}{2} E(2A | A < B) + \frac{1}{2} E(A/2 | A > B) \\
&= E(A | A < B) + \frac{1}{4}E(A | A > B)
\end{aligned}
$$

Then when we plug in $$x, 2x$$ respectively, we get

$$E(B) = x + \frac{1}{4} 2x = \frac{3}{2}x$$

So lack in conditional is the problem. With the correct conditionals, the expected value for both envelopes are the same.

However, I was interested in the problem of $$E[\frac{A}{B}]$$. According to the calculation above, the expected value of the ratio is $$\frac{5}{4}$$. Naively, I would assume that the expected value to be 1. Why does this happen?

First off, the expected value of the other envelope given the value of the chosen envelope **is** $$\frac{5}{4}$$ of the chosen envelope. A simple simulation shows it.

```python
import random
sum = 0
sum_inv = 0
tot = 10000

num1_sum = 0
num2_sum = 0
num1_big_count = 0
for i in range(tot):
    num1 = random.random()
    num2 = num1 * 2
    
    id = random.random()
    if id > 0.5:
        temp = num1
        num1 = num2
        num2 = temp
    
    sum += num1 / num2
    sum_inv += num2 / num1
    num1_sum += num1
    num2_sum += num2
    if num1 > num2:
        num1_big_count += 1
    
print('E[X / Y]: ' + str(sum / tot))
print('E[Y / X]: ' + str(sum_inv / tot))
print('E[X] / E[Y]: ' + str(num1_sum / num2_sum))
print('E[X > Y]: ' + str(num1_big_count / tot))


# output
E[X / Y]: 1.25315
E[Y / X]: 1.24685
E[X] / E[Y]: 1.0046320597852603
E[X > Y]: 0.5021
```

Simulation above implies that E[X / Y] = E[Y / X] = 1.25. In fact, we can show a more general result.

Let $$X$$ be a probability distribution with domain of $$(0, \infty)$$. Then $$E[x_1 / x_2] \geq 1$$. Furthermore, $$E[x_1 / x_2] = 1$$ if and only if $$X$$ has support of a single point.
: Proof is as follows. For any instance of $$x_1 / x_2 = k$$, there is a same probability of $$x_1 / x_2 = \frac{1}{k}$$. $$k + \frac{1}{k} \geq 2$$ for all $$k > 0$$. So, $$E[x_1 / x_2] \geq 1$$.


For the two envelope problem, we can see the problem as drawing without replacement. In this case, the same argumentcan be made. for any $$x_1 / x_2 = k$$, there is an equal probability of $$x_1 / x_2 = 1 / k$$.

Finally, one takeaway would be

$$E [ X / Y] \neq E[X] / E[Y]$$

This is similar to my previous post on [Gender at Birth Ratio](https://sungwon-kim.com/blog/2024/gender-at-birth-ratio/)
In this case, there exists a strategy where we can maximize $$\frac{x}{x + y}$$ by stopping. However, there is no strategy to maximize $$x - y$$. So

$$E[X / (X + Y)] \neq \frac{E[X]}{E[X] + E[Y]}$$









