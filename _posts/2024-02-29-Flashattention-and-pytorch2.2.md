---
layout: post
title: Flashattention and pytorch2.2
date: 2024-02-29 14:00:00
description: Exploring Flashattention in pytorch2.2
tags: transformers
featured: false
---

Pytorch 2.2 was relased recently in the blog post [here][https://pytorch.org/blog/pytorch2-2/]. The first paragraph is as follows:

"""
We are excited to announce the release of PyTorch® 2.2 (release note)! PyTorch 2.2 offers ~2x performance improvements to scaled_dot_product_attention via FlashAttention-v2 integration, as well as AOTInductor, a new ahead-of-time compilation and deployment tool built for non-python server-side deployments.
"""

The main topic is Flashattention. Let's look at the paper behind it.

### Flashattention

{% include figure.liquid loading="eager" path="assets/img/flashattention.png" class="img-fluid rounded z-depth-1" %}

Computer memory has an heiarchy. For GPU based learning, we have SRAM, HBM, and DRAM. 

