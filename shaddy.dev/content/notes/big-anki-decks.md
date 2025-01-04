+++
title = "Big Anki Decks"
date = 2025-12-14T15:45:08+01:00
description = "There are great Anki decks to learn more about the world -- you should try them!"
tags = [
"Anki", "SRS", "learning", "self-hosting"
]
+++

If you don't know [Anki](https://apps.ankiweb.net/),
a learning app for [flashcards](https://en.wikipedia.org/wiki/Flashcard)
and [spaced repetition](https://en.wikipedia.org/wiki/Spaced_repetition),
I recommend checking it out.
It's phenomenal for learning pieces of information -- facts,
vocabulary, lemmas, quotes.
I never got into Duolingo, but I am rather proud of my Anki streak,
which is slowly closing in on 3000.
But that is not the point of this post.
Instead, I will mostly just introduce some decks that may or may
not be useful to you and how to self-host an Anki sync server.

If you're familiar with Anki, you might have heard of the classic
[Ultimate Geography](https://github.com/anki-geo/ultimate-geography/) deck,
which is great for learning the countries of the world.
What are they called? Where are they located?
What are their capital cities? What do their flags look like?

There are plenty of decks for learning the states and cities
or even rivers and waters
in specific countries as well, though I will not touch on those.
Similarly, I won't mention any language learning decks.
You will likely already be familiar with using Anki for language learning
if that is your intention, so I will not mention any vocabulary decks.
Rather, I will present decks that could be interesting to many people
for general purposes.
Moreover, vocabulary decks often work better if they're more
optimised or even personalised for your own purposes.
Not that that doesn't apply here, but I don't think I'd ever learn
these things if I added the friction of adding my own cards here.

Another classic, though I never really got into it,
are [Great Works of Art](https://ankiweb.net/shared/info/184436527).

Not too long ago, I also came across [Ultimate Birds](https://ankiweb.net/shared/info/331539617).
Growing up, I always had more interest in computers than nature,
so while I know the most common birds in my area,
I never felt like I had a good understanding of what some birds look
like that you don't see in your garden all the time, but whose
names you came across often.  
The deck allows filtering to only learn the birds that are more
or less common in your country.
It's easy to adjust the cards to show the species names
in your local language, if available, or Latin if you prefer.
If you're particularly keen, you can also learn to recognise
the birds from sound, though that wasn't worth the effort to me.
I will still, even after going through the German birds once,
mix up all the different seagulls and their relatives and worse.

But OK, now we know the birds, but what about everything else?
Not to worry.
There exists [The Animal Deck](https://ankiweb.net/shared/info/934600214),
[The Plant Deck](https://ankiweb.net/shared/info/1824327532),
and [The Fungus Deck](https://ankiweb.net/shared/info/380167559).
They all allow filtering by country, though admittedly
they are a lot, and it can be odd to learn the name of some
algae next to a tree.
I'm keeping these to a trickle, learning no more than one new card
a day, and I'm not sure I'll ever get to the end in my lifetime.
And I'm certainly not investing enough effort to really know the plants
or be confident in correctly identifying them in the wild,
but I feel like there's already value in having heard of them,
and you can certainly take it more seriously if the topic interest you.
I suspect for a biology student, some of these decks can be worth a lot!

After adding all of these decks to my Anki collection,
I had the unfortunate realisation that there's a limit to the number
of notes that can be synced with the official Anki sync server.
It makes sense, it's a free public service.
But I'm too much of a data hoarder to delete cards from my collection,
even if I'm unlikely to ever use them myself.
The obvious solution, then, is to host my own sync server.

Unfortunately, while there is upstream [documentation](https://docs.ankiweb.net/sync-server.html)
about selfhosting, and they even provide convenient [Dockerfiles](https://github.com/ankitects/anki/tree/main/docs/syncserver)
and usage instructions, they do not provide a Docker image.
I have thus added their Dockerfile to my [containers repo](https://github.com/ShaddyDC/containers/tree/main/apps/anki-sync-server),
to build it and always keep it up to date with renovate.
A simple invocation to run it looks like this:

```
docker run -d \
  -e "SYNC_USER1=user:password" \
  -p 8080:8080 \
  -v anki-data:/anki_data \
  --name anki-sync \
  ghcr.io/shaddydc/anki-sync-server:latest
```

If you're self-hosting because you overran the public instance's size limit,
you may need to set the `MAX_SYNC_PAYLOAD_MEGS` environment variable.
Note also that by default, passwords will not be hashed,
and it will communicate with clients over HTTP.
For my purposes, I'm exposing it only inside my private [Tailscale](https://tailscale.com/)
network, so I'm confident that nobody else can access it, and password
security is less important.
For anything more, I'd recommend checking the documentation -- both the one
provided with my image, but also both the upstream documents I linked above.

It has been surprisingly painfree to use, with two caveats.
During initial setup, my server would often crash on me when uploading my collection.
I noticed that I needed to set a higher memory limit to accommodate the big data set.
Secondly, when adding a new client recently, the media sync would often randomly
fail during download.
It would still make some progress, however, so I simply restarted it a couple of times
until all data was transferred to the device.
This could also be an Ankidroid issue, or maybe connectivity.

All in all, self-hosting the server is surprisingly easy and may be worth it.
Then again, it's probably easier to simply not add anything and everything to your
collection.
Using the official sync server is easier still.
But really, the main takeaway from this whole post should be that you should be using Anki.
Look around, take a look at the [shared decks](https://ankiweb.net/shared/decks/),
see if anything interests you or you can maybe build (or even share!) your own decks.

