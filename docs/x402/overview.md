---
title: x402 Overview
description: Payment flow and base endpoints for AtomicStream x402 streams.
---

# x402 Overview

AtomicStream x402 streams use HTTP 402 Payment Required responses to create short-lived WebSocket sessions. The schema request returns a WebSocket URL with a token. Your client pays for the stream and then receives live JSON events over the socket.

## Base URLs

- HTTP: `https://x402.atomicstream.net`
- WebSocket: `wss://x402.atomicstream.net`

## Time slices and pricing

Pricing is listed per minute and per 5-minute slice. The session duration is provided in the `hello` message as `sliceSeconds`. Clients should read that value instead of assuming a fixed duration.

## Schema response shape

The schema response is JSON and includes the WebSocket endpoint and payment requirements. Values vary by stream and network.

Fields:

- `protocol` and `version`
- `websocketEndpoint` (tokenized session URL)
- `pricing` (`pricePerSecond`, `currency`, `estimatedDuration`)
- `paymentDetails` (`scheme`, `network`, `asset`, `payTo`, `maxAmountRequired`, `maxTimeoutSeconds`)
- `stream` (`id`, `title`, `description`)

Example (values are placeholders):

```json
{
  "protocol": "ws402",
  "version": "1",
  "websocketEndpoint": "wss://x402.atomicstream.net/v1/stream/<id>?t=<token>",
  "pricing": {
    "pricePerSecond": 0,
    "currency": "<currency>",
    "estimatedDuration": 0
  },
  "paymentDetails": {
    "scheme": "exact",
    "network": "<network>",
    "asset": "<asset>",
    "payTo": "<pay-to-address>",
    "maxAmountRequired": "<string>",
    "maxTimeoutSeconds": 0
  },
  "stream": {
    "id": "<id>",
    "title": "<title>",
    "description": "<description>"
  }
}
```

Use the `websocketEndpoint` from this response to open your stream session.
