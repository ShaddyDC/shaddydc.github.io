+++
title = "Kondo: shrinking your projects folder"
date = 2025-06-27T13:31:27+02:00
description = "Cleaning old dependencies and build artefacts"
tags = [
"kondo", "dev", "nix"
]
+++

As you gather more dev projects on your disk and keep recompiling stuff,
a lot of artefacts and dependencies tend to accumulate and take up disk space.
[Kondo](https://github.com/tbillington/kondo) is a useful tool to clean all
those in one fell swoop.
It can delete `node_modules` folders or rust `target` directories and more.
Just run it over your projects dir, ~~confirm everything~~ review what it finds,
and suddenly ~~you~~ I have a new 100gb of disk space!

If you're running nixos with [comma](https://github.com/nix-community/comma),
you don't even really need to install it to use it.

Run `, kondo ~/repos/` and you're good!
