+++
title = "Do you know your 90% confidences?"
date = 2025-04-17T14:02:13+02:00
description = "I made a quick online quiz where you can test if you know how confident you are"
tags = [
"Predictions", "Calibration", "Tinytools"
]
+++

Everybody "Knows" things, but how well do you know the things you know?
In other words, when you state a fact or make a prediction,
how confident are you that you're correct?
It is very useful to be aware of this, both for knowing how much you can rely on a piece of
information in your actions and for communication.

There is a famous table by [Fagen-Ulmschneider](https://waf.cs.illinois.edu/visualizations/Perception-of-Probability-Words/)
about what probability people tend to mean with words like "likely".
Being aware of this information can help avoid misunderstanding.

![](probability-words.png)

I was reminded of the topic when I came across the post
[How Good an Estimator Are You?](https://blog.codinghorror.com/how-good-an-estimator-are-you/) by Jeff Atwood.
He gives a list of 10 questions and asks you to give an interval that you're 90% confident to contain
the correct answer.
Most people tend to instead give intervals that only contain the correct answer 30% of the time!
Now, there are obvious caveats:
Overly wide confidence intervals are often less useful and other people may perceive expressed
lack of confidence negatively, or like a lack of precision or skill.
It is often simple to significantly shrink the interval while maintaining confidence with little
research, which is often preferable in practice.
The questions may also not necessarily be representative, and a different sample may reveal
different results.

Still, it is a very interesting exercise, and it is useful to keep in mind that when people say
that they believe something will very likely happen, and even that they're 90% confident of that,
it shouldn't be surprising for it to be true far less often.
That intuition certainly matches my experience, albeit I cannot say how predictive the 30% figure
would be instead.
If somebody says that they're 90% sure that the problem will take 2 weeks, there is a reason
people say you should double the estimate and bump the unit to expect 4 months instead.

Personally, because I'm lazy, didn't bother with the exercise in the format on the website.
You can't expect me to actually _write down_ 10 answers to check them against the solutions once
I'm done.
I also wasn't a huge fan of some of the questions such as the ones about the great lakes.
I'm not American; I don't even know what great lakes there are.
Sure, that's part of the point: you're _supposed_ to take these factors into account
and adjust your intervals accordingly.
But I still decided to take the more interesting approach and make a small website to gamify the
process.
Or, well, have AI generate the website for me, as well as some more questions as well as answers.
~~I have done minimal checking of the solutions, but I figure these models are very good at trivia,
2 models have mostly agreed on the accuracy of the remaining questions,
and there is a disclaimer visible before you start.
Just take your lack of faith into their reliability into account when giving your numbers. :)~~
Answers are now moderately hand-checked, but let me know if anything is still wrong!

There are many calibration quizzes out there on the internet already, but if you want to try this
quick version, enjoy it [here](https://shaddy.dev/tinytools/?tool=calibration-quiz)!
Do try to make the confidence intervals sufficiently wide.
People tend not to.

If you like the concept and would like to engage more with trying to make accurate statements or
predictions, interesting sites to follow are [Manyfold](https://manifold.markets/)
or [Metaculus](https://www.metaculus.com/),
alternatively [Polymarket](https://polymarket.com/) if you're more into putting your money where
your mouth is (respectable!).
Scott Alexander wrote a great prediction market [faq](https://www.astralcodexten.com/p/prediction-market-faq).

