---
date: 2023-07-04
description: You know if a number divides by 2, 3, 5, or 10. But don't you wonder about 7? And don't you know about why? They didn't teach me that in school, but it displays some interesting and approachable maths.
math: true
tag: Mathematics, Numbers
title: Divisibility Rules
---

In my post on [The Divisible Numbers Challenge]({{< ref "divisible-numbers-challenge" >}}), I mentioned a trick for determining in your head whether a number is divisible by 4.
A friend told me that that note was silly because everybody learns that stuff in primary school, which surprised me.
While I did learn about it in primary school, for some reason, I never realised that it's probably common knowledge.
Of course, I was aware that some things are taught pretty much universally.
For example, I assume almost everybody knows about long division, even if most people probably have it grow rusty from disuse.
I guess I just always assumed that divisibility rules are kind of a niche topic that never comes up.
It seemed like one of those factoids [^1] that you can bring up to surprise people.
But even still, maybe it is as uncommon as I believed, or maybe a reader finds themselves among the [lucky 10,000](https://xkcd.com/1053/) because their school didn't cover it, they missed it, or for some other reason I could never even guess at..

But there's a reason most people's long division is rusty.
Am I going to say something along the lines of *you won't always have a calculator in your pocket*??
People have smartphones nowadays and can do actual precise division as fast as they can type.
And hasn't everything that can be said about this topic already been said by so many people?
What's the point of learning divisibility rules?  
I'm actually not sure if I've got a good answer for most people.
If you're maths-curious, I think this blog post is for you.
It's a great introduction to some algebra topics that you don't usually come across in high school.
If you're considering studying maths or even something just tangentially related to maths, maybe this can help nudge you in the right direction, whether you actually like it or not.
Moreover, you can always apply these rules whenever you see a number.
Does it really need to be extremely useful?
Or maybe you're looking to join some tool-less maths competition.
In that case, Godspeed.

To set some ground rules, we're only looking at integers, more specifically the natural numbers (positive numbers), although it's fairly simple to extend to the whole integer set.
We say a number divides another when the division results in no remainder.
My maths is rusty, so I will focus on intuition over rigorous formalism.
Luckily, I believe most of it should be understandable with a high-school level of maths.
Also note, we're staying in base 10 because that's what I usually use, even if a base 12 system has its clear advantages.
I will assume that most readers will be used to working in base 10 as well.

I'll tackle the numbers to divide by in roughly increasing order of complexity.

### Divisibility by 1

Okay, maybe I wasn't quite clear about my ground rules.
I thought it's clear that you can divide any integer number by $1$ without a remainder.
If the number exists, it is divisible by $1$.

### Divisibility by 10

Uhm, well, you know, if a number ends in $0$, it's divisible by $10$.
Just look at its last digit.
When are we getting to anything actually interesting?

### Divisibility by 5

A number is divisible by $5$ if its last digit is either $5$ or $0$.
Any higher digits are a multiple of $10$ and thus divisible by $5$.
But seriously, is this entire post like this?

### Divisibility by 2

We're still in easy territory here.
A number is divisible by $2$ if its last digit is divisible by $2$.
That is, $54$ is divisible by $2$ while $45$ is not.

### Divisibility by 4

A number is divisible by $4$ if its last 2 digits are divisible by $4$.
Any higher digits are necessarily a multiple of $100$, and we know that $100$ divides by $4$.
You're still going to have to figure out yourself if $94$ divides by $4$.
It might help to just divide by $2$ twice.
Maybe it's easier to tell whether $94/2=47$ divides by $2$ if a decomposition into $94=80+14$ isn't natural to you.

### Divisibility by 8

A number is divisible by 8 if its last 3 digits are divisible by $8$.
But wait, there's a pattern!
I picked up on this when I first heard about it, but today I actually want to know more.
Does this pattern hold?
Sure enough, a number is divisible by $16$ if its last 4 digits are divisible by $16$, although maybe that's not as useful of a rule of thumb to compute in your head any more.
Does this generalise?

Yes! In fact, the proof is fairly simple.
We can prove for any $n$, that $2^n$ divides $10^n$.
Maybe it already becomes clearer when put like this.
Specifically, it is $2^n\cdot 5^n=(2\cdot 5)^n=10^n$.
This also allows us to see that $125=5^3$ divides $1000$, but I'll leave mental application as an exercise to the reader.

Now we know that powers of $2$ always divide powers of $10$, but dividing a 3-digit number in your head by $8$ is still hard.
Again, maybe you can just divide by $2$ thrice.
Or maybe, you still need to pull out your calculator after all.
On the other hand, I can't remember a time in my life where I needed to check if a number divides by 8 in my head.
Then again, I also have a very bad memory for stuff like this, so for all I know, I might be doing it daily.

### Divisibility by 3 and 9

To check if a number is divisible by $3$, it is useful to check if its *digit sum* is divisible by $3$.
To compute the digit sum, we just look at each digit and add its value to the others.
So for $45$, the sum is $4+5=9$.
Because $9$ is divisible by $3$, we can conclude that $45$ is divisible by $3$.
That may not be that useful in this example, but say instead you're looking at $1234567890$, a common number we may see in the wild.
Let's say somebody has a gun to your head and asks you whether it divides by $3$.
Well, lucky you, instead of pulling out pen and paper to do a long division and check the remainder, you can see that the [sum of the numbers from $1$ to $9$](https://en.wikipedia.org/wiki/1_%2B_2_%2B_3_%2B_4_%2B_%E2%8B%AF)is $\frac {9\cdot 10}{2}=45$ and is thus divisible by $3$.
Reading this blog may have just saved your life!

But why does this work?
Feel free to take a moment to think about it yourself.
It's surprisingly simple once you've hit on the right way to think about the problem, but don't worry if you don't get it this time.
There will be more opportunities.

...

Let's say we've got the number $abc$, where each letter represents a digit.
For example, for the number $123$ we'd have $a=1$, $b=2$, and $c=3$.
In other words, we have $100a+10b+c$.
We can pull out some numbers that we know divide by $9$ (and by extension $3$).
{{< mathjax >}}
$$
100a+10b+c=99a+9b+a+b+c
$$
{{</mathjax >}}
$99a$ will always divide by $9$, so if we subtract it, the remainder will divide by $9$ exactly if the whole sum divides by $9$.
This is similar to how long division works if you think about it: subtracting increasingly small multiples of the divisor.
In other words, the $100a+10b+c=$ will divide by $3$ or $9$ exactly if $a+b+c$ does.
And with that, we've basically arrived at the digit sum.
We can of course extend this pattern: the next digit would be $(1+999)d$, and so forth.
The principle applies to any number of digits.

### Divisibility by 6

Number $6$ is on the one hand boring because it doesn't introduce any crazy new rules and on the other hand interesting because it shows us a pattern of relationships between different rules.
Such is the case for any number that [factorises](https://en.wikipedia.org/wiki/Integer_factorization) into a set of unique prime numbers.
To check if a number divides by $6$, check if it divides both by $2$ and $3$.
It will necessarily divide by $6$ only if it divides by both.

### Divisibility by 7

This is the part we've all been waiting for.
(We have, right? Well, *I* was waiting for it at least.)
This is also the first time I learnt these rules at all, because apparently "the rules for 7 are too complicated", according to my primary school teacher.
Well, Mrs. Doe (not the actual name), I'll show you, only almost 2 decades later!

We'll go over two different rules and the reasoning behind them.
The first is a general solution strategy, but it becomes cumbersome for large values.
The second one can easily reduce an arbitrarily large number to a 3-digit equivalent, but it's still hard to divide 3-digit numbers by 7 in your head.

#### General strategy

Let's get started with the general strategy.
The idea is to add the last digit to the rest 5 times.
That is, for a number with digits $ab$, instead check if $a+5b$ is divisible by $7$.
Note that $a$ may have multiple digits. (fancypants mathematicians might instead write $\gamma b$ or something, but I don't want to confuse. I admit this is differently confusing.)

Let's look at an example.
Consider the number $1449$.
We add the $9$ to the rest 5 times: $144+45=189$.
Repeat: $18+45=63$.
We're lazy, repeat: $6+15=21$.
REPEAT: $2+5=7$.
OK, I'm satisfied with that.
It seems to be working, but why?
Again, feel free to see if you can find the reason yourself.
It's a bit more complicated than what we looked at for $9$, but we apply some very similar ideas.

Consider again how we wrote the digits above as $ab$.
We can again write the number as $10a+b$ like we did for division by $9$.
Similarly, we can subtract $7$ from the left: $3a+b$.
We say that this is divisible by $7$ exactly if $a+5b$ is.
In fact, I'm going to make an even stronger claim and say that the remainder of both divided by $7$ is the same.
We write this as $3a+b\equiv\_7 a+5b$, which means they share an "equivalence class", or we just say they are equivalent modulo $7$.
Basically, we're in a weird place where only the remainder of division by $7$ matters.
It is $8\equiv\_7 1\equiv\_7 -6$, and the world is strange.
Maybe you've [heard](https://www.youtube.com/watch?v=tRaq4aYPzCc) of [$p$-adic numbers](https://en.wikipedia.org/wiki/P-adic_number#p-adic_integers) or a [quotient ring](https://en.wikipedia.org/wiki/Quotient_ring) before.
If I remember my first year of uni correctly, that's the construct we're talking about here.
Don't be worried if those terms make no sense to you, we will cover what we need.

Let's go back to our numbers.
We want to check if the remainder is $0$, or in other words, if $3a+b$ is in the same class as $0$:
{{< mathjax >}}
$$
3a+b\equiv_7 0.
$$
{{</mathjax >}}
We can do some transformations we're used to from normal equations:
{{< mathjax >}}
$$
3a\equiv_7 -b
$$
{{</mathjax >}}
Now we want to divide both sides by 3.
But how do we do that when we're working on integers?
What if $b$ is like $2$ and doesn't cleanly divide by $3$?
We're going to have to familiarise ourselves with a new concept in quotient ring:
division works differently here.
Instead of dividing by a number, we have to find the element to multiply with to get $1$.
Or in other words, given a number $x$, we want to find a number $y$ with $x\cdot y\equiv\_7 1$.
We also say that $y=x^{-1}$.
But isn't this just division with extra steps?
How can we find an element to multiply with to get $1$ without having the element be like $1/x$?
Aren't we only working on integers?
Remember that we're in a quotient ring.
In the case of $3$, let's just look at all the options.

| Counter-piece | Product | $\equiv\_7$ |
|---------------|---------|-------------|
| $3\cdot 1$    | $3$     | $3$         |
| $3\cdot 2$    | $6$     | $6$         |
| $3\cdot 3$    | $9$     | $2$         |
| $3\cdot 4$    | $12$    | $5$         |
| $3\cdot 5$    | $15$    | $1$         |
| $3\cdot 6$    | $18$    | $4$         |
| $3\cdot 7$    | $21$    | $0$         |

We can see that $5$ is the only element that results in $1$.
In fact, it is a property of quotient rings that are based on prime numbers that such an element must always exist, and this fact is often used in Cryptography like [RSA](https://en.wikipedia.org/wiki/RSA_(cryptosystem)) and others.
And if we look at some examples: $5\cdot 6 = 30$ and $30\equiv\_7 2$ .
This seems to be working.
Feel free to look at some other examples, but you can think of it like the factor $3$ in whatever number we're dividing being instead set to a multiple of $7$, which is equivalent to a factor of $1$.

But okay, so we know that
{{< mathjax >}}
$$
a\equiv_7 -5b.
$$
{{</mathjax >}}

Or in other words, $10a+b$ is divisible by $7$ if and only if $a+5b$ is.
At this point, can you tell why $a-2b$ might do the same trick?

#### Fast reduce

The strategy above is nice and simple, but if you've got 10 digits, you're going to be at it for a while.
We want something faster.
Well, I've got something faster.
Group the number into groups of 3 digits starting from the right.
Then form an alternating sum.

Doesn't make sense? Let's look at an example.
Consider the number $12,345,678$.
Then just do an alternating sum on groups of 3 like this: $678-345+012=345$.
Just wrap up with the strategy from above: $34+25=59$ -- not divisible.

Maybe you're already getting an idea of how this works.
Feel free to take a shot yourself.

...

...

Okay, we start by putting it into a general form again.
Let $cba$ be the number with each letter representing a group of 3 digits.
Then we can also write the number as $a+1,000b+1,000,000c$, or $10^0a+10^3b+10^6c$.
Like before, we subtract $7^n$ from each expression: $3^0a+3^3b+3^6c$.
If we now look at $3^3$ inside our quotient ring, we have
{{< mathjax >}}
$$
3^3\equiv_7 27\equiv_7 28-1\equiv_7 -1.
$$
{{</mathjax >}}
So multiplying with $3^3$ is equivalent to multiplying with $-1$!
Naturally, multiplying with $3^6$ is equivalent to multiplying with $(-1)^2=1$.
This means that $10^0a+10^3b+10^6c$ is divisible by $7$ if and only if $1a-1b+1c$ is divisible by $7$.
Of course, we can extend this pattern to an arbitrary number of digits as well.

With that, we understand this strategy satisfactorily.
Unfortunately, you're usually left with a 3-digit number, but together with the other strategy, you're still in a good spot.

## Closing Thoughts

As you can see, most of these rules aren't actually very complicated once you understand the trick.
I guess in hindsight that makes sense.
You wouldn't teach something monstrously complicated in primary school, even if we kept to a simple level.

We've only looked at strategies to check division with numbers up to 10, but we can take this up to any number we want.
Wikipedia lists rules for numbers [up to 30](https://en.wikipedia.org/wiki/Divisibility_rule).
While writing this post, I only saw the large table there.
Turns out, I now see they have an extensive section describing different more efficient algorithms for divisibility by $7$ than described here, although they seem harder to remember.
If you ever intend to take part in a mathematics competition without a calculator, or if you just want to explore these concepts more, I recommend you check it out.
This post should give you a good foundation to understand the concepts described.

Of course, you can also just see for yourself if you can find similar rules for larger numbers.
Some numbers like $12$ or $15$ will be simple (remember $6$).
Other numbers, such as prime numbers like 13, will be harder.
Either way, you now have the tools needed to find them yourselves.
Or maybe you want to see if you can find a better algorithm for dividing by $7$?
Know yourself out!
On the other hand, given how often you check if a number is divisible by $8$, how much use are you going to get from being able to tell if a number divides by $17$?
Not that that should stop you if you purely enjoy the maths of it.
Ever thought about getting a degree in the field?
For similar or maths related topics, you may enjoy the YouTube channels [Numberphile](https://www.youtube.com/@numberphile/videos), [Stand-up Maths](https://www.youtube.com/@standupmaths), [3Blue1Brown](https://www.youtube.com/channel/UCYO_jab_esuFRV4b17AJtAw), and many more.
I'm sorry that I don't have any text-based further readings, but I only follow maths very casually on the side.
Either way, numbers can be fun, and I hope you can appreciate them like I do, or maybe even more.

[^1]: "Factoid" in the "little known fact" sense, not as in "sounds like a fact but actually untrue"
