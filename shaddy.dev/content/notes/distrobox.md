---
title: "Useful tool: Distrobox"
date: 2024-11-27T14:25:12+01:00
description: Using docker containers as persistent, host-integrated environments with distrobox
---

The [distrobox](https://github.com/89luca89/distrobox) project, inspired by the similarly-named
[toolbox](https://github.com/containers/toolbox), is a tool to easily switch to different
environments like, as the name implies, different linux distros.
It wraps around [Podman](https://podman.io/) to effectively allow using your shell to arbitrary
docker images.
For example, if you're on debian and want to install something from the AUR, you can spin up an
arch container real quick.

The advantage over just spinning up a container in docker or podman directly is that, firstly,
the container is long-lived, so any software you install will persist, and you can repeatedly
enter and evolve one environment over a long time frame, potentially over month.
For example, you can have one environment with all the software for a specific project
that is incompatible with the environment of yet another project, each in a different container.

The second advantage is that it is more tightly integrated with the host.
If you're using podman directly, you can only access those directories you explicitly mount
into the container.
With distrobox, instead, you by default have full access to everything in your home directory,
with matching paths and permissions.
So, for example, your `.bashrc` will by default be applied (which admittedly can break things
in some configurations).

But you can also use it for things that aren't entire distro images.
If there's that one piece of software that is really annoying to install but that provides a
docker image, you can simply run that image and use its environment as if you had properly
installed the program.

I have also been using it to get software to run on NixOS that is otherwise annoying to get
to work.

