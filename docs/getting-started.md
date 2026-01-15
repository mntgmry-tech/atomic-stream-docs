---
title: Quickstart
description: Get streaming x402 data in minutes.
---

# Quickstart

This path uses the supported TypeScript client from the AtomicStream examples repo.

## Prerequisites

- Node.js 20+
- A Solana wallet with USDC (mainnet) and a small amount of SOL for fees
- A base58-encoded private key for that wallet

## Step 1: Clone and install

```bash
git clone https://github.com/mntgmry-tech/atomic-stream-examples
cd atomic-stream-examples
npm install
```

## Step 2: Configure environment

```bash
cp .env.example .env
```

Edit `.env` with your wallet key and stream selection:

```ini
SVM_PRIVATE_KEY=your_base58_private_key
X402_SCHEMA_PATH=/v2/schema/stream/mempool-sniff
WATCH_ACCOUNTS=4vJ9JU1bJJE96FWSJKvHsmmFADCg4gpZQff4P3bkLKi
```

Notes:
- `WATCH_ACCOUNTS` or `WATCH_PROGRAMS` is required for some streams.
- `X402_SCHEMA_PATH` chooses the stream (use `/v2/...` for current, `/v1/...` for legacy).

## Step 3: Run the client

```bash
npm run dev
```

Or build and run:

```bash
npm run build
npm start
```

## What you should see

The client logs a full connection flow:

- requesting x402 schema
- ws open
- setting options and watchlists
- streaming events and status updates

## Wallet key helper

If you have a Solana CLI keypair file (`[u8; 64]` JSON), convert it to base58:

```bash
npm run keypair-to-base58 -- ~/.config/solana/id.json
```

## Next steps

- Review the x402 connection flow: `/x402/connection-flow`
- Customize output options: `/x402/options`
- Choose a stream: `/streams/`
