---
layout: post
title: Multinomial Pascal's Triangle
date: 2024-03-24 14:00:00
description: Pascal's triangle for multinomial coefficients
tags: for-fun math not-rigorous
featured: true
---

$$
\begin{array}{c}
1 \\
1 \quad 1 \\
1 \quad 2 \quad 1 \\
1 \quad 3 \quad 3 \quad 1 \\
1 \quad 4 \quad 6 \quad 4 \quad 1 \\
1 \quad 5 \quad 10 \quad 10 \quad 5 \quad 1 \\
1 \quad 6 \quad 15 \quad 20 \quad 15 \quad 6 \quad 1 \\
1 \quad 7 \quad 21 \quad 35 \quad 35 \quad 21 \quad 7 \quad 1 \\
\end{array}
$$

Pascal's triangle is a smart arrangement of binomial coefficients. Each nth row of the triangle contains the coefficients of the binomial expansion of $$(a+b)^n$$. The triangle has two interesting properties:

1. The value of the binomial coefficient is the sum of the two binomial coefficients above it.
2. The arrangement is "visually appealing".

Let's explore these qualities.

### Exploration of Pascal's Triangle

#### Property 1

The property of the sum of the binomial coefficient can be written as following

$$\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}$$

We can prove this property by expanding the binomials. That takes too much space and effort. Instead, let's look at a more explanatory proof.

We can think of the binomial coefficient as the number of ways to choose $$k$$ elements from a set of $$n$$ elements. Let's say we have a set of $$n$$ elements. We can choose $$k$$ elements in two ways: 
1. We choose the first element and then choose $$k-1$$ elements from the remaining $$n-1$$ elements.
2. We don't choose the first element and then choose $$k$$ elements from the remaining $$n-1$$ elements.

Thus, the total number of ways to choose $$k$$ elements from a set of $$n$$ elements is the sum of the two ways above. This gives us the property of Pascal's triangle.

#### Property 2

The second property, that the arrangement is "visually pleasing" is more subjective. To me, it is by chance that the visualization of the coefficients of $$(a + b)^n$$ results in an equalateral triangle. 



$$
\begin{array}{lc}
(a+b)^0= &
{\color{Red}\boldsymbol{1}} 
\\
(a+b)^1=  & 
{\color{Red}\boldsymbol{1}}a+{\color{Red}\boldsymbol{1}}b
\\
(a+b)^2=  &
{\color{Red}\boldsymbol{1}}a^2+{\color{Red}\boldsymbol{2}}ab+{\color{Red}\boldsymbol{1}}b^2
\\
(a+b)^3=  &
{\color{Red}\boldsymbol{1}}a^3+{\color{Red}\boldsymbol{3}}a^2b+{\color{Red}\boldsymbol{3}}ab^2+{\color{Red}\boldsymbol{1}}b^3
\\
(a+b)^4=  &
{\color{Red}\boldsymbol{1}}a^4+{\color{Red}\boldsymbol{4}}a^3b+{\color{Red}\boldsymbol{6}}a^2b^2+{\color{Red}\boldsymbol{4}}ab^3+ {\color{Red}\boldsymbol{1}}b^4
\\                                     
\end{array}
$$

let's define $$\vec{a}$$ and $$\vec{b}$$ as vectors from the top of the triangle $$\color{Red}\boldsymbol{1}$$ to $${\color{Red}\boldsymbol{1}}a$$ and $${\color{Red}\boldsymbol{1}}b$$ respectively. we see that the coefficients of $$a^nb^m$$ is located at $$n\vec{a} + m\vec{b}$$. 

We first see that the distance between the "adjacent" coefficients are the same. Let's focus on $$3a^2b$$. the distance between its six neighbors can be written as 

$$||\vec{a}||, ||\vec{b}||, ||\vec{a} - \vec{b}||, ||\vec{-a}||, ||\vec{-b}||, ||\vec{b} - \vec{a}||$$

 We see that all of these distances are the same, to simplify,

$$||\vec{a}|| = ||\vec{b}|| = ||\vec{a} - \vec{b}||$$

Is an equaleteral triangle an only possible arrangement that satisfies the following? Let's prove it.

Prop
: In $$R^2$$, the only arrangement of the binomial coefficients that satisfies
1. The location of the coefficient of $$a^nb^m$$ is $$n\vec{a} + m\vec{b}$$
2. The distance between the "adjacent" coefficients are the same
is an equilateral triangle, in other words, $$||\vec{a}|| = ||\vec{b}|| = ||\vec{a} - \vec{b}||$$

Proof
: Since, 
$$||\vec{a}|| = ||\vec{b}||$$, 
let's say that $$\vec{a}, \vec{b}$$ are unit vectors. Furthermore, let's fix $$\vec{a} = (1,0)$$. Then, by the second cosine law, we have 

$$||\vec{a} - \vec{b}||^2 = ||\vec{a}||^2 + ||\vec{b}||^2 - 2||\vec{a}|| ||\vec{b}|| \cos(\theta)$$

where $$\theta$$ is the angle between $$\vec{a}$$ and $$\vec{b}$$. 

Also, since $$cos(\theta) = \frac{\vec{a} \cdot \vec{b}}{|\vec{a}| |\vec{b}|}$$, we can simplify the above equation to

$$1 = 2 - 2(1,0) \cdot \vec{b}$$


and that $\vec{b} = (\frac{1}{2}, \pm \frac{\sqrt{3}}{2})$. Thus, the only possible arrangement is an equilateral triangle.