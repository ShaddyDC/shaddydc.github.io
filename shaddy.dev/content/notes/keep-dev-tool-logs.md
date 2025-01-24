+++
title = "persistent browser dev tool logs"
date = 2025-04-07T10:43:43+02:00
description = "debugging beyond redirects and other pesky page changes"
tags = [
"web-dev", "debugging"
]
+++

i am not a web dev -- hell, i'm barely a backend dev.
but i still occasionally need to debug a website that is misbehaving (surprisingly often, in fact).
that is usually simple enough: open the dev tools and look at the console errors and web requests.
but sometimes, the website automatically redirects, eg to an error page, and your dev tools are
reset, all debug information is lost.
this generally makes sense so your dev tools capture the current page you actually care about
and not stuff from hours ago you long moved on from, but sometimes you just still need it.
this problem feels so common that actual web people HAVE to have solved it.

so today i looked into it and found out that there's a firefox feature called
[persistent logs](https://firefox-source-docs.mozilla.org/devtools-user/settings/index.html#common-preferences.)
tick it, and as the name says, your logs persist, and you can see what happened in what order to come
to the current state.
afaict chrome calls this feature [preserve log](https://developer.chrome.com/docs/devtools/console/reference#persist).

![](image.jpg)

(don't ask me why the settings panel is not below the cog on the right that opens it)

bonus tip:
you can have web requests displayed in the console tab via toggle next to the cog.
this can be useful when correlating errors or changes with certain web requests,
or simply for seeing the sequence of events.

