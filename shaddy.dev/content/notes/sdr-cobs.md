+++
title = "Frame Synchronisation with COBS"
date = 2024-12-21T21:21:51+01:00
description = "How COBS makes packet framing reliable with minimal overhead"
tags = [
"podcasts", "packet framing"
]
+++

When sending messages as bits across the web, you need a way of deciding where one packet ends
and another begins.

> Consistent Overhead Byte Stuffing (COBS) is an algorithm for encoding data bytes that results in efficient, reliable, unambiguous packet framing regardless of packet content, thus making it easy for receiving applications to recover from malformed packets

See [Wikipedia](https://en.wikipedia.org/wiki/Consistent_Overhead_Byte_Stuffing),
or, less dry, the Self-Directed Research Podcast on [Frame Synchronization](https://sdr-podcast.com/episodes/frame-sync/).
This is not really a topic I ever think about or have worked on, but the podcast is always a great time.

