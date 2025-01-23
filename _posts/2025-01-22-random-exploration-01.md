---
layout: post
title: Random Idea Exploration 01
date: 2025-01-22
description: How many phones can Pyramid of Giza charge? How much plot of land is required to feed?
tags: Random Thoughts
featured: False
---

Do you ever have some idea that pops up in your head when you are doing something else? I have them from time to time. I am writing on some of those ideas that require more than a simple google search to answer.


### How many phones can pyramid of Giza charge?

Today in class, as a ice breaker, we were to discuss the "best" invention in human history. The main point, I guess, other than a quick ice breaker, was to get us to think of the metric or a standard for "best"ness.

After some discussion, I thought maybe, the metric of "best" can be described as how much movement the invention has caused. For example, the internet would have caused a lot of movement in the world as online shopping, international trade would have happened less in the counterfactual world.

Then, the train of thought had led me to think of method to measure the movement. The easiest method (which is not really accurate in this example) would be to calculate the energy used to move item.

The easiest calcuation of such energy would be potential energy. This made me think of potential energy of the pyramid of Giza.

#### Calculation of potential energy.

Potential energy is given by $$PE = mgh$$. We would require mass, dimension of the pyramid to calculate this. From quick internet search

* Hieght: 146.7 meters
* Base: 230.6 meters
* Density (limestone): 2.7 g/cm^3

source: [wikipedia](https://en.wikipedia.org/wiki/Great_Pyramid_of_Giza#:~:text=The%20dimensions%20of%20the%20pyramid,6%20million%20tonnes%20in%20total.)

The height of the pyramid differ from source and time of measurement. I am using the one that is said to be the original dimension.

Pyramid of Giza is mostly full of limestone. Thus we can use its shape to estimate the potential energy.

For each $$h$$ height, the area of the horizontal cross section would be given by $$(230.6 - 230.6 \frac{h}{146.7})^2$$. Thus we can calculate the potential energy by 

$$
PE = \int_0^{146.7} 2.7 \times 9.8 \times h \times (230.6 - 230.6 \frac{h}{146.7})^2 dh
$$

Which, according to Wolfram Alpha is $$2.52 \times 10^9 kJ$$.

Now, an Iphone 16 has battery of 3561mAH with 3.85V. Thus the total energy inside the battery would be 13.7Wh. In Joules, that would be $$13.7 \times 3600 = 49320 J$$.
Thus the total number of phone charges would be $$2.52 \times 10^{12} / 49320 = 5.11 \times 10^7$$. That is 51.1 million charges.
That looks like a lot, but considering that there are around that many people in South Korea, the potential energy of the pyramid is equal to energy used to fully charge South Korean people's phones once. That's Kind of depressing.

### What is the lower bound of land required to feed one person?

I live around the Yangjae river in Seoul. During the summer, there is a small plot of land that is used to grow rice. (This place doubles as a ice rink in the winter.) I used to wonder how much rice grows from that plot of land.

Furthermore, rice is known to be relatively calorie dense compared to other crops. It is more calorie dense than wheat, barley, and oats but less than potatoes. So having a rough estimate of amount of calories that can be produced from a unit of land could be used to estimate the lower bound of land required to feed one person. Since people don't live on carbs alone, we would assume that lower bound would be higher than amount of calories that can be produced by rice.

According to [United States Department of Agriculture](https://www.indexmundi.com/agriculture/?commodity=milled-rice&graph=yield), the country with best milled rice yield per hectare is Australia, with 10MT / hectare. Northeast Asia, Japan, South Korea, and China, has yield of 7 MT / Hactare. For the sake of simplicity, let's estimate using 7MT / Hactare.

People typically consume 2000kcal per day. Also, milled  rice has around [365Kcal per 100g](https://en.wikipedia.org/wiki/White_rice). Thus, we can see that 

* 1 hectare of rice creates $$7 \times 10^3 \times 3.65 \times 10^3 = 2.56 \times 10^7 kcal$$
* A Hectare of land can feed **12800** people per day.
* In order to sustain one person, we would need $$(100000 / 12800) \simeq .78m^2$$ of land.

So in caloric perspective, we only need a little less than one square meter to feed a person per day. We neede a little less than 300 square meters to feed a person annually.
