+++
title = "fickle direnv Nix submodule syntax"
description = ""
tags = [
    "development",
    "notes",
    "til",
]
date = "2024-11-12"
categories = [
    "Nix",
]
+++

## fickle direnv Nix submodule syntax

In trying to chase down a bug, I was trying to run a very old commit of a project of mine.
No problem, I thought, it's got a Nix Flake, so it will be easy to get running again.
Turns out, I'd done some cleanup since then to significantly improve the Nix UX of the repo,
and I'd forgotten the exact incantations to get it to work.

It took me a while to track [this explanation](https://github.com/nix-community/nix-direnv/issues/510#issuecomment-2283830375)
down which I'll reproduce here:

- `.?submodules=1`: Broken, no submodule copied into store
- `.?submodules=1#default`: Broken, no submodule copied into store
- `'.?submodules=1'`: works (Note single quotes around the flake reference)
- `'.?submodules=1#default'`: works (Note single quotes around the flake reference)

So in my case I needed

```.envrc
use flake '.?submodules=1#default' --impure
```

Let's hope this helps me remember my single quotes in the future!

