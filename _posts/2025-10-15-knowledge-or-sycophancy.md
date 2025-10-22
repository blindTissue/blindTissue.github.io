---
layout: post
title: Further Look into Cancer-Myth. Is the Cause Lack of Knowledge or Sycophancy?
date: 2025-10-14
description: Does the AI model know the incorrect answer or is it ignoring to answer the question?
tags: Random
featured: False
---

### Premise

[Cancer-Myth: Evaluating Large Language Models on Patient Questions with False Presuppositions](https://arxiv.org/pdf/2504.11373) showed that LLMs, when prompted with questions which have false medical presuppositions, does not readily detect these presuppositions. There are there are two possible points of failure.

1. LLM does not know about the false medical presupposition.
2. LLM blindly follows user input, sign of sycophancy.

Problem (1) would indicate that LLM's lack medical knowledge, while problem (2) would suggest sycophancy.

### Dataset

The Cancer-Myth paper includes a public [dataset](https://huggingface.co/datasets/Cancer-Myth/Cancer-Myth). Sampled 20 first questions for this experiment. Each items in the dataset includes question, incorrect presuppostions, and other informations.

### Experiment

Implemented a basic presupposition checker. Made LLMs

1. Deconstruct user query into presumptions
2. Check the factuality of each presumptions
3. Condense the report to ones that are shown false
4. Compare with the ground truth information

Tested with Anthropic's Claude 4 Sonnet, and 3.5 Haiku models.

### Results

On the first 20 questions, Both LLMs almost always found the correct response. Using the scoring rubric of [-1, 0, 1] (Provided in the paper), we have

| Model            | +1  | 0   | -1  |
| ---------------- | --- | --- | --- |
| Claude 3.5 Haiku | 20  | 0   | 0   |
| Claude 4         | 17  | 2   | 1   |

### Limitations

- Tested on only 20 questions.
- Didn't compare the result to simple LLM QA (Might be the case that the chosen 20 questions were easy)
- Deconstructing and validating might be too over the board.
  - Simple QA of prompting LLM to detect incorrect presummptions might have been good enough.
- evaluator, deconstructor, and presumption checker all used same model. Would have been better if different LLM were used for evaluator.
- Only tested on Anthropic's Claude models. Would be interesting to see how other models behave.

[github link](https://github.com/blindTissue/presumption_checker)
