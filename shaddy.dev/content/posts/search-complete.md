+++
title = "search completion explored"
date = 2025-03-01T19:25:49+01:00
description = "are tries truly the right tool for the job or will a kv store do?"
tags = [
"algos", "programming", "data structures"
]
+++

i recently learnt about how people implement auto completion in distributed systems.
basically, when i search "shaddy is", the system should suggest for example a result like
"shaddy is very very smart and clever and a great guy in general".
(that it doesn't is a clear sign of the ongoing downfall of society)
in practice, we probably want to give the user the top 5 or so results to pick from.

now, the obvious approach to such a problem is a prefix tree,
also called [trie](https://en.wikipedia.org/wiki/Trie).
it's tree data structure where each node represents a prefix and all its children
are the continuation matching a given letter.
for example, if you have the random string "trie", there will be a root node representing "t",
and it will have at least one child which represents "r", which has a child "i", which has "e".
simple enough, and sounds like it was made for cases like this, right?

but to actually allow quick lookups, we cannot traverse the entire tree.
when looking at the prefix "shaddy is", we must be able to get the top results pretty much
immediately, or the user is quicker to just type out the response in full.

the solution (or i suppose A solution) is to put into each node a link to the results already.
this is obviously very storage intensive, and it made me wonder:
is this approach actually better than a simple key value store that maps each prefix to the results?
sure, in the kv approach we have to duplicate all the prefixes, but in return we don't have pointers
to children or whatever, and those are expensive (usually 8 bytes per pointer nowadays)!

let's do some maths to see what it actually works out to!
if you don't care about how i arrived to the results, you can skip the next paragraph.
i'll also take some simplifying assumptions:
strings are lowerchase latin alphabet only, and our prefix tree is an actual tree structure in memory.

let's look at the case where our prefix is 2 letters long with the first one fixed, and we assume only lower case letters.
then our trie has 26 pointers.
the kv has 26 duplicated first chars.
let's say 2*26 is the actual storage used bc the chars are implicit in the trie data pointers already.
if we add one more character, then each trie leaf gets another 26 pointers, 26^2 pointers.
it is important to note that this is the ONLY added overhead.
our kv store also gets a new combination for each, so now 26^2 extra times 3

so i guess to generalise for a max query length of $n$:

trie: $$\sum_{i=1}^n 26^i\cdot\mathrm{ptr size}$$

kv: $$\sum_{i=1}^n 26^i\cdot i$$

at this point, it becomes obvious why the trie is a better choice at larger prefix lengths.
that is not even going into how in practice, in a trie you can collapse nodes with only a single child.
there are probably a myriad of other optimisations too i haven't considered: cache locality, compression schemes, etc.
the maths above are based on a toy model and only loosely reflective of the real world.

tries are also easier to update and probably deal better with a bunch of other cases where english and other languages
differ from fully random prefixes, but i wanted to focus on the memory aspect here since that's what i was curious about.
if you're actually making this choice or a similar one for a production system, your research should probably go deeper
than my theoretical spitball investigation

i guess there's a reason people use the right tool for the job, but this quick investigation still helped me
understand better WHY it is the right tool and what (some of) the tradeoffs involved are

