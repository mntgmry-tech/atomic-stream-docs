---
title: Stream Catalog
description: x402 stream endpoints, pricing, and required inputs.
---

# Stream Catalog

All paths are versioned. Use `<version>` to choose `v2` (current) or `v1` (legacy).

## Common connection flow

1. `GET /<version>/schema/stream/<id>` (paywalled)
2. Extract `websocketEndpoint` from the JSON response
3. Connect to the WebSocket URL (includes `?t=<token>`)

## Common input parameters

Optional WebSocket query param for output format:

```
wss://x402.atomicstream.net/<version>/stream/mempool-sniff?t=<token>&format=enhanced
```

Optional `setOptions` message (controls output shape):

```json
{
  "op": "setOptions",
  "eventFormat": "enhanced",
  "includeAccounts": true,
  "includeTokenBalanceChanges": true,
  "includeLogs": false,
  "includeInstructions": false,
  "filterTokenBalances": false
}
```

Optional `setMints` message (used when `filterTokenBalances` is `true`):

```json
{
  "op": "setMints",
  "mints": ["EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"]
}
```

## Output examples

Raw transaction event:

```json
{
  "type": "transaction",
  "commitment": "processed",
  "slot": 226543210,
  "signature": "5dN1j2x...ZyX",
  "isVote": false,
  "index": 12,
  "err": null,
  "accounts": [
    "9xQeWvG816bUx9EPfQtuLXBb5y6Cq9M6g6C3CbV5F7RX",
    "So11111111111111111111111111111111111111112"
  ],
  "tokenBalanceChanges": [
    {
      "account": "9xQeWvG816bUx9EPfQtuLXBb5y6Cq9M6g6C3CbV5F7RX",
      "mint": "So11111111111111111111111111111111111111112",
      "owner": "F3s7q9Z6aC7A7G1mQJfYpZ2j8R8C2t2xqGk9nW2t4cVw",
      "decimals": 9,
      "preAmount": "1500000000",
      "preAmountUi": "1.5",
      "postAmount": "1200000000",
      "postAmountUi": "1.2",
      "delta": "-300000000",
      "deltaUi": "-0.3"
    }
  ],
  "logs": ["Program log: Instruction: Transfer"],
  "computeUnitsConsumed": 18234
}
```

Enhanced transaction event:

```json
{
  "type": "transaction",
  "commitment": "confirmed",
  "slot": 226543200,
  "signature": "4F2s9pB...1xQ",
  "timestamp": 1719856492,
  "isVote": false,
  "index": 3,
  "err": null,
  "fee": 5000,
  "feePayer": "F3s7q9Z6aC7A7G1mQJfYpZ2j8R8C2t2xqGk9nW2t4cVw",
  "accounts": [
    "F3s7q9Z6aC7A7G1mQJfYpZ2j8R8C2t2xqGk9nW2t4cVw",
    "So11111111111111111111111111111111111111112"
  ],
  "nativeTransfers": [
    {
      "fromUserAccount": "F3s7q9Z6aC7A7G1mQJfYpZ2j8R8C2t2xqGk9nW2t4cVw",
      "toUserAccount": "9xQeWvG816bUx9EPfQtuLXBb5y6Cq9M6g6C3CbV5F7RX",
      "amount": 1000000
    }
  ],
  "tokenTransfers": [
    {
      "fromTokenAccount": "8qkGf5...pZq",
      "toTokenAccount": "5nY8h2...kLm",
      "fromUserAccount": "F3s7q9Z6aC7A7G1mQJfYpZ2j8R8C2t2xqGk9nW2t4cVw",
      "toUserAccount": "9xQeWvG816bUx9EPfQtuLXBb5y6Cq9M6g6C3CbV5F7RX",
      "tokenAmount": 12.34,
      "mint": "So11111111111111111111111111111111111111112",
      "tokenStandard": "spl"
    }
  ],
  "accountData": [
    {
      "account": "9xQeWvG816bUx9EPfQtuLXBb5y6Cq9M6g6C3CbV5F7RX",
      "nativeBalanceChange": -5000,
      "tokenBalanceChanges": [
        {
          "userAccount": "9xQeWvG816bUx9EPfQtuLXBb5y6Cq9M6g6C3CbV5F7RX",
          "tokenAccount": "8qkGf5...pZq",
          "rawTokenAmount": { "tokenAmount": "1230000", "decimals": 6 },
          "mint": "So11111111111111111111111111111111111111112"
        }
      ]
    }
  ],
  "instructions": [
    {
      "programId": "11111111111111111111111111111111",
      "accounts": ["F3s7q9Z6aC7A7G1mQJfYpZ2j8R8C2t2xqGk9nW2t4cVw"],
      "data": "3Bxs5s7g",
      "innerInstructions": [
        {
          "programId": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          "accounts": ["8qkGf5...pZq", "5nY8h2...kLm"],
          "data": "4S1aZQ"
        }
      ]
    }
  ],
  "computeUnitsConsumed": 18234,
  "logs": ["Program log: Instruction: Transfer"]
}
```

Account event:

```json
{
  "type": "account",
  "stream": "wallet-balance",
  "pubkey": "4vJ9JU1bJJE96FWSJKvHsmmFADCg4gpZQff4P3bkLKi",
  "owner": "11111111111111111111111111111111",
  "lamports": "123456789",
  "executable": false,
  "rentEpoch": "0",
  "data": "AQIDBA==",
  "dataEncoding": "base64",
  "writeVersion": "1",
  "slot": 392892992,
  "txnSignature": "3L3RY5sT8K4kyEnqhizwaqxLEbcYvpGrGPNEYRwtbCSUtL6YL86jdrvCbohnP5q8VxQ3qzGmt3W3iQJW97rD7m3"
}
```

Ticker event:

```json
{
  "type": "ticker",
  "baseMint": "8qbHbw2BbbTHBW1sbeqakYXVKRQM8Ne7pLK7m6CVfeR",
  "quoteMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  "price": 0.025,
  "dex": "raydium",
  "slot": 392892992,
  "signature": "3L3RY5sT8K4kyEnqhizwaqxLEbcYvpGrGPNEYRwtbCSUtL6YL86jdrvCbohnP5q8VxQ3qzGmt3W3iQJW97rD7m3"
}
```

Leaderboard event:

```json
{
  "type": "leaderboard",
  "windowSeconds": 60,
  "intervalSeconds": 5,
  "asOf": "2026-01-12T08:30:00.000Z",
  "items": [
    {"mint": "8qbHbw2BbbTHBW1sbeqakYXVKRQM8Ne7pLK7m6CVfeR", "volumeUsd": 125000.55},
    {"mint": "CktRuQ2mttgRGkXJtyksdKHjUdc2C4TgDzyB98oEzy8", "volumeUsd": 84210.12}
  ]
}
```

Slot event:

```json
{
  "type": "slot",
  "stream": "infrastructure-pulse",
  "slot": 392892992,
  "parent": 392892991,
  "status": "SLOT_PROCESSED",
  "tps": 4125.4,
  "samplePeriodSeconds": 1,
  "sampleTransactions": 4125,
  "sampleSlots": 1,
  "sampleSlot": 392892992
}
```

## Streams

### mempool-sniff

Name: Mempool Transaction Stream

Description: Processed transactions that touch specified accounts or programs before finalization.

Endpoint path: `/<version>/stream/mempool-sniff`

Schema path: `/<version>/schema/stream/mempool-sniff`

Pricing: $0.60 per minute; $3.00 per 5-minute slice.

Input parameters:
- Required (non-empty):
  - `setAccounts` (watch accounts)
  - or `setPrograms` (watch program IDs)
- Optional: `setOptions`, `setMints` (see common input parameters)

Output format: Transaction event (raw by default; enhanced if `eventFormat=enhanced`).

### sniper-feed

Name: New Pool Early Swaps

Description: First swaps in newly created pools (up to 10 per pool, processed).

Endpoint path: `/<version>/stream/sniper-feed`

Schema path: `/<version>/schema/stream/sniper-feed`

Pricing: $0.60 per minute; $3.00 per 5-minute slice.

Input parameters:
- No required parameters.
- Optional: `setOptions`, `setMints` (see common input parameters).

Output format: Transaction event (processed only; raw by default).

### new-mints

Name: New Token Mint Feed

Description: Transactions that initialize new SPL or Token-2022 mints.

Endpoint path: `/<version>/stream/new-mints`

Schema path: `/<version>/schema/stream/new-mints`

Pricing: $0.30 per minute; $1.50 per 5-minute slice.

Input parameters:
- No required parameters.
- Optional: `setOptions`, `setMints` (see common input parameters).

Output format: Transaction event (raw by default; enhanced if `eventFormat=enhanced`).

### rug-detection

Name: Rug Risk Alerts

Description: Token authority revocations and deployer-initiated burns (rug-risk signals).

Endpoint path: `/<version>/stream/rug-detection`

Schema path: `/<version>/schema/stream/rug-detection`

Pricing: $0.60 per minute; $3.00 per 5-minute slice.

Input parameters:
- No required parameters.
- Optional: `setOptions`, `setMints` (see common input parameters).

Output format: Transaction event (raw by default; enhanced if `eventFormat=enhanced`).

### smart-money

Name: Wallet Activity Watchlist

Description: Transactions signed by wallets on your watchlist.

Endpoint path: `/<version>/stream/smart-money`

Schema path: `/<version>/schema/stream/smart-money`

Pricing: $0.12 per minute; $0.60 per 5-minute slice.

Input parameters:
- Required (non-empty):
  - `setAccounts` (wallets to watch)
- Optional: `setOptions`, `setMints` (see common input parameters).

Output format: Transaction event (raw by default; enhanced if `eventFormat=enhanced`).

### whale-alert

Name: Large Transfer Alerts

Description: SOL and token transfers valued in USD above the configured threshold.

Endpoint path: `/<version>/stream/whale-alert`

Schema path: `/<version>/schema/stream/whale-alert`

Pricing: $0.12 per minute; $0.60 per 5-minute slice.

Input parameters:
- No required parameters.
- Optional: `setOptions`, `setMints` (see common input parameters).

Output format: Transaction event (raw by default; enhanced if `eventFormat=enhanced`).

### wallet-balance

Name: Wallet Balance Updates

Description: Account updates for a wallet's SOL account and SPL/Token-2022 token accounts.

Endpoint path: `/<version>/stream/wallet-balance`

Schema path: `/<version>/schema/stream/wallet-balance`

Pricing: $0.03 per minute; $0.15 per 5-minute slice.

Input parameters:
- Required (non-empty):
  - `setAccounts` (wallets to watch)
- Optional: none.

Output format: Account event (base64 data encoding).

### token-ticker

Name: DEX Price Ticks

Description: Real-time price ticks for base/quote pairs derived from on-chain swaps.

Endpoint path: `/<version>/stream/token-ticker`

Schema path: `/<version>/schema/stream/token-ticker`

Pricing: $0.03 per minute; $0.15 per 5-minute slice.

Input parameters:
- No required parameters.
- Optional: none.

Output format: Ticker event.

### liquidity-changes

Name: Liquidity Change Stream

Description: Add/remove liquidity transactions for a specified pool.

Endpoint path: `/<version>/stream/liquidity-changes`

Schema path: `/<version>/schema/stream/liquidity-changes`

Pricing: $0.12 per minute; $0.60 per 5-minute slice.

Input parameters:
- Required (exactly one pool per session):
  - `setAccounts` (pool id)
- Optional: `setOptions`, `setMints` (see common input parameters).

Output format: Transaction event (raw by default; enhanced if `eventFormat=enhanced`).

### market-depth

Name: Pool Vault Updates

Description: Account updates for base/quote vaults of specified pools.

Endpoint path: `/<version>/stream/market-depth`

Schema path: `/<version>/schema/stream/market-depth`

Pricing: $0.12 per minute; $0.60 per 5-minute slice.

Input parameters:
- Required (non-empty):
  - `setAccounts` (pool ids)
- Optional: none.

Output format: Account event (base64 data encoding).

### trending-leaderboard

Name: Trending Tokens Leaderboard

Description: Rolling 60-second top tokens by USD volume (updates every 5s).

Endpoint path: `/<version>/stream/trending-leaderboard`

Schema path: `/<version>/schema/stream/trending-leaderboard`

Pricing: $0.03 per minute; $0.15 per 5-minute slice.

Input parameters:
- No required parameters.
- Optional: none.

Output format: Leaderboard event.

### program-logs

Name: Program Log Stream

Description: Transactions touching specified program IDs with logs included.

Endpoint path: `/<version>/stream/program-logs`

Schema path: `/<version>/schema/stream/program-logs`

Pricing: $0.03 per minute; $0.15 per 5-minute slice.

Input parameters:
- Required (non-empty):
  - `setAccounts` (program ids)
- Optional: `setOptions`, `setMints` (see common input parameters). Logs are always included.

Output format: Transaction event (raw by default) with `logs`.

### program-errors

Name: Program Error Stream

Description: Failed transactions touching specified program IDs.

Endpoint path: `/<version>/stream/program-errors`

Schema path: `/<version>/schema/stream/program-errors`

Pricing: $0.03 per minute; $0.15 per 5-minute slice.

Input parameters:
- Required (non-empty):
  - `setPrograms` (program ids)
- Optional: `setOptions`, `setMints` (see common input parameters).

Output format: Transaction event (raw by default) with `err` set.

### infrastructure-pulse

Name: Network Pulse

Description: Slot status updates with TPS samples from RPC performance metrics.

Endpoint path: `/<version>/stream/infrastructure-pulse`

Schema path: `/<version>/schema/stream/infrastructure-pulse`

Pricing: $0.006 per minute; $0.03 per 5-minute slice.

Input parameters:
- No required parameters.
- Optional: none.

Output format: Slot event.

### account-data

Name: Account Data Stream

Description: Account change notifications with pubkey, owner, slot, and encoded data.

Endpoint path: `/<version>/stream/account-data`

Schema path: `/<version>/schema/stream/account-data`

Pricing: $0.03 per minute; $0.15 per 5-minute slice.

Input parameters:
- Required (non-empty):
  - `setAccounts` (accounts to watch)
- Optional WebSocket query param for data encoding:
  - `encoding=hex` or `encoding=base64` (default is base64)

Output format: Account event (encoding controlled by `encoding` query param).

### token2022-extensions

Name: Token-2022 Extension Events

Description: Token-2022 extension instructions (transfer fees, interest, hooks, etc.).

Endpoint path: `/<version>/stream/token2022-extensions`

Schema path: `/<version>/schema/stream/token2022-extensions`

Pricing: $0.12 per minute; $0.60 per 5-minute slice.

Input parameters:
- No required parameters.
- Optional: `setOptions`, `setMints` (see common input parameters).

Output format: Transaction event (raw by default; enhanced if `eventFormat=enhanced`).
