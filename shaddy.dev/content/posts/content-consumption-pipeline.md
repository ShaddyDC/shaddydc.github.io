---
date: 2023-06-25
description: There's an overwhelming amount of information on the internet. I'll share my strategies for curating a personalised content stream and optimising your internet experience. We will touch on RSS servers and clients, read-it-later apps, note extraction, and how they fit together.
tag: Productivity, InformationManagement
title: "My Content Consumption Pipeline: Efficient Information Management"
---

Are you overwhelmed by the vast amount of content on the internet?
Do you struggle to decide what to read while drowning in a sea of information without even remembering what you've read before?
Or maybe you already know what you want to read by following a couple of places you know produce great content, but you're not sure how to keep track of them all?
It's so much work to check on all the things regularly, and so you forget and abandon?

Well, I've still got all of those problems, but I've developed some strategies for optimising my content consumption process.
Whether you're looking to curate a personalised stream of valuable highlights or to improve your overall internet browsing experience, maybe I can give you some ideas on how to deal with information overload.

I will go over how I extract content from sources and shove them into a centralised database, where I can pick what's interesting to me and move it into a dedicated reader, before finally pulling my highlights into my notes database.
Most of these components can be replaced with similar solutions, or they can be useful on their own while ignoring the rest.
Feel free to pick and choose what sounds interesting to you.
I'm hoping I can inspire a setup that can improve how you interface with the internet.

## Extracting Content

Let's start at the source.
There's a lot of stuff on the internet.
If you're anything like me, managing your information diet is something you care about.
In fact, I'm taking that premise for granted here, that you want information that provides value to your life.
Instead of following the whims of an algorithm that seeks to elicit emotion, you want a curated stream of highlights that are actually of use.
But how do you get that?
I guess you could curate your Twitter feed really well, and maybe you can follow one or two Reddit communities that are really interesting.
Or maybe you recently switched to [Mastodon](https://mastodon.social/) or [Lemmy](https://join-lemmy.org/).
But is there really no better solution?

It's really simple, actually.
You just have to make decisions about what sources you care about and want to know about, and then you just keep up with those.
To that end, there's an ancient technology called [RSS](https://en.wikipedia.org/wiki/RSS).
Really, maybe it sounds ancient, but it's actually still found in a surprising number of places.
If most of what you're reading and keeping up with is blogs, they probably support RSS.
Sometimes, it suffices to point your reader at the main URL,
sometimes, they have a visible link you can follow,
and sometimes, you have to check if maybe it is in the `/feed`, `/rss`, or `/atom.xml` endpoints.
This also goes for a surprising number of [news and other sites](https://github.com/plenaryapp/awesome-rss-feeds).
I often follow people on Substack, for example, where the `/feed` endpoint is [available](https://astralcodexten.substack.com/feed).

Maybe you get your articles mostly from other people.
Well, Reddit offers RSS feeds of subreddits according to this schema: `https://old.reddit.com/r/<subreddit>/.rss`.
Hackernews has both native RSS feeds and has other sites offering [more configuration](https://hnrss.github.io/) of your feeds.
Oh, somebody only offers a newsletter instead of a blog?
Doesn't matter, you can [kill it](https://kill-the-newsletter.com/).
Nevertheless, there's still many places that don't offer a proper feed you can subscribe to.
A large number of them, like Twitter, can still be feedified by using [RSS-Bridge](https://github.com/RSS-Bridge/rss-bridge).
Other people have already made more [comprehensive lists](https://gist.github.com/thefranke/63853a6f8c499dc97bc17838f6cedcc2) of all the places you can access with RSS.

If you don't like RSS because The Algorithm actually suggests you interesting content you care about and you don't want to sift through all your feeds yourself, maybe a feed reader with [your own algorithm](https://www.binwang.me/2022-10-29-RSS-Brain-Yet-Another-RSS-Reader-With-More-Features.html) may be an option for you?
I believe other weighting solutions also exist, but I've always been perfectly happy with a simple chronological feed.

But okay, now we've got all of our content, now we collect it into our local feed reader, right?

## The Feeds' Heart

There are many RSS readers, and I've tried a couple.
Some people are very happy just seeing feeds in their browser's home or [new tab](https://weboasis.app/) page.
That way, you don't try very hard to see everything, but you'll often happen to see something interesting over the course of your day.
If you like low-friction interaction and don't mind or even appreciate the distractions, maybe that's an option for you.
It's arguably better than browsing Reddit either way.
Maybe you're very happy with the functionality built into [Thunderbird](https://blog.thunderbird.net/2022/05/thunderbird-rss-feeds-guide-favorite-content-to-the-inbox/).
Maybe there's some mobile app you quite like that does the job.
All of that is fine, and I used to use a similarly simple app called [Aggregator](https://github.com/tughi/aggregator-android) myself.
However, eventually I switched my phone, and the migration was a bit painful.
It's easy to get a list of all subscribed feeds, but it's hard to keep track of all the articles that are read or aren't, especially if you keep more than a dozen unread items in a feed and don't want to lose any.
It was also annoying if I ever wanted to read something on my computer or another device.
So, I've been keeping an eye out for other options.

Turns out, there's a lot of online feed readers.
Basically, you have a server keep track of everything you're following, and you can interface with it over the internet from any device.
There's probably a great managed service out there that does all the hard work for you.
Maybe [Feedly](https://feedly.com/)?
I haven't really looked into it, because what I instead turned to was self-hosted solutions.

There's a lot of [options](https://github.com/awesome-selfhosted/awesome-selfhosted).
I think a popular one a friend looked into was [Miniflux](https://miniflux.app/).
For reasons I don't remember, I went with [FreshRSS](https://freshrss.org/) instead.
What's important, to me, is that the server supports a widely-used API such as the [Fever API](https://freshrss.github.io/FreshRSS/en/developers/06_Fever_API.html).
What this means is that, whatever server software you choose, you're not bound to a specific client app, and you can just treat it as a database for your feeds.
Sure, some servers have some very interesting features, such as using CSS selectors to fetch the whole article if it's otherwise not in the feed.
That may be very useful if you're worried about [link rot](https://gwern.net/archiving) and articles disappearing again before you get to read them, or you just hate the website's native interface and how it bugs you about subscribing every bloody time.
I honestly don't use anything but the basic functionality, besides reducing the update interval on websites where I follow a lot of different feeds to reduce the traffic.

But if we use the server just to be a database with an API, that brings us to the next puzzle piece: the actual RSS feed frontend.

## Feedreader

A great thing about using an RSS server is that you're not bound to a single app.
Switching and experimenting is very easy, as everything is synced on the server, and you can even use multiple apps at the same time.
That means you can focus on what you're really looking for in an app.
Maybe you just want a smooth full-screen reading experience.
Maybe you want efficient folder management and search options.
Maybe you want an integrated TTS reader.
Maybe, you just want a fast way to share articles into other apps.

FreshRSS lists some [compatible options](https://github.com/FreshRSS/FreshRSS#apis--native-apps).
I don't actually read much in my RSS reader, so I'm not very hung up about this part.
I will focus on Android, because that's what I use.
If I need quick access on my desktop, the web interface is usually sufficient.
I used to use [FeedMe](https://play.google.com/store/apps/details?id=com.seazon.feedme), but I switched away for a reason I don't remember.
Today, I'm on [FocusReader](https://play.google.com/store/apps/details?id=allen.town.focus.reader).
Be warned, the ads in the free version were obnoxious when I tried it.
I guess it worked in getting me to pay.
It's alright, I'm not unhappy, but I don't know if I'll stick with it in the long term.
It has a nice reading interface, but I don't really use it for reading.
It has a neat quick share feature, but it doesn't support the app I want to share to.
For now, I'm fine with it, because it gets the job done well enough.

But I keep saying I don't use the app for reading.
If not there, then where do I read?
And why?

## The read-it-later app

There is a whole class of apps for just this purpose.
You may have heard of [Readwise](https://readwise.io/), [Raindrop.io](https://raindrop.io/) or [Pocket](https://getpocket.com/).
But your feedreader is already a nice app that gives you everything you want to read in a nice interface while remembering what you've already read, so what's the point?
Other people have written [at length](https://fortelabs.com/blog/the-secret-power-of-read-it-later-apps/) about the topic.
(Interestingly enough, I found this article because it was preloaded in my read-it-later app.)
I will just quickly touch on a couple of reasons that matter to me personally.
Firstly, RSS feeds are great for content from sources you regularly keep up with.
But what about that random really interesting article you come across or that your friend linked you?
Are you gonna subscribe to the blog just to have it in your feed?
What if it's old or doesn't have a feed?
What if the site is riddled with ads?
Are you just gonna leave the tab open until you get to it or, more likely, forget about it?
Do you have time to read it right away?
If you use a read-it-later app, you can save it with a press of a button, and it will appear in pure text with consistent styling among all your other articles.

Then you can go into this app whenever you have a bit of free time to read one of your already precurated items.
And then, once you get to it, you can still decide whether that article about that [dead CEO in your head](https://www.experimental-history.com/p/help-theres-a-dead-ceo-in-my-head) is actually worth reading or not.
I often find myself wanting to save information for later that I ultimately don't actually care about, so this kind of acts as a second filter for what's truly worth my time.
(The article about the dead CEO was actually quite intriguing.)
The utility of this depends on how much content you have in the earlier parts of the pipeline.
Looking at the 50 daily feed items, I really should increase my threshold for Hackernews articles ...

The last advantage is that this kind of app is often even more optimised for reading than an RSS reader.
Sure, they pay attention to it too, but there is still features that they rarely feature.
What I really appreciate is the highlighting functionality, and the ability to export my notes.
Sure, it's nice to read, but it's even nicer if you make it easy for yourself to reengage with just the most crucial ideas you come across.
That the apps also often remember your exact reading position in the article is a nice plus.

The one I use myself is [Omnivore](https://omnivore.app/).
It's the new kid on the ~~blog~~ block and open source.
The Android app still has its problems, and adding a comment to a highlight often has both visually disappear, so I'm not sure how much I'd recommend it today, but for one reason or another, I wasn't completely happy with any of the alternatives either.
It's actively being worked on, however, and it gets the job done for me.
It makes it easy to capture articles both on the desktop and on my phone, and the reading interface is simple and works.
It breaks some kinds of embeds and some formatting in return, which sometimes can be confusing when it just manifests in missing context you don't see.
However, that's par for the course with this kind of app.
There are many options.
Look around and see if any speak to you.

## Knowledge Base

I mentioned in the last section that reading is only half the fun.
The second half is retaining and managing your takeaways, in what people generally refer as a [Personal Knowledge Management](https://en.wikipedia.org/wiki/Personal_knowledge_management) system.
Everybody talks about how they will Level Up your live, and how you're only half the person without them.
Just how can you possibly get anything done without it?
People have written about how they can serve as a [second brain](https://www.goodreads.com/en/book/show/59616977) (book review maybe?), or how you can take [smart notes](https://www.goodreads.com/book/show/34507927-how-to-take-smart-notes) with a [zettelkasten](https://en.wikipedia.org/wiki/Zettelkasten).
Ultimately, I believe they can provide you with a lot of value, but it requires some effort and system on your part, which I won't go into here.
Just make sure you strike a good balance in what you capture.
If you capture everything, you capture nothing.
You will never look at them again, and you will never dig up anything outstanding.
Good luck!

The classic solution is [Evernote](https://evernote.com/), although I hear the free version has also become obnoxious in its nagging to upgrade.
A contender is [OneNote](https://www.microsoft.com/en-us/microsoft-365/onenote/digital-note-taking-app), which has the advantage that it integrates well into the Windows ecosystem, if you use it.
There's of course also open source solutions like [Joplin](https://joplinapp.org/) or [Logseq](https://logseq.com/).
They all have their pros and cons.
Personally, I've been using [Obsidian](https://obsidian.md/).
While it's not open source, all my notes are in plain markdown, and the plugin ecosystem is great.
Whether you want to [create tables](https://github.com/blacksmithgu/obsidian-dataview) that automatically track your reading list or you want to manage your [Anki flashcards](https://github.com/Pseudonium/Obsidian_to_Anki) in your notes, it's got you covered.

Omnivore offer a [plugin](https://github.com/omnivore-app/obsidian-omnivore/) to export your highlights into Obsidian, though you can change it to e.g. export the entire article.
It has served me well.
Going back like once a week to glance over the most interesting bites from what I've read, while sorting them into the places where they are most likely to come in useful soon, is a fun exercise and allows for added reflection.
You often don't make up your mind about tough questions on the spot.
Well, you often don't do that in a couple of days either, but it does help.

## Honorable Mentions

The workflow I described above works well for many types of text, but there's other media that unfortunately doesn't fit as well.
While YouTube natively supports [RSS feeds](https://gist.github.com/thefranke/63853a6f8c499dc97bc17838f6cedcc2#youtube), videos are too different from most of the text I mainly consume, and they just don't fit into a read-it later app.
Moreover, I open YouTube at different times than when I want to read.
A video can be watched in the background while your cooking or enjoying your meal, whereas an article can use your full attention on the train.

I have a decent approach for consuming YouTube that may be useful to you even if none of the rest of this post speaks to you.
If a channel produces interesting content you want to keep up with, subscribe to it.
Don't enable the bell or anything, it doesn't matter here.
Maybe once a day, depending on your subscription feed density, go through all the videos the channels you follow have published and add them to the Watch Later playlist.
Then, whenever you actually want to watch anything, just always resume that playlist where you left off.
Every now and then, you can purge all the watched videos from it with the click of a button.
It works fairly well, and it makes it much easier to watch content that you think is interesting but that doesn't produce as much short-term dopamine.
Adding a video to the playlist is much simpler than deciding between it and that click-baity short.

I have noticed that a surprising number of the videos I add to Watch Later are deleted or privated by the time I'd actually get to watching them.
If this is something you care about, you may want to use something like [yt-dlp](https://github.com/yt-dlp/yt-dlp) to periodically back up all the videos in the playlist, and maybe also in your watch history.
I believe there exist more sophisticated solutions try to be a "Sonarr for YouTube", but I have never really looked into them.
Unfortunately, I don't have a strategy for taking notes and highlights.
It should be possible to do something based on transcripts, and there indubitably exist robust solutions, but on my phone and while I'm doing other work anyway, I just hope that some of it sticks and inspires future ideas.
If there's something extremely relevant, I can still take a note by hand.

Podcasts don't fit into my typical workflow for similar reasons.
I guess they have the advantage that your podcast app usually downloads them automatically, and they're naturally also based on decentralised RSS.
(Unless you're listening on Spotify, which would be a shame).
I don't have a great way to extract notes and highlights here either, but during the walks I listen to them on, I'm not sure how easy taking notes would be anyway.
There are options like [Snipd](https://www.snipd.com/) to allow easily extracting quotes, but unfortunately that feature is only available in English, and migration is again painful.
Maybe I need to manage my podcasts by some server software too ...

Another thing I haven't integrated into this pipeline is books.
As far as I know, Omnivore supports PDFs, but that's no fun to read on a phone because of the small screen.
Especially because I like to read before I go to sleep (nonfiction. I'm not getting any actual sleep when reading fiction), and ideally I'd do this without a backlit display.
That's why I've got an e-ink e-reader.
There's a couple options with the most well known probably being the Remarkable and the Amazon Scribe.
Personally, I went with an [Onyx Boox](https://onyxboox.com/) device, which has the perk of being a full-fledged Android device, so you can use whatever apps you use elsewhere.
That being said, I use their native app to read eBooks, mostly in EPUB format, which I load from my [Calibre library](https://calibre-ebook.com/) with [Calibre Sync](https://play.google.com/store/apps/details?id=com.trucnguyen.calibresync).
It has decent highlighting features, and a feature to export the highlights in plaintext.
Unfortunately, you lose some formatting along the way.
To integrate better into my Markdown knowledge base, I wrote a little [rust program](https://github.com/ShaddyDC/highlight-extract) to do a conversion for me.
Then, I can manage it with my other notes, highlight important points, and do whatever else I feel like.

## Closing Thoughts

This system has more or less organically grown with me.
I started with a simple feed reader when I realised the value in curating my content sources.
There were some people's writings that I wanted to keep up with, and RSS was an effective choice to manage and scale that to a major part of my life.
Next, I added the server when a simple app just stopped being enough for me, probably a few years later.
I've only very recently started maintaining a knowledge base and adding the read-it-later app.
At every point in this chain, it is completely natural to stop while reaping the benefit of all that comes before.
You don't need the knowledge base for the reading app to be useful,
but you also don't need the reading app to benefit from the server.
If the server is too much, just a simple RSS reader can go a long way.
See which of these components appeal to you, and see what you can implement without throwing overboard your entire existing workflow.
It's often easier to take things one step at a time.

A smaller benefit is better than no benefit because you were overwhelmed and gave up.
In particular, self-hosting your server is only advisable if you enjoy that sort of thing and know how to keep it secure and up-to-date.
After all, you don't want your server to DDOS Ukraine.
On the other hand, maybe you enjoy jumping into the deep end and trying everything at once.
Maybe you need to just turn everything around and act in the spirit of [blowing up your life](https://sashachapin.substack.com/p/in-praise-of-blowing-up-your-life).
I know this isn't at all comparable, and I'm not sure yet how much I agree with the concept, but you get the idea.
Maybe having just one large change instead of constantly having to make small adjustments appeals to you.
Do whatever works for you.

If you have got any interesting ideas or additions -- or anything, really -- feel free to let me know.
I'm always interested to hear more.
