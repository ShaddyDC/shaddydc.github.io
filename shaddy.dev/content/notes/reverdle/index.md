+++
title = "Reverdle"
date = 2025-07-31T11:55:05+02:00
description = "Wordle but trying to guess the word as slowly as possible"
tags = [
"games", "tinytools"
]
+++

The usual goal in Wordle is to guess the target word in as few attempts as possible.
You don't have to use all the information you have in every guess --
even if you know the first letter is an A, you can try a word that starts with B if it gives you more information.

Obviously the very first question for anybody who comes into contact with the game is:
what if you turn the concept around?
What is the strategy to take as many turns as possible until you hit the game
if at every attempt you HAVE to use all available information into account?
Instead of a game of reducing the options space as much as possible with every guess,
it becomes a game of shaving away as few options as possible while retaining optionality.

Introducing, [Reverdle](https://shaddy.dev/tinytools/?tool=reverdle)[^1].
At a high level, there are a couple of rules:

[^1]: As an aside, I noticed that there exists a similar variation of Wordle with the [same name](https://reverdle.com/).
Fortunately, its different enough that I can still call myself Very Creative and Incredibly Innovative.

- Green (correct): The letter is in this exact spot, and all future guesses must use it here.
- Yellow (present): The letter is in the word, but not here. You must use it in future guesses, but not in any position you've already tried for it.
- Gray (absent): This is the fun one. If you guess a letter and it comes up gray, you have just learned the exact number of times that letter appears in the target word.
    For instance, if you guess SASSY and one S is yellow while the other two are gray, you now know the target word contains exactly one S.
    From now on, every guess you make can only contain one S. If a letter is all gray, its count is zero.

A game may then look like this

![example](example.png)

As somebody who never played the original Wordle much, I find this variation surprisingly difficult in ways that I didn't expect.
You'd think that the hard part is not taking away too many options to get a high score,
but I struggled more with even finding valid words that I was able to enter given the current constraints,
though maybe that's just a skill issue, and it certainly wasn't helped by the fact that the original solution dictionary
contained some rather abstruse words (really? "DUBBO"?).
The app now uses the same word list as Wordle used to use.
Still, a hint feature and a give-up button made the experience significantly less frustrating,
and there exists an alternative known-word mode that makes the whole experience deterministic and a perfect-information game.
How well can you plan ahead if you know the destination and want to take the longest route possible?

Counterintuitively, or maybe intuitively, the strategy for optimising the score in this game is pretty much the reverse
of the original Wordle, both in known and unknown word mode.
Of course you still want to learn the word, but only so you can avoid it for as long as possible,
and you want to take your time.
Instead of starting with common words that cover as many letters as possible,
you want to start with rather exotic words that lose you as few letters as possible.
You can only use a letter that is not in the solution once.
So for example, "SASSY" is surprisingly good "costing" only three letters, besides the fact that S is a rather common letter,
or even "COCCO", "MAMMA", or "AYAYA".

Though once you've hit on characters that are in the word, your option space rapidly dwindles.
Or maybe it is good to quickly find a couple of correct characters that you can infinitely reuse,
leaving only 2–3 characters to vary.
While maybe there aren't as many total options anymore at that point,
you only use up fewer characters per attempt, so maybe it's easier to reach a higher total?
I don't know, so let me know if you find out!


