---
title: Stream Options
description: Watchlists, output format, and filtering options.
---

# Stream Options

## WebSocket query parameters

- `format=raw` or `format=enhanced` to choose output format at connect time.
- `encoding=hex` or `encoding=base64` for the `account-data` stream (default is base64).

Example:

```
wss://x402.atomicstream.net/v1/stream/account-data?t=<token>&encoding=hex
```

## setOptions

Controls the output shape for transaction streams.

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

## setMints

When `filterTokenBalances` is `true`, send `setMints` to specify which mints to include.

```json
{
  "op": "setMints",
  "mints": ["EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"]
}
```

## setAccounts and setPrograms

Use watchlists to scope streams that require inputs.

```json
{"op":"setAccounts","accounts":["4vJ9JU1bJJE96FWSJKvHsmmFADCg4gpZQff4P3bkLKi"]}
```

```json
{"op":"setPrograms","programs":["675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8"]}
```
