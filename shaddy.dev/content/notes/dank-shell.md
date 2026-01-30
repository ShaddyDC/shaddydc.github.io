+++
title = "Dank Material Shell"
date = 2026-03-07T22:06:52+01:00
description = "Nice linux desktop environments made easy"
tags = [
"linux",
"tiling",
"window-managers",
"hyprland",
"niri",
]
+++

I like tiling window managers like [Hyprland](https://github.com/hyprwm/Hyprland/)
or [Niri](https://github.com/niri-wm/niri) on Linux,
and I use them on all my personal machines.
They are great and give you a lot of control in how your desktop environment
should behave and feel.
But they often don't come with batteries included.
You do not get a task bar or a system clock, an icon tray or an application launcher.
This is a blessing if you like really making things your own.
If you're kind of lazy and just want something that's good enough, it can be a curse.

For a long time, I ran a very scuffed [eww](https://github.com/elkowar/eww/)-based
setup that I stole from a very old version of the [dotfiles](https://github.com/fufexan/dotfiles/)
of fufexan, or Mihai Fufezan.
This worked, but since the setup was removed from the original repo, clearly no longer used,
I had to copy it completely to my own dotfiles, it required me to compile some dependencies
just for itself, and I was never quite happy with it.
But it did work.

Then in a recent [Brodie Robertson video](https://youtu.be/jeY7xQ13v6I),
I learnt about the existence of [Dank Material Shell](https://github.com/AvengeMedia/DankMaterialShell).
It came with wonderfully simple
[installation instructions](https://danklinux.com/docs/dankmaterialshell/nixos) for NixOS.
I ran into some issues when running `dms setup` after the installation to apply some standard
settings to Hyprland and [kitty](https://github.com/kovidgoyal/kitty) as I manage their
configs with nix, and so the files cannot be edited in place directly.
So I asked claude code to look into what the setup entails exactly and to apply that to my
nix config, and 5 minutes later my system looked much better than it ever had!

I had to adjust some minor things, the button for the keybind cheat sheet had to be changed
as the German keyboard layout doesn't have a `/` key, I still needed to adjust the hotkey
for locking my display, and I had to disable the sound when my laptop starts or stops
charging as it is configured to stop charging around the 90% battery mark so the alert
would constantly trigger.
But the rest Just Worked.
I now have a notification history and actually nice quick access controls for things.
I can see my CPU and memory usage at a glance, always, and have quick access to a process
manager.

Now, do I need any of these things?
No, which is also why I never ended up putting in the effort of setting them up myself.
But now I just get them with 5 minutes of work, and it is legitimately really nice.
Thanks, Dank Shell and others who make custom window manager setups so much simpler
and approachable!

