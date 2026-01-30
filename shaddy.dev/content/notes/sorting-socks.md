+++
title = "Sorting Socks"
date = 2026-02-02T21:35:49+01:00
description = "How to spend less time doing laundry sorting"
math = true
tags = [
"lifestyle",
"socks",
"optimisation",
]
+++

Doing laundry is an annoying chore, but needs must, and so we do it.
An annoying part of the chore is matching the pairs of socks back together after the drying.
There are at least three very different ways of dealing with it.

It should be noted that this advice is harder to apply in a single household than when you're
sorting socks for 10 people.
Or maybe not -- some of this would make your life much easier if you can get everybody to agree
on what socks to wear.

## Have all socks be exactly the same

If all socks are a match, matching is trivial.
Just always take two socks and treat them as a pair.
It's not a problem if a single sock goes missing or gets a hole --
you simply just match that sock with another one or leave the
single sock for the next wash.
Clothing choices are simple, and you always know what socks to buy.
You just have to hope they better not discontinue the design or sneakily change the production
methods on you so that they no longer match the originals, or even just fresh socks don't look like used ones.
And you better also not want to pick socks to match the rest of your outfit,
unless the rest of your outfit always matches the same colour of socks.

This doesn't work well if you have asymmetrical socks like [toe socks](https://en.wikipedia.org/wiki/Toe_socks),
but you can still simply sort them into stacks of left and right and then take one sock from each to make a pair.
Still $O(n)$.
This sock sorting approach scales among the best.

## Very different socks

You can also do the opposite.
Sorting socks is mainly annoying when it is not clear at a glance which socks make a pair.
When you have to expend effort to compare colours and shapes and maybe even accidentally create
wrong pairs that leave you with a mismatch to clean up in the end.
This is not a problem if your socks are different enough that it is trivially easy to pick out the
partner of any sock you're looking for.
You pick one from the pile, and you find the partner right away or keep a very manageable stack of
started pairs where you haven't gotten to the other yet but can spot at a glance that the current
sock is not a match for.

Each pair of socks can have a lot more personality, and you can pick favourites.
This allows more creativity in sock and outfit choices, and it can accommodate asymmetrical
socks more easily without special casing, but it ultimately scales worse[^1], either because
picking through the pile of unmatched socks or managing opened pairs takes some time.
It also becomes more annoying for every lost or failing sock.

[^1]: It might be $O(n^2)$ or so because you still have to scan through the remaining pile, maybe just $O(n\ \mathrm{log}\ n)$,
    but importantly it's $O(n^2+A)$ where $A$ is my annoyance over having to keep track of things.

## Multiple classes of identical socks

You can try to combine the above approaches.
Have a set of different kinds of socks, say only blacks, whites, and grey no-shows; and then
have a bunch of identical ones of each.
This gives you the flexibility of having multiple socks without being too arduous in sorting.
Missing or holey socks are annoying but not a huge deal.
It can scale better or worse depending on how many classes you have.
You can pick whatever combination works best for you.

## Don't care about the matching

Speaking of picking whatever combination works best for you -- if you're open to experimenting,
to wearing all the combinations, then you don't have this problem at all.
Hell, just don't even bother matching up your socks.
Put the pile of unsorted socks in your drawer and then pick two that appeal to you each morning[^2],
lime on the left and ruby on the right.
This scales fantastically, just as well as having all socks the same.

[^2]: This strategy actually also works for all other approaches. Move the matching problem to be Just-In-Time.
    Reduces laundry day toil in return for potentially not finding the right sock for your work day.
    Also doesn't work if you have to sort the socks apart for different people.

I want to stress that this approach is not what this post has been working towards, and I do not
endorse this method.
Different socks feel different enough that my feet would feel weird all day.
However, there is a certain appeal and liberty to it.
You have to respect the gumption it requires to be so free in spirit and not care about appearances.
Or maybe care about appearances a lot -- it does present a certain image.
Or maybe you just wear shoes where nobody can see your socks.

I suppose if you just have a bunch of socks that are somewhat similar and not quite,
you could have people staring at your feet in confusion a lot,
which may or may not be in your interest.

## Conclusion

My own approach falls somewhere in the _multiple classes of identical socks_
approach mixed with _have some very distinct single socks_
and a dash of _why do these different socks look so similar_.
That is to say, this is not sartorial advice,
and you should consult a professional before making important life decisions.
That being said, maybe I will be more conscientious the next time I buy socks.
Or maybe I'll see those cool dinosaur socks and be unable to resist.
Well, maybe you feel smarter and more informed now.

