---
layout: post
title: Ranking Pokemon Types
date: 2024-02-16 14:00:00
description: Pokemon type ranking based on type effectiveness alone.
tags: fun
featured: true
---

A while back, I watched a video on [Pokemon type ranking](https://www.youtube.com/watch?v=_SCz1fwhnJg&ab_channel=WolfeyVGC) by Wolfey, a former world champion. The ranking was comprehensive, including type effectiveness, abilities, move distribution, and more. I was curious to see how the ranking would look like if we only considered type effectiveness.

### Type Effectiveness

{% include figure.liquid loading="eager" path="assets/img/Pokemon_Type_Chart.svg" class="img-fluid rounded z-depth-1" %}

Chart Source: Wikipedia

The problem setup seems similar to chess rating system. We can see each types as "players" and the effectiveness as the result of a match. We can rank each using the elo rating system used in chess.

However, the type effectiveness chart is not inversely symmetric. For example, fighting type is not very effective against bug type but bug type is also not very effective against fighting type. 

Thus Pokemon effectiveness chart is not a zero-sum game. We cannot simply use the elo rating system.

### Bounds


I wanted the rating system to follow easily understandable rules. Let's first define variables.

$$A$$ is the set of attack ratings of types. $$a_i \in A$$ denotes the attack rating of type $$i$$. 
$$D$$ is the set of defense ratings of types. $$d_i \in D$$ denotes the defense rating of type $$i$$.

Also, let $$T$$ be the set of types.

Pokemon is not a zero sum game. Thus I believed that calculating seperate attack and defense ratings would be more meaningful.

Let's talk about the bounds now.

let's hypothetically say that there are two types $$i,j$$ such that their type effectiveness is same except for one type. Let's say that type $$i$$ is super effective against type $$k$$ and type $$j$$ is less effective against type $$k$$. Then we $$a_i \geq a_j$$. 

Another bound is inspired from the rating system. If a player wins against a strong player, then the player's rating increment is higher than if the player wins against a weak player. In this case, If an attacking type is super effective against a strong defending type, then the attacking type should be rated higher than if it was super effective against a weak defending type. Similarly, if a defending type is resistant to a strong attacking type, then the defending type should be rated higher than if it was resistant to a weak attacking type.

### Rating Calculation

Since we have bounds, lets devise a rating system that satisfies these bounds.

I came up with an iterative approach of this. First let's define another function 
$$S_A: T \times T \rightarrow \mathbb{R}$$. The function takes in two types, the first argument being the attacking type and the second, the defending type. The function returns the "score" the attacking type gets when attacking the defending type.

Similarly, we can define $$S_D: T \times T \rightarrow \mathbb{R}$$ as the score the defending type gets when defending against the attacking type.

One approach of definition $S_A$ would be to use the type effectiveness chart. For example, $$S_A(t_1, t_2)$$ would be 2 if $$t_1$$ is super effective against $$t_2$$, 1 if $$t_1$$ is normally effective against $$t_2$$, and so on.

However, defining $$S_D$$ is not as straightforward. One naive approach would be to take the inverse of $$S_A$$. However,  $$S_A = 0$$ exists, and would be undefined in this case. Let's put the bounds for $$S$$ to be non-negative and follow order ranking of types. We will discuss this further down the road for now 

This is the iterative steps I came up with:

1. Set all $a_i^0 = 100$ and $d_i^0 = 100$ for all $i$.
2. Update $a_i$ by the following formula:
$$a_i^{t + 1} = \sum_{j \in T} S_A(t_i, t_j) \cdot d_j^t$$ then normalize the values such that $$\frac{1}{|T|}\sum_{i \in T} a_i^{t+1} = 100$$.
3. Update $d_i$ by the following formula:
$$d_i^{t + 1} = \sum_{j \in T} S_D(t_i, t_j) \cdot a_j^t$$ then normalize the values such that $$\frac{1}{|T|}\sum_{i \in T} d_i^{t+1} = 100$$.
4. Repeat steps 2-3 until convergence.

### Does this satisfy the bounds?

Let's now formally define the bounds listed above.

#### Bound 1
Let $$t_1, t_2$$ be two types such that $$S_A(t_1, t_j) = S_A(t_2, t_j)$$ for all $$t_j \in T \setminus \{t_k\}$$ where $$S_A(t_1, t_j) \geq S_A(t_2, t_j)$$ Then $$a_i \geq a_j$$.

Similarly
Let $$t_1, t_2$$ be two types such that $$S_D(t_1, t_j) = S_D(t_2, t_j)$$ for all $$t_j \in T \setminus \{t_k\}$$ where $$S_D(t_1, t_j) \geq S_D(t_2, t_j)$$ Then $$d_i \geq d_j$$.

#### Bound 2
Let $$t_1, t_2$$ be two types such that $$S_A(t_1, t_j) = S_A(t_2, t_j)$$ for all $$t_j \in T \setminus \{t_3, t_4\}$$ where $$S_A(t_1, t_3) \geq S_A(t_2, t_3)$$ and $$S_A(t_1, t_4) \geq S_A(t_2, t_4)$$, $$S_A(t_1, t_3) = S_A(t_2, t_4)$$, $$S_A(t_1, t_4) = S_A(t_2, t_3)$$, $$d_3 \geq d_4$$ Then $$a_i \geq a_j$$.

And similar for $$S_D$$. 

Let's now prove that the iterative approach satisfies these bounds.

#### Proof of Bound 1

We can prove this by induction. We first see that iteration 0 satisfies this bound as $a_i^0, d_i^0 = 100$ for all $i$.

Now let's assume that iteration $t$ satisfies this bound. We will show that iteration $t+1$ satisfies this bound.

Let $$t_1, t_2$$ be two types such that $$S_A(t_1, t_j) = S_A(t_2, t_j)$$ for all $$t_j \in T \setminus \{t_k\}$ where $S_A(t_1, t_j) \geq S_A(t_2, t_j)$$.

Then we have that

$$
\begin{aligned}
a_1^{t+1} &= \sum_{j \in T} S_A(t_1, t_j) \cdot d_j^t\\
&= S_A(t_1, t_k) \cdot d_k^t + \sum_{j \in T \setminus \{t_k\}} S_A(t_1, t_j) \cdot d_j^t\\
&\geq S_A(t_2, t_k) \cdot d_k^t + \sum_{j \in T \setminus \{t_k\}} S_A(t_1, t_j) \cdot d_j^t\\
&= \sum_{j \in T} S_A(t_2, t_j) \cdot d_j^t\\
&= a_2^{t+1}
\end{aligned}
$$

Thus we have that $a_1^{t+1} \geq a_2^{t+1}$ and we are done.

We can prove the same for defense ratings.

#### Proof of Bound 2

We can prove this also by induction. We first see that iteration 0 satisfies this bound as $$a_i^0, d_i^0 = 100$$ for all $$i$$ and thus satisfies the bound.

Now let's assume that iteration $$t$$ satisfies this bound. We will show that iteration $$t+1$$ satisfies this bound.

Let $$t_1, t_2$$ be two types such that $$S_A(t_1, t_j) = S_A(t_2, t_j)$$ for all $$t_j \in T \setminus \{t_3, t_4\}$$ where $$S_A(t_1, t_3) \geq S_A(t_2, t_3)$$ and $$S_A(t_1, t_4) \geq S_A(t_2, t_4)$$, $$S_A(t_1, t_3) = S_A(t_2, t_4)$$, $$S_A(t_1, t_4) = S_A(t_2, t_3)$$, $$d_3 \geq d_4$$.

Then we have that

$$
\begin{aligned}
a_1^{t+1} &= \sum_{j \in T} S_A(t_1, t_j) \cdot d_j^t\\
&= S_A(t_1, t_3) \cdot d_3^t + S_A(t_1, t_4) \cdot d_4^t + \sum_{j \in T \setminus \{t_3, t_4\}} S_A(t_1, t_j) \cdot d_j^t\\
&\geq S_A(t_2, t_3) \cdot d_3^t + S_A(t_2, t_4) \cdot d_4^t + \sum_{j \in T \setminus \{t_3, t_4\}} S_A(t_1, t_j) \cdot d_j^t\\
&= \sum_{j \in T} S_A(t_2, t_j) \cdot d_j^t\\
&= a_2^{t+1}
\end{aligned}
$$

Thus we have that $$a_1^{t+1} \geq a_2^{t+1}$$ and we are done.

### Talk on bounds of function S

So far, we have been hand wavy about the function $$S$$. We set the bounds so that the image of $$S$$ is non-negative and follows the order of ranking of types. Higher output of $$S$$ meant that the type got more "points" for attacking or defending.

To make function easier to define let's divide function $$S$$ into two. Let function $$E: T \times T \rightarrow \mathbb{R}$$ be the effectiveness multiplier according to the effectiveness chart and $$M_A: T \times T \rightarrow \mathbb{R}$$ be a function that sets the "score factor" for effectiveness on the attacking side and $$M_D: T \times T \rightarrow \mathbb{R}$$ be a function that sets the "score factor" for effectiveness on the defending side. $$S$$ can be defined as the composition of these two functions. $$S = M \circ E$$.

Since for the single type, there are only four effectiveness multipliers. $$[0, 0.5, 1, 2]$$. We only need to define $$M_A$$ and $$M_D$$ for these four cases. Let's denote $$M$$ as $$[a,b,c,d]$$ where the type effectiveness score for $$0$$ is $$a$$, for $$0.5$$ is $$b$$, for $$1$$ is $$c$$, and for $$2$$ is $$d$$.

For starter, let $$M_A : [1,2,3,4]$$ and look at a toy example were there are three types, $$x,y,z$$ Also, assume that they all have a initial defense rating of 100. 


| Effectiveness |  X  |  Y  |  Z  |
|---------------|-----|-----|-----|
| X             |  1  |  1  |  1  |
| Y             | 0.5 |  1  |  2  |
| Z             |  0  |  2  |  2  |

For the first iteration of unnormalized attack, we see 

$$\alpha_X^1 = 3 \cdot 100 + 3 \cdot 100 + 3 \cdot 100 = 900$$

$$\alpha_Y^1 = 2 \cdot 100 + 3 \cdot 100 + 4 \cdot 100 = 900$$ 

$$\alpha_Z^1 = 1 \cdot 100 + 4 \cdot 100 + 4 \cdot 100 = 900$$

We see that each type after one update has the same attack rating. From comparing $$\alpha_X^1$$ and $$\alpha_Y^1$$, we see that the above scores set the score delta of super effectiveness and not very effectiveness to be the same.From $$alpha_X^1$$ and $$\alpha_Z^1$$, we see that having non-effective attack deficit is the same as having the increment of two super effective attacks. In other words, we can easily be compared by looking at the difference between score of danagae multiplier one and other value to determine how $$M$$ affects the ratings.

By subtracting the list with score for damage multiplier one, we see that $$[-2, -1, 0, 1]$$. We can interpret this having two not very effective attacks is same as having one non-effective attack. We also see that score increment by having one super effective attack is same as the score decrement by having one not very effective attack.

Not only can we change the "score factor", we got a easily explainable score factor. If a person decided that five not very effective attcak types is equal to four super effective attack types, one can modify the score factor so that $$M_A : [-x, -4, 0, 5] + x$$.

### Results

With $$S_A = \{0: 0, 0.25 : 1, 0.5 : 2, 1: 3, 2: 4, 4: 5 \}$$ and $$S_D = \{0: 5, 0.25 : 4, 0.5 : 3, 1: 2, 2: 1, 4: 0\}$$ 

We get the following ratings

#### Attack Ratings


| Type     | Offensive Rating |
|----------|------------------|
| Rock     | 105.430          |
| Ground   | 104.483          |
| Water    | 104.122          |
| Fire     | 104.076          |
| Ice      | 103.692          |
| Flying   | 103.450          |
| Fairy    | 103.411          |
| Dark     | 102.145          |
| Steel    | 101.347          |
| Ghost    | 100.200          |
| Psychic  | 97.940           |
| Fighting | 97.740           |
| Dragon   | 97.498           |
| Electric | 96.592           |
| Grass    | 95.932           |
| Bug      | 95.287           |
| Normal   | 93.581           |
| Poison   | 93.074           |

#### Defense Ratings

| Type     | Defensive Rating |
|----------|------------------|
| Steel    | 120.872          |
| Ghost    | 110.016          |
| Fairy    | 105.606          |
| Flying   | 103.053          |
| Fire     | 102.868          |
| Poison   | 102.691          |
| Water    | 101.044          |
| Normal   | 100.571          |
| Dark     | 100.489          |
| Electric | 100.414          |
| Ground   | 100.087          |
| Dragon   | 97.749           |
| Fighting | 95.155           |
| Bug      | 94.815           |
| Grass    | 92.603           |
| Psychic  | 92.510           |
| Rock     | 92.312           |
| Ice      | 87.143           |

You can check out the code [here](https://github.com/blindTissue/Pokemon_Type_Ranking).

Coming Soon: System of Linear Equations approach and Dual typing ranking! 




### Timeline
2024-02-16: Started writing the post
2024-02-18: Finished completing draft.