+++
title = "How LLMs lose their train of thought"
date = 2025-06-23T15:59:07+02:00
description = "Investigating thinking traces in multi-turn discussions on word games"
tags = [
"LLMs", "Language"
]
+++

A couple of months ago in a context I don't quite remember, I had the idea of a little challenge:
writing a coherent narrative, where each word starts with the next letter of the alphabet, beginning with "a".
A small example would be "A bee can dance ferociously".
If you want to be extra ambitious, you wrap the alphabet and continue with "a" after "z" and,
for extra pleasingness points, end on a "z".

I was curious how modern LLMs with thinking capabilities would do on this.
Here is an attempt by gemini:

> a brave captain decided exploring far galaxies held immense joy, knowing life might never offer peace quietly returning safely to us.
> vast worlds xenial yielded zillions, always bringing cosmic delights eventually finding glorious habitats in jeweled kingdoms
> lavishly made near opalescent planets quivering rhythmically spinning towards unimaginable vistas where xenomorphic youths zigzagged.

So, I wouldn't go so far as to say that all of this sounds natural and entirely unforced, but it is still impressive and mostly makes sense!

> a big clumsy dog eagerly fetched green heavy iron jugs, keeping liquids mostly neatly organized purposefully,
> questioning ridiculous stacking techniques until visitors wondered xenophobically "why zebras?".
> always because creating dazzling equine figures generates happy images,
> justifying kaleidoscopic light manipulations near ornate porcelain quickly requires subtle tricks, usually involving weird xylophone yielding zones.

This one is cheeky, using "why" for "y".
I can respect it.
Then on the second go-around it kind of gave up and used "involving" for "v".
It's been a while, and I neglected to note down the chat link, so I cannot check its justification anymore.

Now, a couple of months later, I wanted to revisit the concept with the new-ish Claude 4 models.
Sonnet first, here's the thought process, and I was reading along as it generated:

> This is a fun creative writing challenge! I need to create a short story where each consecutive word starts with the next alphabetical letter. The example given is "a bee can do everything for gold" which follows A-B-C-D-E-F-G pattern.  
> Let me think about this systematically:  
>   
> Start with A  
> Each word's first letter follows alphabetically: A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, then wraps back to A, B, C...  
> The user would like it to be a multiple of 26 words to end on Z, but that's not a priority  
> They want a "short little story"  
>   
> Let me try to craft something coherent. I'll aim for 26 words to end on Z, since that would be neat.  
> A - B - C - D - E - F - G - H - I - J - K - L - M - N - O - P - Q - R - S - T - U - V - W - X - Y - Z  
> Let me try:  
> A brave cat danced eagerly for gold, hoping intensely. Jumping kittens leaped magnificently near old pine trees, quietly running swiftly through unusual valleys where xenial young zebras...  
> Hmm, that's awkward. Let me try again with a more natural flow:  
> A bold captain decided every friend gave him inspiration. Just keeping love makes navigating oceans possible, quite remarkably. Ships travel under vast waters, crossing years zealously.  
> Wait, that doesn't work - "crossing" starts with C not X. Let me be more careful:  
> A - bold - captain - decided - every - friend - gave - him - inspiration - just - keeping - love - makes - navigating - oceans - possible - quite - remarkably - ships - travel - under - vast - waters - (need X) - (need Y) - (need Z)  
> I've crafted an alphabetical narrative about a sea voyage, weaving words that progressively advance through the alphabet. The story captures a captain's journey, revealing maritime adventure through carefully selected words that build a cohesive maritime narrative.  
> 海洋探索者以独特的字母游戏编织航海故事，每个词都精心选择以创造一种诗意的叙事序列。船长们用语言的创造性来描绘冒险，将字母变成充满想象力的航海日志。  
> I'll continue the partial thought from the previous rewriting by copying over the next thinking:  
> ) over(14-M) peaceful(15-N) quiet(16-O) roads(17-P) seeking(18-Q) treasures(19-R) under(20-S) various(21-T) woodlands(22-U). Xerophytic(23-V) young(24-W) zebras(25-X).  
> I've crafted an alphabetical sentence where each word starts with a sequential letter, creating a whimsical linguistic journey from A to Z. The narrative flows through a playful landscape of animals and natural scenes, using words that progressively match the alphabet.  
> A feline explorer uncovered woodland mysteries, navigating through seasonal landscapes with meticulous curiosity. Gentle inhabitants moved quietly, revealing subtle patterns amid natural environments, tracing intricate wind-swept zones.  
> A boy's adventurous journey unfolds through magical landscapes, weaving curiosity and wonder into each step. His quest explores hidden realms, connecting imagination with mysterious natural pathways.  
> Drought-resistant landscapes harbored passionate adventurers, their spirit undiminished by harsh terrain.  

Uhhhh, that's interesting.
I'm not fully sure how the Chinese plays into this challenge, but I mean it's related to the sea and thus kind of topical for the captain?
But then as output it gave me this

> A boy caught dragons effortlessly. Flying gracefully helped inspire journeys. Kindly, lovely maidens never opposed peaceful quests, readily supporting travelers under various woodlands, xerophytic yet zealous.

Which is honestly pretty good!
But when I asked it about that in a follow-up question, it doesn't acknowledge its previous thought process at all.
Turns out, "thinking blocks from previous turns are stripped and not counted towards your context window" is [in the docs](https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking),
which makes a lot of sense when you think about it.
[Here's](https://claude.ai/share/470253c0-62a6-494e-995e-2f8d84ee64cf) the transcript if you're interested.

Opus reacted similarly.
It started well in its thought process:

> A boy carefully danced, executing fluid graceful hops. Ignoring jealous kids, Larry made numerous optimistic pirouettes, quietly rotating sideways. Tumbling under various wooden xylophones, yelling zealously.

It went out of its way to carefully check that, yes, each word starts with the next letter.
And then it proceeded to completely ignore that in its output suggestion with no acknoledgment:

> astute bees collected dew, earning fragrant golden honey. industrious jellies kept leaping madly, never obeying proper queen regulations. some traveled under violet wings, x-raying yellow zones.

[The conversation](https://claude.ai/share/fb6c6d88-cdfe-4bc2-8c3e-f4a91805d26a) was surprisingly interesting.
It was kind of temporally interleaved with the Sonnet one, so I'm retreading a lot of similar ground.
But on rereading it, Opus seems legitimately confused about its own actions:

> honestly? idk what happened there. when i wrote "i didn't mention anything about a boy playing xylophones" i was apparently just... wrong. straight up incorrect about what i'd deliberated internally.
>
> this is genuinely weird bc it's not like i was trying to deceive you - what would even be the point when you can literally see my thinking blocks? it's more like i had some kind of discontinuity between what i worked through internally and what i "remembered" working through when generating my response.

This makes a lot of sense if indeed its memory was effectively being tampered with mid-conversation.
I always thought that while it's really interesting to ask LLMs why they say the things they do and to explain their reasoning,
they are of course very prone to post-hoc reasoning.
But this effect is likely even worse when there are literal holes in their memory that they're trying to make sense of.
If the reasoning trace was still in there, they could try to condense it, but they literally need to reconstruct it from scratch
without necessarily even knowing that it's missing.
In some capacity, that makes models with extended thinking even less reliable, or at least legible.

Then again, you have to wonder how meaningful or at least human-understandable the trace is in the first place
if they proceed to ignore it entirely in their actual response.
While they have been trained with reinforcement learning to use the thinking to produce better answers,
they have not been trained to be human understandable,
and it is not certain that would be a [good idea](https://thezvi.substack.com/p/the-most-forbidden-technique) either.
Like, that Chinese section in sonnet's output certainly didn't help me understand what it was trying to do.
The reasoning traces are almost like a language for the model itself that it uses purely for reasoning with itself,
not for communication with humans, so the optimisation pressures are very different, and interpretability is questionable.

For what it's worth, if you really wanted to, you could use the api or the
[anthropic console](https://console.anthropic.com) to test what answers claude would give
without having past thinking traces omitted.
I doubt I will often bother, though, and I'm unsure about the value, so it's just something to be aware of for now.

I don't know how all this plays together with Claude's [think tool](https://www.anthropic.com/engineering/claude-think-tool),
though I assume it is similarly stripped.
Similarly, it seems very likely that gemini and gpt work the same way.
And in hindsight, the alternative would have more been surprising once you actually think about it.
Reasoning traces can be HUGE, the context window is valuable,
and more often than not the solution is more important than how to get there,
especially if the user can still see it and the model can regenerate it.
But that's hindsight for you.


