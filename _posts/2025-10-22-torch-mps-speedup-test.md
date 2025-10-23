---
layout: post
title: Torch MPS Basic Speedup Test
date: 2025-10-22
description: A basic speedup test of PyTorch on MPS (Apple Silicon) vs CPU.
tags: machine-learning
featured: False
---

# PyTorch MPS Performance Tips

Conducted quick experiments to find what actually speeds up PyTorch code on Apple Silicon (MPS).

Based on [this video](https://www.youtube.com/watch?v=IAEysH-6VvM).


## tl;dr

Keep tensors on GPU from the start, vectorize everything, avoid dynamic shapes.
Code can be found [here](https://github.com/blindTissue/torch_mps_speedup_test).

## What's tested

- **Creating tensors**: CPU to GPU vs creating directly on GPU
- **Runtime constants**: Dynamic tensor creation vs `register_buffer`
- **Masking**: Different masking approaches (indexing vs vectorized ops)
- **DataLoader**: `pin_memory` and `non_blocking` flags

## Quick findings

1. **Create tensors directly on device** - Up to 80x speedup for larger tensors for creation and basic ops.
   ```python
   # Slow
   tensor = torch.randn(size, size).to(device)

   # Fast
   tensor = torch.randn(size, size, device=device)
   ```

2. **Use `register_buffer` for constants** - Up to 8x speedup.
   ```python
   self.register_buffer('constant', torch.tensor(..., device=device))
   ```

3. **Vectorize masking operations** - Massive speedup (50-90x)
   ```python
   # Slow - creates irregular tensor
   result = attention_map[attention_map > .5].mean()

   # Fast - stays vectorized
   mask = (attention_map > .5).float()
   result = (attention_map * mask).sum() / mask.sum().clamp(min=1e-9)
   ```

4. **Use `non_blocking=True`** - Small improvement (~5%)
   ```python
   data = data.to(device, non_blocking=True)
   ```
   Note: `pin_memory` doesn't help on MPS (not supported yet)



