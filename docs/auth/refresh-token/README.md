# 🔐 Authentication – Refresh Token Documentation

```md
================================================================================
Author: Skills Nwokolo Anthony  
Email: skillsnwokolo372@gmail.com
Role: System Design / Authentication Architecture  
Version: 1.0.0  
Last Updated: 2026-02-24  
Status: Stable  
================================================================================
```

## 📌 Overview

This document defines the Refresh Token flow used to silently renew access tokens when they expire.

Design Goals:

* Keep refresh token inaccessible to JavaScript (**HTTP-only cookie**)
* Rotate refresh tokens on every refresh request
* Avoid unnecessary logouts on access-token expiry
* Centralize refresh logic in the API wrapper (not scattered across components)
* Prevent refresh loops and request storms

---

## 1️⃣ Token Model

### Access Token

* Short-lived (e.g., 5–15 minutes)
* Used in `Authorization: Bearer <token>` header
* Stored in memory (recommended)

### Refresh Token

* Long-lived (e.g., days/weeks)
* Stored as **HTTP-only cookie**
* Not accessible to frontend JavaScript
* Rotated on every refresh request

---

## 2️⃣ Endpoint

```text
POST /auth/refresh
```

### Frontend Request

* No body required
* Must include cookies:

```text
credentials: "include"
```

### Backend Input

* Reads refresh token from HTTP-only cookie

---

## 3️⃣ Primary Use Case – Refresh Success

## Use Case ID

UC-REFRESH-01

### Main Flow

1. An API request fails with `401 Unauthorized` (expired/invalid access token)
2. API wrapper triggers refresh flow
3. Frontend calls:

```text
POST /auth/refresh
```

4. Backend:

   * Validates refresh token
   * Verifies token not expired/revoked
   * Applies rotation:

     * invalidates old refresh token (blacklist / token-family rotation)
     * issues new refresh token cookie
   * Issues a new access token
5. Backend returns:

```json
{
  "accessToken": "NEW_ACCESS_TOKEN"
}
```

6. Frontend:

   * Updates access token in memory
   * Replays the original request with the new access token
7. User stays logged in silently

---

## 4️⃣ Alternative Flows / Errors

### A1 – Missing Refresh Token Cookie

**Cause:** User not logged in, cookie cleared, or session expired
**Backend response:** `401`
**Frontend behavior:** log user out → redirect to `/login`

---

### A2 – Invalid / Expired / Revoked Refresh Token

**Cause:** token expired, blacklisted, or rotated already
**Backend response:** `401`
**Frontend behavior:** log user out → redirect to `/login`

---

### A3 – Network / Server Error

**Backend response:** `5xx` or no response
**Frontend behavior:** do NOT loop forever

* retry refresh limited times (e.g., max 1 refresh attempt per request cycle)
* if still failing: show “Session expired” or log out (team choice)

---

## 5️⃣ Security Requirements (Backend)

Backend must enforce:

* **Refresh token rotation** on every refresh
* **Single-use refresh tokens**
* Store refresh tokens securely (hashed if stored)
* Detect reuse:

  * If a refresh token is reused after rotation → revoke the entire session/token family (recommended)
* Set cookie flags:

  * `HttpOnly`
  * `Secure` (required in production)
  * `SameSite` (`Lax` or `Strict`; `None` only if cross-site is needed + must be Secure)
* Optional: bind refresh tokens to device/session metadata (IP/UA heuristics)

---

## 6️⃣ Frontend Responsibilities

Frontend must:

* Never access refresh token directly
* Store access token in memory (recommended)
* Trigger refresh only through a centralized API wrapper
* Avoid calling refresh from components directly
* Avoid infinite refresh loops

---

## 7️⃣ Refresh Trigger Rules

### When to Trigger Refresh

* Only when an authenticated request returns `401`

### When NOT to Trigger Refresh

* If the failing request is itself `/auth/refresh`
* If the user is already logged out
* If refresh already failed recently for this request cycle

---

## 8️⃣ Retry Policy

To avoid loops / storms:

* Only allow **one refresh in-flight at a time**
* Queue other failing requests until refresh completes
* Retry the original request after refresh success
* If refresh fails → reject queued requests and log out

Retry count guidance:

* Refresh endpoint retries: **0–1**
* Replay original request: **1**
  Reason: if refresh fails, repeating it multiple times rarely helps and can worsen rate limiting.

(feel free to apply retry to the original request replay only, not refresh itself.)

---

## 9️⃣ Recommended Status Codes

| Code | Meaning                 | Frontend action                  |
| ---- | ----------------------- | -------------------------------- |
| 200  | refresh success         | update access + replay           |
| 401  | refresh invalid/expired | logout                           |
| 429  | rate limited            | show message or logout           |
| 5xx  | server issue            | stop loop, optionally retry once |

---

## 10️⃣ Summary

* Refresh token stays in **HTTP-only cookie**
* `/auth/refresh` rotates refresh token + returns new access token
* API wrapper triggers refresh on `401`
* Single refresh in-flight; queue requests
* If refresh fails → logout

---

## Implementation Notes

This document intentionally avoids prescribing a specific React implementation.

For implementation guidance, contact the author/maintainer of the auth layer.
