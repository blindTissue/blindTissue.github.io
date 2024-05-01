---
layout: post
title: Multinomial Pascal's Triangle
date: 2024-03-24 14:00:00
description: Pascal's triangle for multinomial coefficients
tags: for-fun math not-rigorous in-progress
featured: true
---

Check out the [pdf version](/assets/pdf/Multinomial_Pascal_Triangle.pdf)! (Recommended!)

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

We will now show that there exists an arrangement of up to n-nomial coefficients in $$\mathbb{R}^n$$ that satisfies the following property. 

* For any coefficient, the distance between the adjacent coefficients are the same.

* The Pascal's Triangle follows a lattilce like structure where coefficient of $$x_1^{k_1}x_2^{k_2} \cdots x_n^{k_n}$$ is located at $$k_1a_1 + k_2a_2 + \cdots + k_na_n$$.

Let's first look at the top two levels of the triangle.

First, from above, we know that every vector $$a_i$$ is a unit vector and the dot product of $$a_ia_j = \frac{1}{2}$$ for $$i \neq j$$. We should first show that such set of vectors exists in $$\mathbb{R}^n$$.

Let's generate the vecotrs. We will only use the first $$k$$ dimension for $$a_k$$ vectors. We can generate the vectors as following.

$$a_1 = (1, 0, 0, \ldots, 0)$$

$$a_2 = (\frac{1}{2}, \frac{\sqrt{3}}{2}, 0, \ldots, 0)$$

$$a_3 = (\frac{1}{2}, \frac{1}{2\sqrt{3}}, \frac{\sqrt{6}}{3}, 0, \ldots, 0)$$

Where for $$a_k$$, denoted $$(a_k^1, a_k^2, \ldots, a_k^k)$$, $$a_k^1$$ is used to satisfy $$a_1 \cdot a_k = \frac{1}{2}$$, $$a_k^2$$ is used to satisfy $$a_2 \cdot a_k = \frac{1}{2}$$, and so on.


Prop
: Using $$a_i$$ as the base vectors for multinomial coefficients, $$x_i$$, and placing the coefficients that corresponds to $$x_1^{q_1}x_2^{q_2} \cdots x_n^{q_n}$$ at $$q_1a_1 + q_2a_2 + \cdots + q_na_n$$, we can form a multinomial Pascal's triangle.

Proof
: Coefficients which are adjacent has distance of $$||a_i||$$ or $$||a_i - a_j||$$. The formulation of the vectors above satisfies the property. $$\downarrow$$


### Generation of the Lattice Multinomial Triangle

We have shown that there exists a multinomial Pascal's Triangle that follows the lattice structure. We will now show that we can generate any Lattice Multinomial Triangle with a matrix $$A$$.

First, we show that the vectors $$a_k$$ that satisfies

$$||a|| = 1$$ 
and $$a_i \cdot a_j = \frac{1}{2}$$ for $$i \neq j$$ forms a basis for $$\mathbb{R}^n$$.

Prop
: The vectors $$a_k$$ that satisfies the above properties forms a basis for $$\mathbb{R}^n$$.

Proof
: For the sake of contradiction, let's say that the vectors do not form a basis. Without loss of generality, let's say $$\sum_{i = 1}^{n-1} c_ia_i = a_n$$. Then, 

$$
\begin{align*}
a_n \cdot a_j &= \frac{1}{2} \\
(\sum_{i = 1}^{n-1} c_i a_i) \cdot a_j &= \frac{1}{2} \\
\frac{1}{2}c_j + \sum_{i = 1}^{n-1} c_i \frac{1}{2} &= \frac{1}{2} \\
c_j + \sum_{i = 1}^{n-1} c_i &= 1
\end{align*}
$$

Also, we see that 

$$
\begin{align*}
a_n \cdot a_n &= 1 \\
a_n \cdot \sum_{i = 1}^{n-1} c_ia_i &= 1 \\
\sum_{i = 1}^{n-1} c_i \frac{1}{2} &= 1 \\
\sum_{i = 1}^{n-1} c_i &= 2
\end{align*}
$$

Thus we are left with a observation that $$c_j = -1$$ for some $$j$$ in $$i, \ldots, n-1$$. This means that $$\sum_{i = 1}^{n-1} c_i = -(n-1) \neq 2$$. Thus there is a contradiction. $$\downarrow$$

Since the set of vectors forms a basis, by linear algebra, we know that there exists a transformation matrix $$A$$ that transforms the standard basis to the basis of the vectors. Furthermore, from construction, for any vector $$w_i, w_j$$ mapped to $$w_i', w_j'$$, $$w_i \cdot w_j = w_i' \cdot w_j'$$. So we see 

$$w_i \cdot w_j = (w_i A) \cdot (w_j A) = (w_i A \cdot A^T w_j)$$

The only matrix $$A$$ that satisfies the property is the orthogonal matrix. 

Thus we show that all lattice multinomial triangle can be generated by $$AX$$ where $$X$$ is one of the multinomial triangle vectors and $$A$$ is an orthogonal matrix.


### Uniqueness of the Multinomial Pascal's Triangle (Given some additional conditions)
Is this the only possible arrangement? Well, consider the following.

$$
\begin{array}{c}
1a \\
1a \quad 1b \\
\end{array}
$$

$$
\begin{array}{c}
1a^2 \quad (1a, 2ab) \quad 1b^2 \\
1a \quad \quad  1b \\
\end{array}
$$

$$
\begin{array}{c}
1a^2 \quad (1a, 2ab) \quad 1b^2 \\
1a^3 \quad (1a, 3a^2b) \quad  (1b, 3ab^2) \quad 1b^3 \\
\end{array}
$$

By stacking the coefficients, we can create an arrangement that satisfies the property.

Furthermore, another possible arrangement is a roll-up of the triangle. We can roll the triangle into a spiral. This also satisfies the property.

These shapes do not look visually pleasing to me. I would want to limit this. So let's add additional conditions.

* No two coefficients are in the same location.
* n-nomial coefficients should be mapped to $$R^n$$.

So with these condition, is the equilateral triangle the only possible arrangement for binomial coefficients? Yes!

Prop
: In $$R^2$$, there are two arrangement of the binomial coefficients that satisfies condition that the adjacent coefficients are the same distance. 

Proof
: From the arrangement, $$a_1, a_2$$ are fixed to be a unit vector forming an equilateral triangle with the origin. Now let's look at the location of $$x_1^2$$. There are only two possible locations. One is the normal pascal's triangle and the other is flipped. However, we banned the latter. So the only possible location of $$x_1^2$$ is the normal pascal's triangle. $$\downarrow$$ 

Let's define a term, called **level**
: In an n-nomial Pascal's triangle, coefficients of level $$k$$ are the coefficients corresponding to $$(x_1 + x_2 + \cdots x_n)^k$$.

Now, remember a proposition we proved earlier.

The number of coefficients in $$(x_1 + x_2 + \cdots x_n)^k$$ is equal to sum of number of coefficients in $$(x_1 + x_2 + \cdots x_{n-1})^0$$ to $$(x_1 + x_2 + \cdots x_{n-1})^k$$

We will show that n-nomial coefficients of level $$k$$ has a stricter level of adjacentness compared to $$(n-1)$$-nomial coefficients up to level $$k$$.

Proof
: #TODO fill out later.

Cor
: There exists a unique arrangement of 3-nomial coefficients of level $$k$$ on 2D.

Proof
: We already showed the uniqueness of arrangement of binomial coefficients. the 3-nomial coefficients of level $$k$$ has a stricter level of adjacentess, as thus, the only possible arrangement is that on original Pascal's Triangle: equilateral triangle. $$\downarrow$$

Now we are almost done. We will show that the only possible arrangement of multinomial coefficients is the one we defined earlier.

We already showed that the vectors required to satisfy the adjacentness property uniquely (up to rotation and reflection) exists. With the requirenments, we have uniquely defined the arrangement up to level 1. Now, we will show that adding another level is unique.

For intuition, let's first see it in the 3-nomial case.

