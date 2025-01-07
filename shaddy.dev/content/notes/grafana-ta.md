+++
title = "Shortcut to turn Grafana relative times to absolute ones"
date = 2025-01-07T12:59:17+01:00
description = "You can turn relative Grafana time frames to absolute ones by pressing `t` and `a`"
tags = [
"grafana", "ux"
]
+++

We're going a bit more niche today.

Sometimes, you select a specific time frame in Grafana, like the last hour, where an event happened, to anaylse logs or metrics.
Then you refine your filters or you want to share a link with others, but turning that relative time selection into an absolute one is cumbersome.

Well, there's a trick.
You can press first `t` and then `a` to turn the selected time frame into an absolute one, see [here](https://github.com/grafana/grafana/pull/43802).

![shortcuts](https://user-images.githubusercontent.com/30407135/222729827-e75344e2-8f62-4662-8fda-d3fbf4d22b27.png)

I have often looked for a button like this and never found it.
Frankly, the discoverability of this feature which is so nice to have is terrible.
Please, if you have great features like this, make it easy for me to use them!

