+++
title = "jj tug"
date = 2025-01-07T16:53:45+01:00
description = "A great alias to make dealing with moving jj bookmarks easier"
tags = [
"jj", "ux"
]
+++

I really like working with [jj](https://github.com/jj-vcs/jj), and I wouldn't want to go back to pure git.
In jj, the tip of your branch doesn't follow new commits automatically.
That means you're often in situations like this, where you want to move your bookmark to the latest change:

```
› jj log
@  pytqprxw shaddythefirst@gmail.com 2025-01-07 17:04:59 7791efad
│  (no description set)
○  rxnmpktx shaddythefirst@gmail.com 2025-01-07 17:02:51 git_head() 9033f455
│  notes: Add jj-tug
◆  lvosywup shaddythefirst@gmail.com 2025-01-07 13:07:52 master 524578da
│  notes: Add grafana-ta
~
```

For the record, I like this part.
I like that you have to consciously think about where you want your branches to point to.
However, sometimes branch names are annoying to remember, especially when they're generated
by jj in the first place.
I always have to copy the branch name by hand from the log when I want to do something like
[`jj b move push-qlonwoskvtmu --to @-`](https://jj-vcs.github.io/jj/latest/cli-reference/#jj-bookmark-move)
to make it point to my latest change.

Then today I came across the `jj tug` alias in the [jj discord](https://discord.gg/dkmfj3aGQN)
(also mentioned [here](https://github.com/jj-vcs/jj/discussions/2425#discussioncomment-11425112) and in `jj b move --help`).

Now I just do

```
› jj tug
Moved 1 bookmarks to rxnmpktx 166780f0 master* | notes: Add jj-tug
› jj log
@  szlurtow shaddythefirst@gmail.com 2025-01-07 17:25:43 4a6f774e
│  (empty) (no description set)
○  rxnmpktx shaddythefirst@gmail.com 2025-01-07 17:25:43 master* git_head() 166780f0
│  notes: Add jj-tug
◆  lvosywup shaddythefirst@gmail.com 2025-01-07 13:07:52 master@origin 524578da
│  notes: Add grafana-ta
~
```

It's an [alias](https://jj-vcs.github.io/jj/latest/config/#aliases) you can set to do this process automatically,
and it looks like this:

```
tug = ["bookmark", "move", "--from", "heads(::@- & bookmarks())", "--to", "@-"]
```

Or, if you're using [home-manager](https://github.com/nix-community/home-manager/) on nix:

```nix
programs.jujutsu.settings.aliases.tug = ["bookmark" "move" "--from" "heads(::@- & bookmarks())" "--to" "@-"];
```

The alias will take the closest ancestor bookmark[^1] and move them the current change.

Or to break it down, `::@-` refers to ancestors of the parent change,
`bookmarks()` refers to all changes with bookmarks,
and `heads()` instructs to only take the latest change[^2].

[^1]: Technically it will take all bookmarks from the closest ancestor change that has a bookmark at all.
[^2]: Beware when using this after a merge commit.

So if I've got this history:
```
› jj log
@  oxvmymql shaddythefirst@gmail.com 2025-01-07 17:20:24 a475954f
│  (no description set)
○  xkqnuqvl shaddythefirst@gmail.com 2025-01-07 17:19:02 bookmark2 git_head() ddf702f7
│  (empty) (no description set)
○  pytqprxw shaddythefirst@gmail.com 2025-01-07 17:18:48 bookmark1 436efad8
│  (no description set)
```

It will only move the `bookmark2` bookmark:
```
› jj log -r 'heads(::@ & bookmarks())'
○  xkqnuqvl shaddythefirst@gmail.com 2025-01-07 17:19:02 bookmark2 git_head() ddf702f7
│  (empty) (no description set)
~
```

So I think this alias will make my life a lot easier and is a good reminder to invest in useful aliases more
and that I need to mess more with the revset language.
And if things go wrong, [`jj undo`](https://jj-vcs.github.io/jj/latest/cli-reference/#jj-operation-undo)
is always an option, so there's nothing to fear!

Also, props to the jj team for putting such a useful command in the help docs so people actually stumble over it!
