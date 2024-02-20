---
layout: post
title: Strategy for Number Baseball
date: 2024-02-16 14:00:00
description: Is there an optimal strategy for the game Number Baseball?
tags: for-fun math in-progress
featured: false
---

As part of my mandatory military service, I was sent to the Korean Army Training Center. With no phones or electronice but an abundance of paper and pen, our squad had to find a way to entertain ourselves during our free time. One of the games we played was called Number Baseball. Our variation of the game had the following rules.

1. The game is played between two players. Each player guess a 4-digit number. The digits of the number must be unique. The objective is to guess the opponent's number.
2. The game starts with a player guessing the number. The opponent then gives feedback in form of $$n$$ strikes and $$m$$ balls. $$n$$ strikes means that $$n$$ digits of the guessed number are in the correct position. $$m$$ balls means that $$m$$ digits of the guessed number are in the opponent's number but in the wrong position.
3. The two players take turns guessing the number. The game ends when a player correctly guesses the opponent's number.

I started to wonder if there was an optimal strategy for this game. Since there are only $$9 \choose 4$$ possible numbers, there must be a way to find the opponent's number in a minimum number of guesses. 


## Simplified Version

My math education taught me was to simplify the problem to gain intuition.

We can think of a game where we instead guess less digit numbers. If we were to play a game guessing 1 digit number, then the game or the optimal strategy would be trivial. We would simply guess all the numbers from 0 to 9 until we find the correct number. The game would take at most 10 guesses.

Things get more interesting when we guess 2 digit numbers. The first choice does not matter as all choices are symmetric to others. Let's say that we chose number $$01$$.


|Possible outcomes      |# Possible outcomes| Example      |
|-----------------------|--------------|-------------|
| 2 strike              | 1            | 01          |
| 2 ball                | 1            | 10         |
| 1 strike              | 16           | 21, 04     |
| 1 ball                | 16           | 20, 13     |
| none                  | 56           | 47, 53     |

