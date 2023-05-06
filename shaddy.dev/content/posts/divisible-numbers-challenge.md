---
date: 2023-05-01
description: Analysing a specific algorithmic problem with C++ and looking at some obvious and non-obvious problems and algorithmic performance improvements.
draft: true
tags:
  - Programming
  - Algorithms
  - C++
title: The Divisible Numbers Challenge
---

After recently having handed in my Master's Thesis for my Computer Science Degree, I have found myself looking for a job.
In IT, it is not uncommon to have a technical interview about solving some algorithmic problem while talking the interviewer through your thought process.
There's a huge industry around sites like [LeetCode](https://leetcode.com/) just to prepare for this prospect.

One company I interviewed with was [RIIICO](https://riiico.com/).
They're a start-up that seeks to improve factory planning through interactive 3D scans.
The interview process was nice, and I feel like I got along well with the team.
They provided me with an interview challenge that stuck with me.
Maybe it's because it was the only actual LeetCode-style interview I had, but there are some really interesting aspects to the problem.

This post will first introduce a problem to be solved before giving a naive solution.
We will then go over some correctness problems and analyse some things to watch out for when dealing with C++.
In the second half, we will go over some ways to make the algorithm more efficient.
This article is intended not to require much prerequisite knowledge, and relevant concepts are introduced.
I am open to feedback.

All code here will be in C++ because that's what the interview was about and because it can demonstrate some of my mistakes.
Most of the ideas apply to any language.
See if you can spot the issues before I explain them, or maybe you see something I missed!

## The Problem Statement

I didn't write this down until afterwards, but this is the gist of what I remember:

> Given two arrays of integers `a` and `b`, return an integer number that cleanly divides all items in `a` and none of the items in `b`.
> If no such number exists, throw an exception instead.

First, what does it mean if a number $x$ cleanly divides another number `y`?
We say $x$ cleanly divides $y$ if $y$ is a multiple of $x$.
For example, $4$ cleanly divides $8$, $64$ or even $12938724$.
$4$ does not, however, cleanly divide $2$, $3$, $7$, or $12938725$.

{{< callout title="TIP" >}}
If you didn't know, you can tell if a number cleanly divides by $4$ if its last 2 digits divide by $4$. Therefore, because $24$ divides by $4$, you can tell that $12938724$ divides by $4$.
You can find some background and similar rules for other numbers on [Wikipedia](https://en.wikipedia.org/wiki/Divisibility_rule).
{{< /callout >}}

Let's look at an example:

```cpp
std::vector<int> a = {21, 6, 6, 15};
std::vector<int> b = {2, 7, 22, 8};
```

Here, a correct answer is $3$.
All of $21, 6, 15$ are multiples of $3$, yet none of $2, 7, 8$ or $22$ are.

Note that there can be multiple correct answers.
It may not be immediately obvious from the problem statement, but negative integer numbers are perfectly valid, so $-3$ is also a valid solution!
But even beyond that, if we doubled all numbers in `a`, i.e., `{42, 12, 12, 30}`, $6$ would be another valid solution.
This makes it non-trivial to write robust tests that check for correctness.
Checking for a specific, known valid solution may often be sufficient, but it can't deal as flexibly with a changing implementation.
I will blissfully ignore that problem here and focus on the challenge.

Programmatically, we can check if $x$ divides $y$ cleanly by looking at the remainder of a division using the modulo operator.
An integer value can only represent whole numbers.
Dividing an integer by another, we will always get an integer result, discarding the remainder, e.g., `11/4 = 2` instead of `2.75`.
Using the modulo operator, we can get the remainder of that division: `11 % 4 == 3`.
Together, they add up to the whole: $11=2\cdot 4+3$.
If the remainder is $0$, we have a clean division, i.e., if `x % y == 0`.
For example, consider `8 % 4 == 0`.

## My Naive Solution

Before you read on, feel free to see how you'd implement it yourself.
While there are some parts that can trip you up, the naive solution is relatively straightforward.

My first thought was, "hey, for a naive solution, we can just check all the positive numbers up to the maximum absolute value in `a` against all values in `a` and `b`."
The absolute value of a number is just the number without its sign.
Mathematicians write $|3|=|-3|=3$, or in programming terms `std::abs(-3)==3`.
This works, but it has its problems. We will get there.
My interviewer prompted me to show how I'd implement it first, and we'd see about improvements later.

The whole algorithm as I wrote it looks something like this:

```cpp
int find_divisor(const std::vector<int>& a, const std::vector<int>& b){
    if(a.empty() && b.empty()) return 0;
    if(a.empty()) return max_abs(b) + 1;

    for(auto i = 1; i <= max_abs(a); ++i){
        if(all_divide(a, i) && none_divide(b, i)){
            return i;
        }
    }

    throw "No solution found";
}
```

Before we explore this in more detail, the helper functions are what you'd expect:

```cpp
int max_abs(const std::vector<int>& v){
    int m = 0;
    for(const auto val : v){
        if(std::abs(val) > m){
            m = std::abs(val);
        }
    }
    return m;
}

bool all_divide(const std::vector<int>& v, int div){
    for(const auto val : v){
        if(val % div != 0){
            return false;
        }
    }
    return true;
}

bool none_divide(const std::vector<int>& v, int div){
    for(const auto val : v){
        if(val % div == 0){
            return false;
        }
    }
    return true;
}
```

The difference between `all_divide` and `none_divide` seems obvious in hindsight, but I did get confused at least twice while under pressure in the interview situation.

This solution is not idiomatic C++.
C++20 has introduced the concepts of [ranges](https://en.cppreference.com/w/cpp/ranges) which make it much easier to express the operations on elements in a vector cleanly.
For the sake of simplicity, and not because I've been using too much Rust to remember the syntax from the top of my head during the interview, I will stick to the classical loop-based implementations.
If this were a proper program, instead of throwing a raw string, we'd use a proper exception type.
We might also consider making this a template over the [`std::integral` concept](https://en.cppreference.com/w/cpp/concepts/integral) or use a [`std::span`](https://en.cppreference.com/w/cpp/container/span) instead of a `std::vector` for more flexibility.
But again, I will stick with this so that it is easier to understand for people not familiar with the language.

Before we get into the problems this has, we'll try to understand what it does first.
We start with a look at the first two if-statements, the function guards.
Again, this is obvious in hindsight, but when first confronted with a problem statement, these are questions you have to think about.
If both `a` and `b` are empty, _any_ number would cleanly divide all numbers in `a` and none of those in `b`.
That is, there is no number inside those arrays that would fail `all_divide(a, 0) && none_divide(b, 0)` as neither loop runs a single iteration.
If either of those arrays contained a value, this would lead to a division by $0$, which is Bad™, so we start the loop below at 1 instead.

But what is that about `return max_abs(b) + 1;`?
Simple! If `a` is empty, we merely have to find a number that doesn't divide any number in `b`.
How do we find a number that does not cleanly divide any number in `b`?
We just take a number that is larger than any number in `b`.
No number can be cleanly divided by a larger number!
Consider the remainder of `5 % 8 == 5`, and keep in mind we are talking about absolute values.

Now we only have cases left to consider where there are elements in `a`.
So we have to find a number that cleanly divides all of those.
We can simply try all numbers starting from 1 exhaustively.
Above, we have shown that `all_divide(a, max_abs(a) + 1`) is clearly false, so we stop one iteration before reaching that point.
Then we check if it also doesn't cleanly divide any numbers in `b`, and we return.
If we didn't find any number, we throw.
And, we're done!

We run some simple tests on the numbers above:

```cpp
int main(){
    std::vector<int> a = {21, 6, 6, 15};
    std::vector<int> b = {2, 7, 22, 8};

    std::cout << find_divisor(a, b) << '\n';
}
```

and the program prints `3`!
In the interview, we talked a bit about the [complexity](https://en.wikipedia.org/wiki/Time_complexity), which is a topic I won't explain here in detail.
It's basically a measure of how the runtime grows for larger inputs.
Here, the worst-case runtime is bounded by $O(\max(a)\cdot(|a|+|b|))$.
We are counting up the numbers up to the maximum number in a, $\max(a)$, assumed to be positive, and for each number, we check if it's divisible against each number in `a` and each number in `b`. In the worst case, we always run through all items up to the last item in `b` before proceeding to the next iteration.

During the interview, we also talked touched on parallelisation (it parallelises very well if you put each iteration of the `find_divisor` loop on a new thread, but that's a topic for another time).
So all is good, right?

### Problems

I was asked what kinds of test cases I would suggest for this code.
There's the obvious edge cases:
What if either `a` or `b` is empty?
What if they contain negative numbers? (When writing this post, I embarrassingly forgot a `std::abs` in the `max_abs` function which gave me some wrong results in those cases)
What if they contain a $0$? (I'm not handling this case here, but having a simple guard for those cases is simple, and you should consider them)
What if the solution is contained in `a` and `a` only has a single value? (Beware off-by-one errors and don't stop the `find_divisor` loop too early!)

These are all pretty straightforward and mostly work well with our solution.
But what if `b` contains `INT_MAX` or `INT_MIN`?

#### Returning `INT_MAX + 1`

This one I actually brought up during the interview.
In our code, we return `max_abs(b) + 1`.
We know that a number with an absolute value larger than all items in `b` fulfils the function criteria.
But what if `max_abs(b)` returns `INT_MAX`?
We're still dealing with integers, and C++ is not a safe language, so we get an [integer overflow](https://en.wikipedia.org/wiki/Integer_overflow).
As far as I know, in C++20, a signed integer overflow is [undefined behaviour](https://en.cppreference.com/w/cpp/language/ub).
Testing the output on [gcc 12.2 on Compiler Explorer](https://godbolt.org/#z:OYLghAFBqd5QCxAYwPYBMCmBRdBLAF1QCcAaPECAMzwBtMA7AQwFtMQByARg9KtQYEAysib0QXACx8BBAKoBnTAAUAHpwAMvAFYTStJg1DIApACYAQuYukl9ZATwDKjdAGFUtAK4sGIM1ykrgAyeAyYAHI%2BAEaYxCAAHKQADqgKhE4MHt6%2B/oGp6Y4CoeFRLLHxSXaYDplCBEzEBNk%2BfgG2mPZFDPWNBCWRMXGJtg1NLbntCmP9YYPlwwkAlLaoXsTI7BzmAMxhyN5YANQmO25O08SYrKfYJhoAgrv7h5gnZ8gsTAQIt/dPZj2DAOXmOpzcBzwLEICj%2Bj2ewNe7whTAUSiacIBQJBYLOADcakRiJiETi3uDMKpNsluiTAS9QeSzgwfHE8KYdnd4fTEYzkWJgCRCAgWCTHmECEcvqoAPpMaIKCBoBjTI7TdAgEAEhwkcESv5mABsRzxSxMAHYrPCNABOCVS94AESOGlOVqetv4xCVAlVTC8RBNYiOIBNZst/3uNqjeCoEHVmvlirxYiW72wUvD7qjOdtLCdaoIGpASYgKdoZp22dtOfNjsjNbrDZtVwI6wYUrdkab1oe9uhDDlCp9KslCa1hN1Z31nPMxtNFurdsEDtOzoAkhEACoygCyDwAGl3rTavSO/QHUEHaCGw4vmzG4%2BPS%2BW0%2BDM/eT7mbfm14Xiy%2BqbHh60aNvWX49iBrbtp2VbduBHoPNEqCeEcYi0DK%2BB4ngWDnmORaatqRJ6oIBrzqQRz2lhWbNmeyoXoG5a3guEZfrasZlsG5gAKxHFhRxgGAf4aDRbGgS2mBtsQHZUGISjAd%2BFoIbWym2tB0lHAQxBeJgCmQf8yGoQwAiYJheDYbh9H4cWRFTucpGzkaJoUVR5miSBdG%2BpK/qMcGoYsUuj6cTePF8eZTrCe5ilqZJMGybQ8lwWJSkPvpMVSR2Wk6Xpql9iuwDIOgeH/oRk7EtODl3E5AXNhxeIAHSYCwNIAJ4QEsabqR2rpJSBPlXugBYNVQxCyO1Cknme/WUZKf4NcgsTAGE7UnJYRxcG6M0CUJOzOvNrjjVWq1WJYhBRTWtqDX%2B44FUV6AUQAVGdE3RmloFQbFGnoDlDZ5ZKNAMOgZnYQoJDFeOtnlfZBBkWhFFWSVE46lDM5Vca0TnXacZMI1zUEG1b5GnORzRLjrXtZ1n3dS9HE4015MdUcXVSkwsqlhjx3rS9tFg9NeAFhtR38%2B%2BA5DoqTCVhYx3WHgmNBehwM4ZgEBMC5hOGsTxnhIruHRGrcsXRJGWUdzYGpap71Rj8o0AO6rWYERXqD3jdEc/BeID5hmD9vb9kwy3uUcQcnKxDzB%2BHiOQyRMOcmhBaLu0RyGhRyfrdxKW9RHwcQ2V0e3CT8eWmYFHmhRZjF0c3Guk2vX/FnQfjmgAbIu%2BANA1heCg96qsk2%2BZzvmA2zcW4DCD8B4cpY8E%2Bh/Xke5xVMcZkwhcWAAtInq%2Bp5vFGr1w6c1%2B6s858jeex9EK/rzvpdHOvFer1XGfVmH9eN2ss392cbthO35md7zFEc3BAPIeI8x6Z2DpPZ%2BQdPxQIjsfYiC987Lz/AnQIScU4UT3o/OuL8CJIwQdDfO58UFFxLmXCuVcU7YN7LPLSLUYGz3Dq/ZuQDP5t0Vl3FWAC%2B5uGASYYeo9tjgKzkpI4ogCDIAQMVSRjQHqB0YQ3PBTd368M/l7bAqhkiEkwINa2qA7aoGQMgdYOj%2BEjy9uPeukDZ44OgZBaeh9cE2XnoQ2OyDdohysAfWxcC8FR0QWfFeFdr7lwog/bxNCnGamUS3Nh38OH/17rEtwAkQGCMsXYhCDifFML8S41GccSEWETqnVOWCImwNyc4k%2BASMzEI8feCpOTs5KLfskr%2BgMEnd24e0seAiwGOMyT4hhUT8F2QKe450jT6zCN8dUghBT6lTIjE0qeoyYmsJSewjunCe6AI/ikvpoChGDJDlkiBM9Rn%2BNcUvIJG0KlHzyTUm5Bcik7GoYhR5xYNkHI6T/EGiT9mqMOWkgZwz7EXNOVU0qzyJkrw%2BV8mFCzKqvIaZaTcO59xHlWZUlp3y2mbL%2BV0rhSTCVHPSbMyBPjmY9WzHWDgKxaCcG4rwPwHAtCkFQJwXhlhrBqjWBsckgIeCkAIJoBlKwADWIBJBmHqlwBICRJDmm4oaQ0OxlU2kBPoTgkhWXis5ZwXgCgQAaFFeKlYcBYBIDQM1OgcRyCUFtcke18RgBcFCVgbCmwABqeBMA2wAPJaLZSKmgtACBxBNRAaIBrohhEaC1TgIr43MGIC1QN0RtCEmTbwW1bBBCBoYLQJN7LeBYC%2BEYcQZbSD4CuLUAkJqa2UhqAGLYHKJSdANbQPA0RiCJo8FgA1WkoS5pWFQAwwAFB%2BoDcGxguaZCCBEGIdgUhF3yCUGoA1uhAgGCMCgaw1h9C9pNZAFYqAaSZCbcazohJMguEBhMPwgQQhzDKBUPQBQMgCCfZ%2BtI36GADHfcMQI1RagCF6OMTwrQ9Bge6JB2YpQhjxFAzMX9qG%2BhAeQxIFYoN1ibBwzqjgLLSBso5VyjgRxVAJENJvSQRwCrIHWnKswRwIC4EICQVaOwuBLF4GKstHVSDSo1fVBIAQNDmnVYac0Zgq47CSEyjgerSMGoo8a015rBOkCtYgEAb9kgBkdT6O19BiARFYFsajtHDT0cY8x%2BqZheA6M48QHCeh%2BBLtEOINdnmN0qHUDWndpAbb9uSGOojJGyO8Ao4GgMhnJSoCoFRmjdGGNGIc6xiAHhTNxG47x/jFqpX%2BDlTaG0GhJCasNFq80GgFPSCUyp6LhqOAabNQJrQQmlNOdUzW9TWnOsrAJMQdIzhJBAA%3D%3D%3D), this results in $-2147483648$.
This just so happens to be `INT_MIN`, which technically has an absolute value larger than `INT_MAX` of $2147483647$ by $1$, so it's technically a valid solution even if not what we expected.
Nevertheless, this is undefined behaviour, which you shouldn't be relying on, and which could be changed at the compiler implementers' convenience.
They're sometimes doing some unexpected optimisations in cases like this, so check the cppreference link above if you want to learn more.

So, we know what happens if we put in `INT_MAX`.
But why does the overflow do what it does?
... and what would happen if we give it `INT_MIN`?

#### Oh `std::abs(INT_MIN)`

Signed integers are usually implemented using [two's complement](https://en.wikipedia.org/wiki/Two%27s_complement).
While a value of type `int` is [usually](https://en.cppreference.com/w/cpp/language/types) 32 bits long, we will for simplicity look at a signed integer of 3 bits.
In the table below, you can see how each combination of bits corresponds to an unsigned or signed integer value.

| Bits | Unsigned Value | Signed Value |
| ---- | -------------- | ------------ |
| 000  | 0              | 0            |
| 001  | 1              | 1            |
| 010  | 2              | 2            |
| 011  | 3              | 3            |
| 100  | 4              | -4           |
| 101  | 5              | -3           |
| 110  | 6              | -2           |
| 111  | 7              | -1           |

As you can see the first bit effectively indicates whether the number is negative or positive.
Moreover, there is one more negative number than there are positive numbers, as the $0$ takes the space of all bits being $0$.
The same applies to 32 bits.

It also shows how we got from `INT_MAX` to `INT_MIN`.
When we have the value $3$ with bits `011`, and we add $1$, we get the binary representation `100`, which corresponds to $-4$.

But this raises the question, what happens if we call `std::abs(INT_MIN)`?
There is no valid bit representation of the smallest integer number's absolute value.
Well, turns out, it's our good friend undefined behaviour again!
[Cppreference](https://en.cppreference.com/w/cpp/numeric/math/abs) says "The behavior is undefined if the result cannot be represented by the return type."
Checking `assert(std::abs(INT_MIN) == INT_MIN)` on [Compiler Explorer](https://godbolt.org/z/sjo9Eq65r) succeeds and both display the same value if printed.
It effectively seems to be doing nothing.
This is likely the result of how flipping a sign in two's complements is implemented.
You just flip all the bits and add $1$.
See how it behaves for some values in the table above!
But again, this is undefined behaviour we're talking about in this case, so we better do something about it.

Well, what should you do about it?
The simplest solution is to just limit your values to the interval $[-2^{30}, 2^{30}]$ or something similar?
Our logic becomes really slow for large numbers anyway, so it's probably fine, depending on your use case.
Alternatively, you can check for these edge cases and throw an exception.

But not everything that is wrong is undefined behaviour or even necessarily wrong.

#### Unnecessary Inefficiencies

I'm sure some people have groaned out loud when I gave the loop of the form

```cpp
for(auto i = 1; i <= max_abs(a); ++i)
```

I explained above that a number is not cleanly divisible by a larger number.
So, we can stop after reaching the largest number in `a` because larger numbers won't be divisible any more, right?
Well yes, but as soon as we pass the _smallest_ number in `a`, it won't be divisible any more.
If `a` contains $3$ and $40$, there is no point in checking if $3$ is cleanly divisible by any number between $4$ and $40$, because there will always be a remainder of $3$.
If there's a large difference between the smallest and the largest number, we may be doing a lot of unnecessary iterations!

The solution is obvious, we change the loop to go only until we have checked against the _minimal_ element in `a`:

```cpp
for(auto i = 1; i <= min_abs(a); ++i)
```

The implementation of `min_abs` is left as an exercise to the reader.
Keep in mind that `a` may contain `INT_MIN` if you don't guard against it.

For a moment, I thought we could take this even further.
I thought you might be able to stop already after reaching `i <= std::sqrt(min_abs(a))`.
Without going too deep into the thought process, the general idea was along these lines:

1. Say we found an $i$ which cleanly divides `min_abs`, which we will refer to as $m$.
2. Then there exists $j$ with $m=i\cdot j$.
3. With that, we've already established that $j$ divides `min_abs`. What point is there in doing a separate check and doing lots of potential divisions?
   However, I forgot that, while we know that $j$ divides `min_abs`, _we do not know whether $j$ divides all the other numbers in `a` or `b`_.

As such, we will have to think of some other ways to achieve further speed-ups.
Keep this idea in the back of your mind though.

### Decomposing `a`

How can we improve the time it takes to find divisors common across all values in `a`?
We can remove duplicates for one.
But we can do even better.
If possible, we'd like to avoid having to do an extra division for every single item in `a` on every single loop iteration.
What if we could get rid of all that work?
We can mostly _move it before the loop_.
That way, while we have to do more in advance, there is significantly less work we have to do on _every single iteration_.
So how do we do that?

Let's consider an example and say that `a` consists of `{3, 9}`.
What are all the possible values that divide them both?
Well, it's $1$ and $3$.
Hmm, let's look at another one, `{6, 9}`.
Interesting, it's $1$ and $3$ again.
What about `{12, 18}`?
It's $1, 2, 3$, and $6$.

Do you notice the pattern?
**The largest number is always the greatest common divisor of both numbers.**
On reflection, this makes sense and may even be obvious.
Of course the largest number that cleanly divides all the numbers is their greatest common divisor.
Moreover, **all other numbers that cleanly divide all numbers are factors of the greatest common divisor**.

That means, if we find the greatest common divisor $d$, it is sufficient to check if a number divides $d$ without having to check all the actual values in `a`!
But wait, how do you compute the greatest common divisor of two numbers again?

#### The Euclidian Algorithm

While this is not the fastest algorithm to compute the greatest common divisor of two numbers, it is fairly simple to understand and apply.
I won't go into the intuition here, but the [Wikipedia page](https://en.wikipedia.org/wiki/Greatest_common_divisor#Euclid's_algorithm) gives a decent overview.
It is based on the fact that, given two numbers $x$ and $y$ with $x<y$, it is
{{< mathjax >}}

$$
\gcd(y, x)\to\gcd(x, y\mod x).
$$

{{</mathjax >}}
To look a at simple example from the same page, let's compute the greatest common divisor of $48$ and $18$:

{{< mathjax >}}

$$
\begin{align*}
        \gcd(48, 18)&\to\gcd(18, 48\mod 18) = \gcd(18, 12) \\
                &\to \gcd(12, 18 \mod 12) = \gcd(12, 6) \\
                &\to \gcd(6, 12 \mod 6) = \gcd(6, 0). \\
\end{align*}
$$

{{</mathjax >}}
So we can conclude that $\gcd(48, 18)=6$.

So, let's put that to code!
... actually, there's no need.
Since C++17, there's [`std::gcd`](https://en.cppreference.com/w/cpp/numeric/gcd).
But that's just for 2 numbers, so how do we get the greatest common divisor for a whole vector?

Well, let's assume we've got 3 numbers $x, y$ and $z$.
We already computed the greatest common divisor $d=\gcd(x, y)$.
Now remember, every divisor of $d$ is also a divisor of $x$ and $y$.
So if we now compute $\gcd(d, z)$, the result is the greatest common divisor across all of $x, y$ and $z$.

This means we can implement our method like this:

```cpp
int gcd(const std::vector<int>& v){
    if(v.empty()) return 0;
    auto d = v.front();

    for(auto it = v.cbegin() + 1; it != v.cend(); ++it){
        d = std::gcd(d, *it);
    }

    return d;
}
```

Now all that's left is to put it into practice!

#### Putting it to practice

Let's see, we should be able to do something like this:

```cpp
int find_divisor(const std::vector<int>& a, const std::vector<int>& b){
    if(a.empty() && b.empty()) return 0;
    if(a.empty()) return max_abs(b) + 1;

    const auto d = gcd(a);

    for(auto i = 1; i <= d; ++i){
        if(d % i != 0) continue;

        if(none_divide(b, i)){
            return i;
        }
    }

    throw "No solution found";
}
```

How's this look?
Pretty good I'd say!

But wait, we can do better.
Remember how I thought earlier that we can stop after reaching `std::sqrt(min_abs(a))`?
Back then, we decided to stop because we'd still have had to run a lot of checks on $j$.
Well, I have a good feeling about this.

For example, let's assume we have $d=12$.
After we have passed $i=3$, we know that no values $j$ of $5, 6, 7, 8, 9, 10$, or $11$ will divide $12$ cleanly, as otherwise we'd have found them when checking against the corresponding $i$ with $i\cdot j=12$.
That's a lot of unnecessary divisions we could skip.
How about something like this?

```cpp
int find_divisor(const std::vector<int>& a, const std::vector<int>& b){
    if(a.empty() && b.empty()) return 0;
    if(a.empty()) return max_abs(b) + 1;

    const auto d = gcd(a);

    for(auto i = 1; i*i <= d; ++i){
        if(d % i != 0) continue;

        const auto j = d / i;

        assert(i*j==d);

        if(none_divide(b, i)){
            return i;
        }

        if(i != j && none_divide(b, j)){
            return j;
        }
    }

    throw "No solution found";
}
```

I'd say that's pretty good (again)!

Keep in mind that this has a slightly different behaviour from the previous algorithm.
Before, we would always find the smallest positive $i$ which fulfilled the condition.
On an example of `a={21}` and `b={3}`, we would previously return $7$.
This version instead gives $21$.

I will skip the actual complexity analysis here because it's kinda [complicated](https://stackoverflow.com/questions/3980416/time-complexity-of-euclids-algorithm), I'm kinda lazy, and it's not the focus of this post.
I hope it is clear that we're doing less work inside the main loop, however.

Now, there's more efficient [factorisation algorithms](https://en.wikipedia.org/wiki/Integer_factorization) than the [trial division](https://en.wikipedia.org/wiki/Trial_division) employed here.
Feel free to look into that on your own.
Besides some simple optimisations detailed for this strategy, you might want to look into the [quadratic sieve](https://en.wikipedia.org/wiki/Quadratic_sieve) or the [general number field sieve](https://en.wikipedia.org/wiki/General_number_field_sieve), although nobody will expect them from you in a coding interview (hopefully), and they're rather advanced.

As for us, we still have to do a lot of checks against `b` ...

### Decomposing `b`

#### Cleaning the dataset

Let's get the obvious stuff out of the way.
Like for `a`, we can remove duplicates from `b`.
We can also, if a number $x$ is a multiple of another number $y$, remove the number $y$.
Any number that would divide $y$ would also divide its multiple $x$, so there's no need to check them both.
Any number that divides $4$ will also divide $8$.
Unfortunately, depending on the dataset, this doesn't give us much of an advantage.

#### About the Least Common Multiple

We've figured out how to reduce the checks on `a` to a single check.
Now how do we do the same for `b`?
My first idea was to attempt a similar strategy as for `a`, just instead of considering the greatest common divisor, we consider the least common multiple.
If a number $x$ is divisible by another number $i$, then any multiple of $x$ will also be divisible by $i$.
So if any number in a set is divisible by $i$, their least common multiple will also be divisible by $i$.
In other words, if the least common multiple is _not_ divisible by $i$, we can conclude that none of the numbers in the set are divisible by $i$!

Let's look at an example.
Consider a `b` of `{6, 10}`.
Their least common multiple is $30$.
If we look at the possible numbers that it could be divided by, we get a table like the following:

| Name | Divides 30 | Divides 6 | Divides 10 |
| ---- | ---------- | --------- | ---------- |
| 1    | true       | true      | true       |
| 2    | true       | true      | true       |
| 3    | true       | true      |            |
| 4    |            |           |            |
| 5    | true       |           | true       |
| 6    | true       | true      |            |
| 7    |            |           |            |
| 8    |            |           |            |
| 9    |            |           |            |
| 10   | true       |           | true       |

This is looking pretty good so far!
It seems like our number divides $30$ exactly if and only if it divides either $6$ or $10$.
But wait, what about $15$?
$15$ divides $30$, but it divides neither $6$ nor $10$.
Can we deal with that?

Unfortunately, I don't see a good way around it.
Let's assume we've got the numbers `{2, 3, 10}`.
Their least common multiple is again $30$.
This means we would throw out $6$ as dividing $30$, but clearly it doesn't actually divide any of our numbers.
This strategy is only beneficial in the one case where it shows no number is divisible, but in our algorithm, that may happen at most once, i.e. before we terminate.
Unfortunately, this doesn't seem very useful for us.

So, does this mean we still have to check against all the numbers in `b` every time?

#### At least we can skip some elements

When looking into this problem, I saw that I'm not the first person to wonder about it.
While I didn't find any actual solutions, I did see an idea to potentially speed the search up by [Antti Huima](https://stackoverflow.com/a/10497293).
In the particular case where `b` is very dense and the numbers are close together, or we are already considering a very large number to divide by, there are some values that we do not need to check.

For an example, let's say we're checking an $i$ of size $7$ against a set `b` of `{5, 8, 11, 12, 14, 15}`.
Say we just looked at the number $8$ and saw that it does not divide by $7$.
We know that the next number after $8$ that $7$ does divide is $14$, so we can just skip doing a division for $11$ and $12$.
In other words, if we look at $x$, the next number to consider has to have size at least $\left\lfloor \frac x i \right\rfloor\cdot i + i$, or `(x/i)*i+i` (remember that in C++ integer division automatically rounds down!), or even `x-(x%i)+i`.
Similarly, you immediately know that if all numbers in `b` are smaller than $i$, none of them can be divided by it.
Depending on the dataset, it may even make sense to check each multiple of $i$ instead of doing a single division.
This might look something like this.

```cpp
bool none_divide(const std::vector<int>& v, int div){
    if(v.empty()) return true;

    // Assume v is sorted and only has positive values
    auto it = v.cbegin();
    for(auto i = div; i <= v.back(); i += div){
        while(*it < i) ++it;
        if(*it == i) return false;
    }
    return true;
}
```

Note that I assume the values to be normalised before calling this function for simplicity.
That might look something like this:

```cpp
std::transform(b.begin(), b.end(), b.begin(), [](int n){ return std::abs(n); });
std::sort(b.begin(), b.end());
```

This effectively does a linear search for the next match.
Maybe it makes more sense to do a binary search for large steps, or maybe turning the vector into a [hashset](https://en.cppreference.com/w/cpp/container/unordered_set) that allows you to check whether a number is included in [constant time](https://en.cppreference.com/w/cpp/container/unordered_set/contains) does the trick.
But again, I expect this highly depends on the workload.
Feel free to run a complexity analysis, and if you ever actually need a solution for this, make sure to benchmark your data.

## Further Work?

So, this is where we're at.
We talked about some problems causing undefined behaviour, from integer overflows to the absolute values of `INT_MIN`.
These are unfortunately aspects you'll always have to keep in the back of your mind when working with C++.

One way of dealing with it is the way rust does.
There, a signed integer overflow is defined behaviour and works as if it was a modulo operation.
This may not be what we're expecting, but at least it is clearly defined.
Moreover, there's [`i32::checked_add`](https://doc.rust-lang.org/std/primitive.i32.html#method.checked_add) whose return value indicates whether an overflow has occurred.
While [`i32::abs`](https://doc.rust-lang.org/std/primitive.i32.html#method.abs) panics on an overflow (during debug, in release, it silently does nothing like in C++), [`i32::overflowing_abs`](https://doc.rust-lang.org/std/primitive.i32.html#method.overflowing_abs) gives you the facilities to handle this case.
In C++ land, you might choose to use a library like [SafeInt](https://github.com/dcleblanc/SafeInt), but that is often not an ideal solution.

We have done some good work on improving the expected performance of dealing with `a`.
Unfortunately, we don't have a great strategy for dealing with `b`.
Maybe there's some good way to solve this.
Maybe that way is really technical and complicated.
Maybe it's really simple.
Feel free to let me know, and I may update this post!

You can play around with all the code [here](https://godbolt.org/#z:OYLghAFBqd5QCxAYwPYBMCmBRdBLAF1QCcAaPECAMzwBtMA7AQwFtMQByARg9KtQYEAysib0QXACx8BBAKoBnTAAUAHpwAMvAFYTStJg1DIApACYAQuYukl9ZATwDKjdAGFUtAK4sGe1wAyeAyYAHI%2BAEaYxCAAzLGkAA6oCoRODB7evnrJqY4CQSHhLFEx8baY9vkMQgRMxASZPn5cFVXptfUEhWGR0XEJCnUNTdmtQ109xaUDAJS2qF7EyOwc5rHByN5YANQmsW5OQ8SYrPvYJhoAguub25h7B8gsTAQI55c3ZhsMW167%2BzcWzwLEICg%2B11uv3ujyBTAUSgaEK%2BPz%2BAIOADdMA4SMioWiHoDMKoVolqnjvnd/oSDgwfNE8KZYhdIZTodTYWJgCRCAgWHjrgB6QU7YIEHYvYIQWYmADsViFIp2yp28MRBAgQ3QIBATAiCggAElQgAVAD6AFljbNHgARfa2nbG81W0Iy2IKq7Cvay%2B2Q65iiVMVRmvUGtAMIY7LU6rE44iAsUfMwANh2GJl8s%2BlwAnIGWHadhp9p7c/xiBAI1GmF4iOmxDsQOnM6WNDnc3gqJqCNrdfqIBixDbzhKW9m27ncwWHdGezqwwOhyXx%2B2J76V3K/Tc2ycCEsGBLl5D1/6rvngqH%2B1XxTGQHGiAmDknmeY0xm5a284IJYXnZargAGke245uWlYCNWtaoPWtCNs2H4bm2nbdr2C6DrQw4HKOCH%2BqueHTrEjq3mhS4eoh7YniBm4rru%2B6HmRx5bp8ESoJ4qq0LQZr4BieBYOBkY3nOd7Yg%2BiaCMmb6kKK37cWOuFgdeqpQTBcHvlmuEdl26F7GYACsOzcTsYBgDOGhyVRE47pge7EAeVBiEowGTmuTEuTR1l0QQxBeJgTmUZ83osWxDACJgXF4DxfGKbe964k%2B4kvqm6ZSYGsk4V6IpliQ/GQXW2lNmpnres5eZaQ25j6YZDqmeZxWWXhtG2Ts9m0I5DEZXs9XUYqnUUVudU5o1B5eT5wHFf51xBbBIUhOFkWYDlgm9rFj6HAlFxJRiKUyRF5kqqKWkAHSYCwZIAJ7SjaQ07CNvntSu3pXAi9LpqKCjRiQBCYOgK41nWhCFhih3IFEwBSu6n5gX90F4IW3ElqKsIzkDERMMgADW0oI7D1gzml6kWTmADuCB0AtABUAOAqKw6WNYhBOfVyGU%2BK1WETTOzXS1bWft1IHXbdfmuWe37AMg6CLbOy0iXFa0EBJ8EE5pA7HadBAXbMV0eU1xb3W20MGYDh1UMQshY3rIFQ8pVPs0DIOYGDDDSjpFg7Fw2PisZyPA645uu7jliEOZJXoIWt5ixL6BSSzEMbhNq789rB4/fdE0dYGNAMOgc14Ao2XRUJK1ifLiVpkwUkF9L8bFwrES1ZlSFdkwqvnc7r6vjsEQt%2Brl2c0nRZjQ3pUQM3J2t5rfc2QeLwhgudcu27jMJwNVv/YW7seoj1Oggwl4GkwEMu/T9e9crYicdxvELeXHPt0lM1hZffERClmvpQNJXXXgg%2Bn25PWTvHAKQ83imyJjpMwoRoJ528NUZqiws7mDMD/PmQDpLikztnS%2BecKyV1jDLVaz4NplwrhBJaeDq7xRLkQzuJ8z7dw1jpFMHcu5jx7hPa6usipD2QqPNWGstZTyDLPfs89rCLwtgNRSBtQ4zgjiPWOGl/5tlXjDde2MkbsxTv7OmgdaFMy7DIvSiMvbszMjsCMjg6R3V5pZDqJVkIPxzs/V%2Bei8K5i/sgrqlEP6AKUTmEBqAwGIMgR9GB6Q4FeAQWYJB7VxrCwzsETBEVc751IVLcholKEKxvjFfBNdS40PSnQ1hDC75phYXw3uHCl48PoVU/uM894QFEZYcRrYrj7VvF5QwChywsGaYdUG4MpIsKztKEZgyHbDL2LpKwulbQQEDAwFsk86LEX7MshGm4FEdJVLebBGou5DKdvMTux0xlvwtrmKRykZHszkQfJeK4VFb3ZhvV2eBKYaMdFoo%2Buiin6IgIY/SsMTGOjMRY4Io0rn1RuXWbQcMdgim/jCvCapogak%2BdoNmtp0A7JKuRBxoUnELRfjTYOXUrKCJRTYvq45CbIVBSZdmCKyk7EcU/UlUltBvyVpSwa/dsV6zcYA3xIEAlBOiSE6BtZwn8EiT9aJQt6X5iYODdK%2B0NX7T2YXPJWTmSqkLB%2BMwrQdgpikuat2ulqLtW1TqqumS5YjgiEa%2BUZgpKyiktEqSulizrgtna5Ut40C1g0W4ZqiSc7YJHiMzCbhqZgDWLpNwDBE3AU1ZRDNnpA3pOEhQp1BqmCuosAAWhNVJEtlrK0Vq4Na/12bA25PzYQzuxay0Vs9TsMt7qu2%2Bpte0nNwbFiswONTDBUbso31EaOrCabk2prWLalUfMs2fEHbq5t61DUzmNaay1lra39rXY2jdjqW0up3W6j1Xqe2%2BotUe08OavJnS1TmoNQkQ0jvjVhcdWDJ2xrDUZJNKa01LrtZucxrxkAIEltB%2Bo5M9pvvfb2T9gHEHYFUIkES30boIFATsVAyBkBLG%2BiYediD02BpXVR64Gatyrtoyeh1ssW1FsvVYetx67VNrPVui97NjXXp2N6nYfbOOPqYzqVDgIx2Rr/RWKdcaE3AYXZR5U1H1ME3XcxghW62MCbdXui1UlD3id2dx09LG%2BPFofducz2qh2hpkz%2BuTyTo2KcA3OkDi6G2afo8urTkm828aodugzHH7RgYc5Z3ToX%2BOOgQmZrj0WUPDsA7%2Btz/6aGeZU6B3zPp/Oafy50mL%2BTsBhYS4Z2z2mMlWbi8W2ItnksldS05md4aMs8XcwB5z4avOqaixpn0xX7W1diyOfTlWItqZS2Nsrrb2N/gtIBJrjGLOta/bJrOE6FM9fa0Bsj3mZsoLW6snWQsODzFoJwXSvA/AcC0KQVAnB406NdnnJYKwdKxB4KQAgmhLvzHRiASQZhDpcAABwQ8kLKXSKYUyxBhzmb4%2BhOCSDuwDp7nBeAKBABoP7AP5hwFgEgNAp0yZkAoOBcn9AYjAC4N6rAPEVgADU8CYCJgAeSw/d37NBaBfWILj5pmOIjBHqGdTgv2xfMGIGdTnERtAiSl7wMnbBBCc4YLQSXD3eBYBeEYcQuvSD4BOA4CKmBcfG%2BJNiWsqxHtikqJj2geAIjEAlx4LAmOvIghV/MKgBhgAKDZxz7njAVcyEECIMQ7ApCR/kEoNQmPdCtAMEYFAAcbAu/1PAeYqAyTpCtzjyoIl0guCzqMFopBAjBF6CUforRchpAEJXnIKRm8MCmH0GI4wS/m4EJ0EYnhmh6DsKXgfwxui1%2BmA32wk/W/jEn13%2BvPf5gfeWLHq7N2MfG%2BexwHYqgIcpkrZIHYYtkBuzB2YHYEBcCEBIN9rgsxeD/d15rUgwPEeHQhyajQsoEcpiyh6QaCxAQ6o4cDo6kD3aPZ744544E5v6kDE6IAgDDqJC1jkCUBk6JAU6hCsCrCH7H4pin7n6X6HRmC8DfT37EC8R6D8BR6iDiBx70EJ4qDqDG4p6kBEzu6JB%2B7gG3ZQGY576c61joHiioBUAH5H4n5n5EZkHX4QAeA07RCP7P4IFaDv7A7RKHQ5g5gaCSBI4pjI6yggHQ7gGQHQG8CwG2DwGv4aFb4cAUGCG77Y7qGA6kBYhC5l6SBAA%3D%3D).
