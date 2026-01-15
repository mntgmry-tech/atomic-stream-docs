---
title: Client Example
description: AtomicStream x402 TypeScript client reference.
---

# Client Example

The official example client is available here:

`https://github.com/mntgmry-tech/atomic-stream-examples`

It demonstrates:

- x402 HTTP payment flow for schema and renew
- WebSocket connection and control messages
- Renewal handling (`http` and `inband` modes)
- Structured logging for events and status

## Key scripts

```bash
npm run dev
npm run build
npm start
```

## Environment variables

The example uses these variables (full list in `.env.example`):

- `SVM_PRIVATE_KEY` (required)
- `PUBLIC_HTTP_BASE_URL` (default `https://x402.atomicstream.net`)
- `X402_SCHEMA_PATH` (default `/v1/schema/stream/mempool-sniff`)
- `RENEW_METHOD` (`http` or `inband`)
- `WATCH_ACCOUNTS`, `WATCH_PROGRAMS`
- `EVENT_FORMAT`, `INCLUDE_ACCOUNTS`, `INCLUDE_TOKEN_BALANCE_CHANGES`
- `INCLUDE_LOGS`, `INCLUDE_INSTRUCTIONS`, `FILTER_TOKEN_BALANCES`

## Keypair conversion helper

If you have a Solana CLI keypair file:

```bash
npm run keypair-to-base58 -- ~/.config/solana/id.json
```
