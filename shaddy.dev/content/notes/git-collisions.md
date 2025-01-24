+++
title = "Git vanity commits"
date = 2025-05-26T15:20:24+02:00
description = "Why some commits show the same id in github"
tags = [
"Git"
]
+++

Git commits have an id that is computed as a substring of a hash over the content of the
repository at this point in time, the commit author, message, timestamp, and related metadata.
Historically, this has been done using SHA-1, although efforts to transition to SHA-256 are
[underway](https://git-scm.com/docs/hash-function-transition).

Typically, these ids are unique, and even its prefixes are unique.
This means that applications often only show the first couple characters to identify a commit.
Even for a very large number of commits, with 6 hexadecimal characters you can uniquely identify
$16^6=16777216$ commits (ignoring the [birthday problem](https://en.wikipedia.org/wiki/Birthday_problem)).

But that is assuming that the commit hashes are equidistributed.
A ~~malicious~~ playful actor may go out of their way to generate commits whose hashes fulfil certain
properties.
Because hash functions are designed to make it impossible to correlate changes in the input with
specific changes in the output, adjustments to the commit timestamp are entirely sufficient to generate
completely new commit ids.
Just do this often enough until you get an id you're happy with.

Some examples are [lucky-commit](https://github.com/not-an-aardvark/lucky-commit).
On github, all of its commit prefixes are shown as all-0, which is very lucky indeed!
[Other projects](https://github.com/cemeyer/gitbrutec)
just happen to have ids that count up from 1.
Or consider this project where the $n$-th commit must have $n$ leading zeroes -- a fun concept!

But why are there only 14 commits?
Why not go the entire way until the entire hash is all zeroes?

Well, it's simple statistics.
1 in 16 hashes has a leading zero, as each character can be 0-9 and a-f.
If we're looking for 2 zeroes, only $\frac 1 {16^2}$ hashes fulfils that property.
You can see that the amount of work required to achieve longer prefixes rises rapidly
-- exponentially, in fact.
Finding 15 leading zeroes takes some serious compute.

While it is possible to generate [SHA-1 collisions](https://shattered.io/), it is still very
hard to find inputs that reproduce specific hashes.
Still, there are reasons why people want to move to SHA-256.

The [proof of work](https://en.wikipedia.org/wiki/Proof_of_work#Bitcoin-type_proof_of_work)
protocol in blockchains like bitcoin uses a very similar approach to determine how hard "mining" is.
Specifically, there you try to find a hash that falls below a certain numeric value.

On a related note, if you want to refer to a specific commit in a security-relevant context,
you probably want to use the entire hash rather than a too-short prefix.
Otherwise, things can [break](https://blog.teddykatz.com/2019/11/12/github-actions-dos.html).

All that is to say, if you come across weird commit prefixes in the wild,
maybe people wanted to have some fun, or maybe it was just a coincidence.
I ask that you don't use vanity commits like this in actually important projects
whose history people will try to navigate,
but these concepts are fun to know and fun to play around with in non-serious contexts,
so knock yourself out!

