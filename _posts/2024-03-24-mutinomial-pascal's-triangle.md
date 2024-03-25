---
layout: post
title: Multinomial Pascal's Triangle
date: 2024-03-24 14:00:00
description: Pascal's triangle for multinomial coefficients
tags: for-fun math not-rigorous in-progress
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

Also, since 
$$\cos(\theta) = \frac{\vec{a} \cdot \vec{b}}{||\vec{a}|| ||\vec{b}||}$$
 we can simplify the above equation to

$$1 = 2 - 2(1,0) \cdot \vec{b}$$


and that $$\vec{b} = (\frac{1}{2}, \pm \frac{\sqrt{3}}{2})$$. Thus, the only possible arrangement is an equilateral triangle. $$\downarrow$$


We will use generalized version of this property to explore arrangement of multinomial coefficients.

### Intuition on the Multinomial Triangle (Ternary Coefficients)

I used to wonder why we werent told about Pascal's triangle for multinomial coefficients. If an equalateral triangle perfectly arranges binomial coefficients, then what about ternary coefficients?

I tried to draw the equivalent of ternary coefficients on a paper, however, I coudln't make a good arrangment in two dimension. I noticed that the number of coefficients of $$(a + b + c)^n$$ is same as sum of the number of coefficieints of $$(a + b)^0$$ to $$(a + b)^n$$. That is when I noticed the following was possible.

First row $$(a + b+ c)^0$$

$$
\begin{array}{c}
1 \\
\end{array}
$$

Second row $$(a + b + c)^1$$

$$
\begin{array}{c}
1 \\
1 \quad 1 \\
\end{array}
$$

Third row $$(a + b + c)^2$$

$$
\begin{array}{c}
1 \\
2 \quad 2 \\
1 \quad 2 \quad 1 \\
\end{array}
$$

Fourth row $$(a + b + c)^3$$

$$
\begin{array}{c}
1 \\
3 \quad 3 \\
3 \quad 6 \quad 3 \\
1 \quad 3 \quad 3 \quad 1 \\
\end{array}
$$

We can see that the coefficients of $$(a + b + c)^n$$ is arranged in a triangle. We could stack these triangles to form a tetrahedron. Also, there is a generalizable property.

Prop
: The number of coefficients in $$(x_1 + x_2 + \cdots x_n)^k$$ is equal to sum of number of coefficients in $$(x_1 + x_2 + \cdots x_{n-1})^0$$ to $$(x_1 + x_2 + \cdots x_{n-1})^k$$

Proof
: We can prove this by induction.(That was in fact, my fist proof of this problem). However, it is really messy and not fun. Instead, there is a more intuitive proof.

We can think of each coefficient as ways to divide $$k$$ elements into $$n$$ groups. We can divide the cases depending on the number of elements that are put in the last group. If we put $$i$$ elements in the last group, then we have $$k-i$$ elements to divide into $$n-1$$ groups. This corresponds to the number of coefficients in $$(x_1 + x_2 \cdots x_{n-1})^{k-i}$$. Thus, the total number of coefficients is the sum of the number of coefficients in $$(x_1 + x_2 + \cdots x_{n-1})^0$$ to $$(x_1 + x_2 + \cdots x_{n-1})^k$$. $$\downarrow$$

Thus, we see that one possible arrangement of n-nomial coefficients is by stacking the previous (n-1)-nomial coefficient arrangement.

Let's return to the ternary coefficients. Again, we want to preserve the property that the value of a ternary coefficient is the sum of the three coefficients above it. That is 

$$\binom{n}{a, b, c} = \binom{n-1}{a-1, b, c} + \binom{n-1}{a, b-1, c} + \binom{n-1}{a, b, c-1}$$

In fact, let's prove a more general property.

Prop
: $$\binom{n}{a_1, a_2, \ldots, a_k} = \sum_{i=1}^k \binom{n-1}{a_1, \ldots, a_i - 1, \ldots, a_k}$$

Proof
: Again, there exists a messy proof and an intuitive proof. Let's use the latter. We see that $$\binom{n}{a_1, a_2, \ldots, a_k}$$ is the number of ways to divide $$n$$ elements into $$k$$ groups with $$a_i$$ elements in the ith group. Let's choose the first element and divide the cases depending on which group it goes to. If it goes to the ith group, then we have $$n-1$$ elements to divide into $$k$$ groups with $$a_i - 1$$ elements in the ith group. This corresponds to the value of $$\binom{n-1}{a_1, \ldots, a_i - 1, \ldots, a_k}$$. $$\downarrow$$

Since we have a possible arrangement of ternary coefficients, let's define once again what we mean by "visually pleasing". First a definition

Def
: Let $$k$$ be a coefficient comming from term $$x_1^{a_1}x_2^{a_2} \cdots x_n^{a_n}$$. The coefficients that are **adjacent** to $$k$$ are
1. coefficients that come from terms $$x_1^{a_1}x_2^{a_2} \cdots x_i^{a_i - 1} \cdots x_n^{a_n}$$
2. coefficients that come from terms $$x_1^{a_1}x_2^{a_2} \cdots x_i^{a_i + 1} \cdots x_n^{a_n}$$
3. coefficients that come from terms $$x_1^{a_1}x_2^{a_2} \cdots x_i^{a_i + 1} \cdots x_j^{a_j - 1} \cdots x_n^{a_n - 1}$$

You can think of adjecent coefficients as ones that are one hamming distance away from the coefficient $$k$$. We can say that the arrangment of the coefficients is visually pleasing if the distance between the adjacent coefficients are the same for all coefficients.

Also, we can define coefficients **above** as coefficients that are adjacent to the coefficient $$k$$ with type 1 in the definition above.

### Existance of a Multinomial Pascal's Triangle

We will now show that there exists an arrangement of multinomial coefficients that satisfies the properties

1. For any coefficient, the distance between the adjacent coefficients are the same.

We can construct such arrangement as follows. 