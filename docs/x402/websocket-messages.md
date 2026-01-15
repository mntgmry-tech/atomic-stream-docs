---
title: WebSocket Messages
description: Control messages and events emitted by x402 streams.
---

# WebSocket Messages

## Outbound control messages

```json
{"op":"setOptions","eventFormat":"enhanced","includeAccounts":true,"includeTokenBalanceChanges":true,"includeLogs":false,"includeInstructions":false,"filterTokenBalances":false}
```

```json
{"op":"setAccounts","accounts":["<pubkey>"]}
```

```json
{"op":"setPrograms","programs":["<program-id>"]}
```

```json
{"op":"setMints","mints":["<mint>"]}
```

```json
{"op":"getState"}
```

```json
{"op":"ping"}
```

```json
{"op":"renew_token","token":"<new-token>"}
```

```json
{"op":"renew_inband","paymentRequirements":{ "...": "..." },"paymentPayload":{ "...": "..." }}
```

## Inbound x402 lifecycle events

```json
{"op":"hello","clientId":"...","expiresAt":"...","sliceSeconds":300}
```

```json
{"op":"renewal_reminder","expiresAt":"...","msUntilExpiry":30000,"renew":{"http":{"endpoint":"...","method":"POST","priceHint":"..."},"inband":{"challengeEndpoint":"...","method":"POST","priceHint":"..."}}}
```

```json
{"op":"payment_required","reason":"expired","renew":{"http":{"endpoint":"...","method":"POST","priceHint":"..."},"inband":{"challengeEndpoint":"...","method":"POST","priceHint":"..."}}}
```

```json
{"op":"renewed","expiresAt":"...","method":"http"}
```

```json
{"op":"error","message":"..."}
```

## Data events

Status:

```json
{
  "type": "status",
  "clientId": "...",
  "now": "...",
  "grpcConnected": true,
  "nodeHealthy": true,
  "processedHeadSlot": 0,
  "confirmedHeadSlot": 0,
  "watchedAccounts": 0,
  "watchedMints": 0
}
```

Transaction events are emitted as `raw` or `enhanced` formats based on `eventFormat`. See the stream catalog for examples.

Account:

```json
{
  "type": "account",
  "stream": "account-data",
  "pubkey": "...",
  "owner": "...",
  "lamports": "...",
  "data": "...",
  "dataEncoding": "base64",
  "slot": 0
}
```

Slot:

```json
{
  "type": "slot",
  "stream": "infrastructure-pulse",
  "slot": 0,
  "parent": 0,
  "status": "SLOT_PROCESSED"
}
```

Ticker:

```json
{
  "type": "ticker",
  "baseMint": "...",
  "quoteMint": "...",
  "price": 0,
  "dex": "raydium",
  "slot": 0,
  "signature": "..."
}
```

Leaderboard:

```json
{
  "type": "leaderboard",
  "windowSeconds": 60,
  "intervalSeconds": 5,
  "asOf": "...",
  "items": [
    {"mint": "...", "volumeUsd": 0}
  ]
}
```
