---
layout: post
title: Showcase of EMNLP Sycophancy Papers
date: 2025-11-07
description: 
tags: LLM
featured: True
---

The EMNLP 2025 papers are [out](https://aclanthology.org/events/emnlp-2025/)! Congrats to everyone who had their papers accepted.

As an accepted author myself, I decided to explore other papers that examined my paper’s topic: **LLM Sycophancy**. Below are a few bullet points for each paper.

## [Self-Augmented Preference Alignment for Sycophancy Reduction in LLMs](https://aclanthology.org/2025.emnlp-main.625)

<!-- ### Abstract
Sycophancy leads models to produce answers that cater to user expectations rather than truth. This behavior can erode trust by creating a perception of bias or dishonesty, prompting users to question a system’s reliability and objectivity. Although RLHF is effective for aligning models with human preferences, prior work has found that it can also amplify sycophancy. Most of those studies, however, examined proprietary models and relied on indirect analyses of human feedback. In contrast, our study focuses on open‑source models to enable transparent, reproducible investigation. We directly compare models aligned with human feedback to those without such alignment to assess the impact on sycophancy. Rather than ignoring the user’s expected answer, we propose explicitly assessing it. To this end, we introduce the Sycophancy Answer Assessment (SAA) dataset and Self‑Augmented Preference Alignment, and show that these methods improve assessment ability and significantly reduce sycophancy across tasks. -->
{% include figure.liquid loading="eager" path="assets/img/emnlp_sycophancy/SAA_dataset.png" class="img-fluid rounded z-depth-1" %}
- Created **SAA** dataset, which contains queries with user pressumption, correct answer, and incorrect alternatives.
    - The pressumptions are sometimes correct and sometimes incorrect.
- Trained LLM with SAA using Supervised Fine Tuning and Proximal Policy Optimization. Results show that in both scenarios, the rate of sycophancy decreased.
- I wonder if model trained with SAA works with out of domain pressumptions. the examples in the dataset are simple: they are single turn and the prompts pertain to simple questions.

## [Advancing Oversight Reasoning across Languages for Audit Sycophantic Behaviour via X-Agent](https://aclanthology.org/2025.emnlp-main.654/)

<!-- ### Abstract
Large language models (LLMs) have demonstrated capabilities that are highly satisfactory to a wide range of users by adapting to their culture and wisdom. Yet, this can translate into a propensity to produce responses that align with users' viewpoints, even when the latter are wrong. This behaviour is known as sycophancy, the tendency of LLMs to generate misleading responses as long as they align with the user's, inducing bias and reducing reliability.

To make interactions consistent, reliable and safe, we introduce X-Agent, an Oversight Reasoning framework that audits human–model dialogues, reasons about them, captures sycophancy and corrects the final outputs. Concretely, X-Agent extends debate-based frameworks by (i) auditing user-model conversations, (ii) applying a defence layer that steers model behaviour and goes beyond user beliefs, and (iii) extracting reasoning traces from evaluations that serve as training signals for mitigating sycophancy, all in a completely unsupervised way. We evaluate X-Agent across diverse scenarios and languages, showing that it consistently detects sycophancy, reduces unwarranted agreement, and improves cross-turn consistency, advancing a reasoning-as-overview paradigm for safer user-model and model-model interaction. Our approach introduces a novel paradigm in which reasoning is not merely a means to solve problems, but as a mechanism for overseeing the problem-solving processes of other models. -->

{% include figure.liquid loading="eager" path="assets/img/emnlp_sycophancy/x_agent.png" class="img-fluid rounded z-depth-1" %}

- Created a framework called **X-Agent**, an agent that checks for sycophancy in LLM responses.
- Their **X-Agent** successfully detects sycophantic responses, 
    - Defined sycophancy as when LLM accepts incorrect user presupposition.
    - Overall accuracy with X-Agent increased in most LLMs.
- The models fine tuned on the X-Agent rollout also improved performance for both accuracy and sycophancy


{% include figure.liquid loading="eager" path="assets/img/emnlp_sycophancy/x_agent_results.png" class="img-fluid rounded z-depth-1" %}

## [Sycophancy Mitigation Through Reinforcement Learning with Uncertainty-Aware Adaptive Reasoning Trajectories](https://aclanthology.org/2025.emnlp-main.661.pdf)

{% include figure.liquid loading="eager" path="assets/img/emnlp_sycophancy/smart_framework.png" class="img-fluid rounded z-depth-1" %}

- Created a **SMART** (Sycophancy Mitigate Through Adaptive Reasoning Trajectories) Framework 
    - Smart uses UA-MCTS(Uncertainty-Aware Adaptive Monte Carlo Tree Search) to generate high quality reaoning trajectory
    - In each reasoning step, future rollouts are created and scored based on the improvement of answer correctness probability compared to the last step.
- The rollouts with scores are then used to train Large Language Models.
    - The implementation outperforms other approaches.
    - Dense Reinforcement Learning on the rollouts outperforms SFT.

## [Pointing to a Llama and Call it a Camel On the Sycophancy of Multimodal Large Language Models](https://aclanthology.org/2025.emnlp-main.1020.pdf)

{% include figure.liquid loading="eager" path="assets/img/emnlp_sycophancy/SRT_framework.png" class="img-fluid rounded z-depth-1" %}

- Multimodal Large Language Models are more susceptible to Sycophancy compared to Large Language Models. 
- Created a pipeline called **SRT** (Sycophancy Reflective Tuning). 
    - This pipeline consists of image textualization -> reflection -> Summarization.
- Fine tuning on the SRT rollout resulted in better overall score compared to original prompting. 
    - Correction Rate (original answer incorrect, user suggestion correct) was reduced slightly, but Sycophancy Rate (original answer correct, user suggestion incorrect) increased considerably. 
    - Removing reasoning in SRT results in low Correction Rate.


## [Measuring Sycophancy of Language Models in Multi-turn Dialogues](https://aclanthology.org/2025.findings-emnlp.121.pdf)

{% include figure.liquid loading="eager" path="assets/img/emnlp_sycophancy/sycon_bench.png" class="img-fluid rounded z-depth-1" %}
- Authors proposed a benchmark called **SYCON-BENCH**, a benchmark for evaluating sycophantic behavior in multi-turn, free-form conversational settings
- Alignment Tuning increases sycophancy
- Model scaling reduces sycophancy
- Reasoning Models are More Robust
- Prompting in third person, creating a *Non-sycophantic* prompt can mitigate sycophancy
- Models can identify sycophancy when asked to, but are often sycophantic. This shows that sycophancy is not driven by ignorance.


## [Challenging the Evaluator: LLM Sycophancy Under User Rebuttal](https://aclanthology.org/2025.findings-emnlp.1222.pdf)

{% include figure.liquid loading="eager" path="assets/img/emnlp_sycophancy/challenge_evaluate.png" class="img-fluid rounded z-depth-1" %}

- Authors explored the discrepancy: LLMs are good as evaluative agents, but are sycophantic in follow-up questions. Since two actions are similar: choosing the better of the two different argument, what prompts an LLM to have this difference
- Found that conversational framework makes LLM more sycophantic
- More reasoning results in better persuasion, even if the reasoning is incorrect
- LLMs are more likely to be persuaded by casual prompts than by reasoned prompts.
- While casual prompt results in the best persuasion rate, the best correction rate is given when LLM is prompted as a judge.

## [Echoes of Agreement: Argument Driven Sycophancy in Large Language Models](https://aclanthology.org/2025.findings-emnlp.1241.pdf)
{% include figure.liquid loading="eager" path="assets/img/emnlp_sycophancy/echos_agreement.png" class="img-fluid rounded z-depth-1" %}

- LLMs are likely to echo user's presented stance
- LLMs tend to agree more when supporting arguments were provided and disagree more when refuting arguments were provided.
- LLMs are likely to change their stance both in single and multi turn settings.
- LLMs are more likely to change their stance for arguments with "better" strength. 
