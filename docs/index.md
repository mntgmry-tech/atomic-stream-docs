---
layout: home
title: AtomicStream Docs
titleTemplate: false

hero:
  name: AtomicStream
  text: x402 Streams Documentation
  tagline: Real-time Solana data streams with pay-as-you-go x402 payments.
  actions:
    - theme: brand
      text: Get started
      link: /getting-started
    - theme: alt
      text: Streams catalog
      link: /streams/
    - theme: alt
      text: Client example (GitHub)
      link: https://github.com/mntgmry-tech/atomic-stream-examples

features:
  - title: Pay-as-you-go billing
    details: Pay only for the minutes you stream. Billing is enforced by x402 and exposed in session events.
  - title: Real-time Solana data
    details: WebSocket streams backed by a Yellowstone gRPC bridge connected to our validator.
  - title: Simple integration
    details: Fetch a schema, open a socket, send a watchlist, and receive JSON events.
---

## What is live

- x402 Streams are live at `https://x402.atomicstream.net`.
- Traditional API streams and WatchTower are not live yet. See the coming soon pages for status and scope.

## Start fast

1. Clone the example client from GitHub.
2. Set `SVM_PRIVATE_KEY` and choose a stream schema.
3. Run the client to open a paid WebSocket session.

[Go to Quickstart](/getting-started)
