---
title: Connection Flow
description: Step-by-step flow from schema request to active WebSocket session.
---

# Connection Flow

This is the canonical flow used by the example client.

## 1) Request the schema (paywalled)

`GET /v1/schema/stream/<id>` returns HTTP 402 until you provide a valid x402 payment.

After payment, the response includes a tokenized WebSocket URL.

## 2) Open the WebSocket

Connect to the `websocketEndpoint` returned by the schema response. The URL already includes the session token:

```
wss://x402.atomicstream.net/v1/stream/<id>?t=<token>
```

## 3) Configure the stream

Send control messages to set watchlists and output options.

```json
{"op":"setOptions","eventFormat":"enhanced","includeAccounts":true,"includeTokenBalanceChanges":true,"includeLogs":false,"includeInstructions":false,"filterTokenBalances":false}
```

```json
{"op":"setAccounts","accounts":["4vJ9JU1bJJE96FWSJKvHsmmFADCg4gpZQff4P3bkLKi"]}
```

```json
{"op":"setPrograms","programs":["675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8"]}
```

## 4) Handle renewals

Sessions emit renewal hints before expiration. The HTTP renewal flow is:

1. `POST /v1/renew/stream/<id>` with body `{"token":"<old-token>"}`
2. Receive a new token in the JSON response
3. Send `{"op":"renew_token","token":"<new-token>"}` over the WebSocket

## Optional: in-band renewals

If you use in-band renewals, send:

```json
{
  "op": "renew_inband",
  "paymentRequirements": {"...": "..."},
  "paymentPayload": {"...": "..."}
}
```

The example client supports both `http` and `inband` renewal modes via `RENEW_METHOD`.
