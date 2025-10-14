---
layout: post
title: Simple Attention Visualizer
date: 2025-10-14
description: Simple Attention Visualizer
tags: Random Code
featured: False
---

## Description
I have created a simple attention visualizer for transformer models. It is available at [this link](https://github.com/blindTissue/attention_visualization). It can 

1. Visualize all attention heads for a specific layer
2. Show average attention for each layer.
3. Single heatmap averaging all layers and heads.

The code should work for any causal LLMs.

More Details in the Repository. 


## Visualization Examples

{% include figure.liquid loading="eager" path="assets/img/attention_visualizer/all_attn.png" class="img-fluid rounded z-depth-1" %}

{% include figure.liquid loading="eager" path="assets/img/attention_visualizer/layerwise_attn.png" class="img-fluid rounded z-depth-1" %}

{% include figure.liquid loading="eager" path="assets/img/attention_visualizer/added_by_layer.png" class="img-fluid rounded z-depth-1" %} 



