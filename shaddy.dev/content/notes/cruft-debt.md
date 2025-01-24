+++
title = "analysing tech debt as CRUFT"
date = 2025-03-25T16:51:03+01:00
description = "the axes along which to optimise the maintainability of your code base"
tags = [
"programming", "CRUFT", "technical debt"
]
+++

on the [two's complement podcast](https://www.twoscomplement.org), there was recently
[an episode on technical debt](https://www.twoscomplement.org/podcast/cruft.mp3),
where they try to really dig into what technical debt actually means and how
it can be measured.
one of the hosts, ben rady, has since turned the idea into a more fleshed-out blog
post [here](https://www.benrady.com/2024/12/cruft-an-alternative-to-the-technical-debt-metaphor.html).

he introduces the acronym CRUFT:

> CRUFT represents five dimensions of technical debt:
> 
> - Complexity - How much code do we need to understand?
> - Risk - What unwanted behavior do we have?
> - Use - What wanted behavior do we have?
> - Feedback - How fast can we learn?
> - Team - Who can support the system?

the goal, then, is to optimise along those dimensions to have a usable code base that does
what you want it to do.
you'll often need to trade off different dimensions against each other, new uses introduce
new risks, and a better team with lower bus factor reduces risk.

if the concept sounds interesting to you and you want to dive deeper, i encourage you to check
either the podcast or the blog post out yourself

