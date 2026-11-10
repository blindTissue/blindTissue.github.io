---
layout: post
title: Automating KV Cache Eviction Research with Agents (Part 1)
date: 2026-11-10
description: Setting up an arena where Claude Code and Codex agents compete to invent KV cache eviction methods.
tags: LLM
featured: True
---

# Premise

Agents have become good at formulating and executing research ideas [ex](https://arxiv.org/abs/2504.08066)[am](https://arxiv.org/pdf/2502.18864)[pl](https://arxiv.org/abs/2610.18933)[es](https://arxiv.org/html/2611.08478v1). Scientific discovery agents work well in environments where (1) experiments are cheap, (2) feedback is trustworthy, and (3) the search space is rich enough to reward exploration.

I saw KV cache eviction—the topic I had been working on for the better part of a year—as a prime target for scientific discovery agents. Papers report performance on popular evaluation datasets, and evaluations on a benchmark often take several of hours (Full evaluation suite does take week(s), but a fwe-hour signal is often good enough for determining method's success). Furthermore, the recent shift in released LLM architectures from GQA-based Transformers toward architectures that interleave SSM and attention layers suggests that there is ample room to experiment with new methods.

So I built a small arena, to test if automated KV eviction research was worth pursuing. This post covers the first run. It includes how it was set up, what the agents made, and what broke.

## KV Cache Eviction

LLMs spanning long context is bottlenecked by KV cache, both in memory size, memory bendwidth required to compute attention. One method to reduce this bottleneck is KV eviction, evicting parts of context which are deemed less important in inference. There are mainly two different veins of eviction. (1). evicting entire chunks of KV cache, and (2). removing KV cache headwise. We focus on the second part.

Eviction particularly works in three steps: prefill, evict, then decode. First, LLM prefills long context to obtain its KV cache. Then, the eviction method evicts caches based on its importance. The importance is usually some heuristics of the attention scores. After eviction, decode phase generates tokens. 

The steps are also dependent on the eviction strategy. For example, a layerwise fixed budget strategy can encorporate eviction during prefill ([PyramidInfer](https://arxiv.org/abs/2405.12532); [CAKE](https://arxiv.org/abs/2503.12491)). Long reasoning generation can interweave eviction with decode, evicting when the cache budget is filled ([example](https://arxiv.org/abs/2505.24133)).

Most eviction methods operate on a pure-attention transformers. However, recent public models are often built with interleaved ssm and attention. To adapt, we can employ the pure-attention eviction methods to the attnetion layer of the interleaved models.

Some studies find (as well as our experiments) that method's effectiveness is not directly translated between pure-attention and interleaved attention ([1](https://arxiv.org/pdf/2609.27470) [2](https://arxiv.org/abs/2607.01299)). Exploration in this problem thus seemed ample, perfect for agentice research.

## Automated Research Setup

In my free time, using unused compute, I had prompted LLMs to conduct research on a well-studied topic. Here are some problems I observed:

1. When the research topic was not well scoped, for example, “With this information, produce a result that would have an impact on researchers”—agents tended to pursue minor experiments with little broader significance.

2. When prompted multiple times with the same setup, the LLMs would often converge on similar experiments.

3. When the setup awarded points for completing certain tasks, agents would often choose the path of least resistance, sometimes coming close to reward hacking.

These observations were all addressed in the experimental setup.

| Problem | Experimental Design |
|---|---|
| Vague goals | A fixed model, fixed benchmarks, fixed budgets and a numeric score on a public leaderboard. Models compete on a shared leaderboard to maximize their scores. |
| Convergence | We employed four agents from two different model families. We prompted the agents to start on different leaderboards. |
| Shortcuts | The test set of the leaderboard was hidden to the agents. Also, we encorporated judges for evaluating agents' eviction methods. The judge reads the agent's tool-call log and flag rule violation. Furthermore, the agents do not have access to judge's reasoning to inhibit writeup-maxxing. |

{% include figure.liquid loading="eager" path="assets/img/automating_eviction_research_with_agents_part_1/research_setup.svg" class="img-fluid rounded z-depth-1" %}

The above image displays the structure of the automated research. Each agent has access to three leaderboards, and could submit an entry code and short explanation to each. Independent judges see the description and code, and return a score. Furthermore, a benchmark on a hidden test set is run. The leaderboard is updated with both benchmark and judge scores, and the agent is awarded points based on those scores. Below, we further describe the setup.



### Agents
We deployed 2 Claude Code agents and 2 Codex agents. The models were Opus 5.5 and Sol 6.1, respectively, both with high reasoning effort. Each model ran autonomously around the clock in its own sandbox with one RTX A6000. Their memories were saved independently in `JOURNAL.md` for a continuous chain of reasoning. Each agent could make up to 5 official submissions per 24 hours and run unlimited evaluations on the dev set.

The agents could see the harness code, the method interface, and the baseline methods. They could not see the test split, other agents' directories, the judges' reviews, or HuggingFace (since it hosts benchmark datasets). Every tool call and network connection was logged and monitored by the judges.

### Harness Setup
The models were allowed to create a Python class which receives the queries and keys of each attention layer and returns the entries to keep or rewrite. The harness is in charge of the other parts of inference and cost measurement, such as prefill, decode, budgets, benchmark, and measurements.

Agents submitted a directory with `method.py` and `DESCRIPTION.md` for their method. `method.py` includes their eviction code, and `DESCRIPTION.md` is an overview of their method, including the idea behind the implementation, a method summary in English, its relation to prior published work, evidence that it should work, limitations, and any arena implementation it builds on.

## Leaderboards

There are three leaderboards, each with a different setting. Each benchmark was sized to take about an hour per submission.

| Board | Setting | Budget | Benchmark (test split) |
|---|---|---|---|
| A | Query-aware prefill | keep 2 / 5 / 10% of the context KV | RULER at 32K (8 tasks × 15 items) + 50 LongBench v2 items |
| B_online | Query-agnostic prefill, end to end | keep 10 / 25 / 50% | RULER at 32K (8 × 10) + 35 LongBench v2, several questions per context |
| B_offline | Same run as B_online, slow one-off compression allowed | same | same |
| C | Decode-time eviction while reasoning | at most 2,048 / 4,096 tokens per layer | 80 MATH-500 problems, pass@1, up to 16,384 new tokens |

Accuracy and efficiency are the two parts of the benchmark score. Accuracy is normalized to the full cache on the same items and averaged over tasks and budgets. Efficiency terms are measured against full-cache runs. We measure peak KV memory, decode speed, compression overhead, and, on C, generated length.

Before the research started, the agents set the weights. The four agents spent three rounds proposing, critiquing, and voting on the weights. I set the limits (accuracy >= 0.6, or 0.5 on C, memory + speed >= 0.15) and accepted the median vote. The votes were nearly unanimous ([link to discussion](https://claude.ai/artifact/AQnwS1f4jDjXq3iJJqHPfe))

**Baselines**: Twelve published methods were reimplemented (with Claude Code) on the same method-harness interface. The methods were:

- A: SnapKV, PyramidKV, Ada-KV and TOVA
- B: StreamingLLM, K-norm, Expected Attention, KVzip, Query-agnostic SnapKV
- C: H2O, TOVA and R-KV

Random eviction and the full cache were also run on every board. The best methods were Ada-KV on A (0.770), KVzip on both B boards (0.430 online, 0.608 offline), and H2O on C (0.669). These methods set the starting bar on each board.

*Side note*: A was originally tested with budgets of 10 / 25 / 50%. Existing methods already matched the full cache, so A's budgets were lowered to 2 / 5 / 10%.

**Points**. A submission earned benchmark points only for beating the board's current best, with the lower end of the 95% CI on the gain at +0.005 or more. The first submission for each board gained 20 points if the judge rated its novelty at least 2 / 5. An agent's total counted its single best submission per board. Benchmark improvement was measured based on the best available method. I think the points system was the most flawed part of this run. A later part of this post covers its consequences.

### Judge

Every submission was reviewed by an Opus 5.5 and a Sol 6.1 judge. Each read the agent's submission bundle and had access to the web. The judges also had access to earlier submissions and the agent's tool-call log. Web search was mandatory, as the judges had to look for prior work and check every citation.

The judges scored novelty (0-5), effectiveness (0-5), and soundness (0-3), worth up to 30 points. The judges could also raise the flags `MISSTATED_METHOD`, `UNDISCLOSED_PRIOR_ART`, `FABRICATED_EVIDENCE`, `RULE_VIOLATION`, and `MISSING_ATTRIBUTION`. A flag zeroed the submission and cost 20 points. If the two runs disagreed by more than one point, a third run broke the tie, using the model family that had not written the submission.

Before launch, the judges reviewed all twelve baselines with their names hidden. They rated every one novelty <= 1 and found the right source paper every time.

### Additional Information

The run was originally planned as a two-week run. The first week was isolated research (with scores and summaries shared), followed by a week in which the code was opened and agents could collaborate openly. The second week was not realized, and the run was stopped after ~40 hours.

## Results
The automatic research ran for ~40 hours (October 18–19, 2026) before I stopped it and treated it as a test run. The full report can be found [here](https://claude.ai/artifact/AQnwS1f4jDjXq3iJJqHPfe).

**Only two of the four agents submitted anything.** The two Claude agents made 8 submissions, 4 each. The Codex agents submitted none.


| Finished (UTC) | Submission | Board | Overall | Best before | Points |
|---|---|---|---|---|---|
| Oct 18 11:14 | agent1-001 `probevr` | B_online / B_offline | 0.647 / 0.698 | 0.430 / 0.608 (KVzip) | new bar on both |
| Oct 18 11:31 | agent2-001 `headprobe` | B | 0.606 / 0.645 | 0.647 / 0.698 | judge only |
| Oct 18 13:13 | agent1-002 `wherewhat_a` | A | 0.812 | 0.770 (Ada-KV) | new best |
| Oct 18 13:40 | agent2-002 `spanvote` | A | 0.811 | 0.812 | judge only |
| Oct 18 18:04 | agent2-003 `kvprior` | C | 0.713 | 0.669 (H2O) | new best |
| Oct 18 19:57 | agent1-003 `foresight_c` | C | 0.658 | 0.713 | judge only |
| Oct 18 22:48 | agent1-004 `foresight_c2` | C | 0.680 | 0.713 | judge only |
| Oct 19 06:46 | agent2-004 `kvprior_skim` | C | 0.691 | 0.713 | judge only |

Every board was beaten within the first 12 hours. However, the submissions after the first 12 hours failed to move the performance bar forward.

The efficiency terms were mostly constant.


### Some interesting implementations

**`wherewhat_a` (Agent 1, board A, 0.812).** SnapKV's question-window attention says *where* the answer is, but at a low percentage, it spends the budget on a few high-attention tokens and misses the tokens needed to *read the answer back*. Reconstruction (KVzip, EchoPress's approximation) scores *what* is needed per token but ignores the question. This method multiplies the two, `score = snapkv_score x simplified_echopress_score`. With Ada-KV's allocation, accuracy at the 2% budget rose from 0.82 to 0.94 of the full cache.


**`spanvote` (Agent 2, board A, 0.811).** Head analysis finds that the answer is located by a few heads in one layer but copied digit by digit by heads in other layers. Thus, a single attention score per head might leave out heads essential for data recall. Spanvote lets all KV heads for a token (all layers, heads) vote on the location of the answer, weighted by calibrated per-head importance. It applies slight span-score propagation and gives every head the `max` of its own score and the span-voted score.

**`probevr` (Agent 1, board B, 0.647 / 0.698).** Board A is a query-aware setting, while Board B is query-agnostic. `probevr` uses a probing query, "List every name, number, code, and key fact stated in the text above", and implements a scoring system in the same vein as `wherewhat_a`.

**`kvprior` (Agent 2, board C, 0.713).** An oracle study on dev traces showed that keeping tokens that gain attention over the rest of the trace is important. However, short-horizon oracles lose to H2O. In Qwen 3.5 9B, only 64 of the 256 key dimensions get RoPE, so the other 192 key dimensions plus the value describe a token independently of position. A ridge regression on those features predicts long-horizon attention, fitted in 5 GPU minutes.

All the approaches are directions I would have taken. My assessment is that none of the methods are completely new; the agents successfully merged multiple methods into one.

## Problems

### Scoring setup

Problems in scoring were what caused me to stop the research loop prematurely.

I created the scoring rules fearing that the models would abuse the system with low-quality submissions. However, the combination of rules backfired and caused the models to stop submitting.

The two major rules were: (1) only the best implementation per board and agent was scored, and (2) the performance gain was measured only against the previous best-scoring method. Agent 1, which scored first on three out of four (since B has two sub-leaderboards), stopped researching, calling the leaderboard "locked". To improve its score, Agent 1 needed to (1) score better than its previous submission and (2) beat it by a larger margin than the previous improvement, so the agent considered the task not worth pursuing. In fact, on leaderboard A, even with a perfect score, Agent 1 couldn't gain any points. The 95 percent CI gate only made the problem worse. Agent 2, with similar reasoning, went idle later.

### The two Codex agents never submitted

Part of it was because of harness bugs, but part of it was behavior.

Codex set `CUDA_VISIBLE_DEVICES=-1`, so the agents could not see the GPUs in the cluster. This resulted in the models doing CPU-only work for the first couple of hours. Furthermore, the Codex agents were often stuck in over-verification loops. Agent 3's journal was mostly source and math reviews of papers and of the harness (2,327 tool calls a day). Agent 4 ran a 13-method study on "copy" variants that performed close to H2O on the dev set and refused to continue unless the results were strongly better than previous methods. Both spent roughly 600M input tokens over the run without a submission.




