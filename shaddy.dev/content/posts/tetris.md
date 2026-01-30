+++
title = "Tetris"
date = 2026-05-25T13:17:41+02:00
description = "A brief overview of the different flavours of Tetris you can play today"
tags = [
"games",
"tetris",
]
+++

Running a [Puyo Puyo Tetris](https://en.wikipedia.org/wiki/Puyo_Puyo_Tetris) tournament at work,
I learnt that for some reason not everybody knows all the intricacies of
the different versions of Tetris and how they differ.
Today, we will ensure that you don't embarrass yourself the next time your
in-laws grill you on your opener preferences.

## Classic Tetris

If you grew up playing Tetris on the NES or other platforms of that generation,
you likely played classic Tetris.
Classic Tetris is more punishing than more modern variants.
Pieces are almost fully random[^1], and you can only see one piece ahead, meaning you will have to make decisions on the spot.
This makes it significantly harder to stack cleanly, to keep your board structured and flexible,
and you can have a "drought" of pieces, where you are waiting for that one piece
you want for a long time with no guarantees for when you will see it next.

Especially if you're trying to optimise for a high score before running into
the infamous level 19+, you want to clear lines almost exclusively with tetrises,
clearing 4 lines at once with the I-piece.
Clearing multiple lines at once gives more score than clearing each line individually, but the level, the difficulty, is determined purely by the number of lines cleared.
So tetrises are simply the most efficient way to get that score before the game gets too fast to keep up.
But if no I-piece is forthcoming, you can find yourself in a pickle.
Your stack is going higher and higher, and you might have to clear lines in suboptimal ways to avoid topping out.

You might think that classic Tetris is an old game without an active userbase, but you would be wrong.
It is seeing a resurgence in recent years, and the top players are much younger than you would expect.
And they have gotten really good over the years and decades as new techniques and approaches were discovered.  
Tetris has a feature called DAS: Delayed Auto Shift.
If you tap the left or right button, your current piece will shift one column to the side.
If instead you hold down the button, the piece will immediately shift one column,
delay a moment, and then keep moving to the side over a couple of ticks until it hits a wall or the ground.
But at level 19, gravity gets too high and the pieces fall too fast to shift them
into the outermost columns, so you have to get a bit more creative.
Well, maybe not that creative -- people used to "hypertap," simply mashing the buttons very quickly, to place the pieces correctly.  

This worked, but it never worked that well or precisely.
So instead, people started [rolling](https://www.youtube.com/watch?v=n-BZ5-Q48lE):
instead of clicking the button really fast with your finger,
you hold a finger over the button and hit the controller
with the fingers of the other hand in rapid succession.
Instead of pressing your finger into the button, you press the entire controller into your finger.
This worked a lot better, and people do incredible things with it.
You might have heard about how a
[13-year-old beat the Tetris kill screen](https://arstechnica.com/gaming/2024/01/someone-has-finally-beaten-nes-tetris/).
If you can handle the fast gravity sufficiently long, it is eventually possible to
manipulate the game state to cause a crash, effectively reaching the "end" of the game.
It was just never designed to handle that level of skill.
Of course people have also long maxed out the score in the base game, so classic Tetris keeps evolving to stay fresh and offer new challenges and exciting competition.

Now with all this, you might think that classic Tetris is a single player game,
and most players experience it that way.
But that hasn't stopped people from playing it competitively against each other.
They have a whole yearly world championship and a host of other tournaments.
Maybe you have heard the iconic ["Boom, tetris for Jeff"](https://www.youtube.com/watch?v=QV_0CcF9-RM)
from the 2016 championship.

## Modern Tetris

Modern Tetris is a very different game.
It's a lot more fast-paced, and pro-level gameplay is impossible to follow
if you're not used to it.
Can you believe that people can clear 40 lines in [14 seconds](https://www.youtube.com/watch?v=DXSJ6wMrRQk)?
That's over 7 pieces a second.
How is this possible?

For one, modern Tetris has a feature called "hard drop," which allows you to place
your current piece in the current position right away without having to wait for
it to slowly drop all the way from the top of the screen to the bottom.
Many modern Tetris clients allow players to adjust speed settings like the
DAS delay -- how long you have to hold a direction until the piece keeps sliding to the side --
and ARR -- Auto Repeat Rate, the delay between each sliding tick.
With an ARR of 0, pieces essentially teleport to the side of the screen immediately.
With low DAS, teleporting pieces, and good knowledge of "finesse", knowing how to get each piece into each position with the minimal number of inputs, you can achieve incredible speed.

But how can human minds possibly keep up with that?
How can they process what piece comes up, think about where to put it in a potentially messy stack environment,
perform the inputs, and drop it -- and then do that 7 times per second?
This is where modern Tetris comes with some nice quality of life features.
The first one is the preview.
Where in classic Tetris you can see one piece ahead,
in modern Tetris you can often see the queue up to the next 5 spots.
Knowing the next pieces gives you time in advance to think about where to place each,
so once it comes up, no thinking is needed anymore and your body only needs to perform the inputs.
The process is effectively parallelised, or pipelined if you know how a CPU processes instructions.

The second change, and maybe the biggest difference to classic Tetris, is the different randomiser.
It is in fact surprisingly non-random.
Remember how there are 7 tetrominoes: I, J, L, S, Z, O, T.
Imagine taking one of each and putting them into a bag.
Shuffle the bag and take out the pieces in any order to give to the player.
This order is actually random, you don't know which piece you get first, just that you get one of each.
After the 7 pieces, the bag is empty, and we begin the process anew,
giving the player another set of 7 pieces.
This means that the player is always guaranteed to get each piece
equally often, and there can never be a gap longer than 12 pieces
before the same piece appears again.
It is called the 7-bag randomiser, and it is the default in most Tetris games today.

So in modern Tetris, you know that you can always expect a certain piece soon,
and by seeing the next 5 pieces, you have a lot of flexibility in using strategies
that would not work in classic Tetris.
You can create dependencies -- patterns that need a specific piece to resolve -- and it's fine.
You can create repeating structures.
You can even memorise certain sequences of pieces to place at the start of the game
that you'll be reliably able to recreate.
These are commonly called openers.

There are more openers and variations than you can count (unless you're very good at counting).
There are [openers](https://www.youtube.com/shorts/5Mp3Xnh_qLI)
that give you [over 60% probability](https://harddrop.com/wiki/Perfect_Clear_Opener)
of getting a PC, a perfect clear resulting in an empty board, after the first 10 pieces.
If you know multiple such openers and backup strategies, you can have a significantly higher confidence in getting a PC.
And if you're good, you can repeat them.
There is a popular challenge about achieving 10 PCs in a row.
Have you heard about how modern Tetris is all about T-spins?
Well, there are openers for that.
A classic one is the DT-cannon, or [double-triple cannon](https://www.youtube.com/watch?v=i-gND4ni-sw),
named because it allows for a quick T-spin double, clearing two lines,
followed by a T-spin triple, clearing 3 lines.
I hear that it's gone out of fashion, though, and people use ms2 instead
-- [mountainous climbing 2](https://www.youtube.com/watch?v=zbe-lCoBbhk)
-- or [stickspin](https://www.youtube.com/watch?v=AFcnyVF--S4) if you're feeling funny and want to do all the T-spins.
Or maybe use something simple and versatile like
[TKI](https://www.youtube.com/watch?v=6ergMaFyskY), named after the player who invented it.
TKI is a good choice if the in-laws ask, btw.
It shows sensible decision-making without trying to be too flashy but with ample opportunity to build something great in the future.

But why do we even care about all of these T-spins?
What are they?
What's the point?

Some parts of the modern Tetris scoring system are similar to classic.
Clearing two lines at once is better than clearing a single line two times.
Clearing a triple is even better, and a tetris is even better.
But that's not where it stops.
The scoring differs between different games, but you are commonly rewarded for things like combo, how many consecutive pieces have cleared at least one line, or spins, where you clear at least one line by placing a piece in a niche covered from above.
Instead, the piece must be rotated into its final position on the last tick before locking in.
You most commonly see it with the T piece, hence T-spin, but spins are possible with all the pieces, even the [I and O](https://www.youtube.com/watch?v=Us8O58Pg1hw).

Spins also matter for the back-to-back bonus, or B2B, where you are rewarded for tetrises and spin-clears as long as your previous clear(s) are also tetrises or spins.
And lastly, perfect clears, clearing the entire board, also give extra points.

But unlike classic Tetris, we often don't just play for points.
We are looking to eliminate the other players in VS modes.
If you take actions like clearing lines or doing combos, you're simultaneously spawning garbage at the bottom of the other player's board, putting them closer to topping out.
Garbage lines are grey lines at the bottom of your stack with a single hole, that can generally be cleared by a single piece.
The problem is that they are below all your other lines, and if more comes, it may just kill you.

Actions that would score higher generally also send more attack, so you want to optimise your play to make each line you build count.
Single line clears often don't send any garbage at all if not combined with a combo.
Tetrises are great and send a lot of garbage, but you need to be able to clear 4 lines, which means you have to _build_ 4 lines first.
A T-spin double sends as much garbage as a tetris and naturally only needs 2 lines to be built.
We can only play so fast, so we also want to be _efficient_ in how we clear and attack.
On the other hand, a tetris sends two times as many garbage lines as a normal triple clear, so it is often worthwhile to build up just one more row to get a tetris instead and also enable B2B.
And you know all of that garbage your opponent is sending?
It's often free ~~real estate~~ lines to attack with if cleared via tetrises or combo.
Assuming you don't die first.
At a high level, modern Tetris is a constant game of looking at your own board, evaluating and planning how you can upstack to build opportunities to attack, downstacking to attack and survive, and having an eye on your opponent's board state to see if you need to defend or if now is a good opportunity to attack and disrupt their strategy.
And all of this is happening at a blistering pace.

Watching somebody who is good at stacking is a mesmerising experience.
They're faster than you can think and somehow everything comes together to form beautiful patterns.
Decisions that seemingly made no sense suddenly pay off.
You, too, could become such a player.
I believe the main competitive community nowadays can be found on [TETR.IO](https://tetr.io), at least on PC.
It is a great and customisable client, even beyond the ranked matchmaking mode it supports and the quirky April fool quick play features.
A more relaxing and zen modern Tetris experience can be found in [Tetris Effect](https://en.wikipedia.org/wiki/Tetris_effect)[^2].
Or maybe you're looking for something else entirely?

## A parallel universe -- TGM

Modern Tetris usually implements Guideline Tetris, a set of rules for how an official Tetris game should work, e.g. what spins are possible.
But Tetris doesn't have to work that way.
There is another world, a series of games that work by different rules.
It is called [Tetris: The Grand Master](https://en.wikipedia.org/wiki/Tetris:_The_Grand_Master), or just TGM.
Instead of being primarily about scores or against other players, there is a dan system: you can achieve different ranks after passing different challenges, with the highest rank being the coveted Grand Master title.
The series is known for its high difficulty and high speed, and high ranks require such challenges as memorising an invisible board.
And when I say high speed, I mean that the games are commonly much, much, *much* faster than "normal" Tetris games.
There is a clear progression in speed from classic Tetris, to modern Tetris, and then to TGM.
I don't know TGM enough (yet) to do it justice here, but I recommend [this video](https://youtu.be/vrBQksCCgvg) that goes over its history and the challenges it offers.
While the TGM is classically a series of arcade games, TGM 4 has recently released on [Steam](https://store.steampowered.com/app/3328480/TETRIS_THE_GRAND_MASTER_4_ABSOLUTE_EY).


[^1]: There was a simple check like rerolling a piece once if it's the same as the previous piece. There are older games with full randomness like the original 1985 Tetris.

[^2]: Not to be mistaken for the [tetris effect](https://en.wikipedia.org/wiki/Tetris_effect), where after playing too much Tetris you start to see block patterns all over the world and when you close your eyes.



