# 🔐 Authentication – Forgot Password Flow

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

---

# 📌 Overview

This document defines the complete Forgot Password flow.

Design Goals:

* Prevent email enumeration
* Prevent token abuse
* Isolate reset logic from login flow
* Avoid unnecessary API calls
* Maintain backend authority for security
* Improve UX without compromising security

This flow is independent from active authentication state.

---

# 1️⃣ Entry Conditions

User:

* Clicks **Forgot Password**
  OR
* Navigates manually to `/forgot-password`

User does **not** need to be authenticated.

If user is already authenticated:

* Optional: redirect to dashboard.

---

# 2️⃣ Page 1 – Request Reset Email

## Route

```
/forgot-password
```

---

## UI Requirements

### Input Field

* Email (required)
* Must be valid email format
* Trim whitespace
* Normalize to lowercase before sending

---

### Button

**Send Reset Link**

* Disabled until valid email format
* Shows loading spinner on submit
* Prevents duplicate submission

---

### Informational Text (Important)

> If your account is registered, you will receive an email with instructions to reset your password.

This prevents email enumeration.

---

### Link

**Create New Account**
→ Redirect to `/register`

---

# 3️⃣ Primary Use Case – Request Reset Link

## Use Case ID

UC-FP-01

---

## Main Flow

1. User enters email
2. User clicks Send Reset Link
3. Frontend validates format
4. API request sent:

```
POST /auth/forgot-password
```

Body:

```json
{
  "email": "user@example.com"
}
```

---

## Backend Logic

Backend must:

1. Normalize email
2. Check if user exists
3. Check if account is verified
4. If valid:

   * Generate password reset token (JWT)
   * Token must:

     * Be short-lived (15–30 minutes)
     * Be purpose-scoped (`password_reset`)
   * Store hashed token in DB
   * Mark as unused
   * Send email with reset link
5. If not valid:

   * DO NOTHING (silent fail)

---

## Response (Always Same)

```json
{
  "message": "If your account is registered, you will receive an email."
}
```

Always return HTTP 200 unless request is malformed.

---

# 4️⃣ Rate Limiting Strategy

Two layers of protection:

### Layer 1 – Global API Rate Limit

Protects entire API.

### Layer 2 – Email-Specific Lock

Per-email restrictions:

* Maximum 3 reset attempts
* Lock duration (e.g., 15 minutes)
* Counter resets after expiration

This is independent from login rate limits.

Purpose:

* Prevent email spam
* Prevent abuse
* Protect system from reset flooding

---

# 5️⃣ Email Reset Link

Example link:

```
https://yourapp.com/reset-password?token=JWT_TOKEN
```

Token Requirements:

* Short-lived (15–30 minutes)
* Single-use
* Purpose-scoped (`password_reset`)
* Signed securely
* Stored hashed in DB

---

# 6️⃣ Page 2 – Reset Password

## Route

```
/reset-password?token=...
```

---

## Token Handling Strategy

Frontend does NOT own security authority.

Frontend may:

* Decode JWT
* Check expiration (`exp`)
* Improve UX by showing early expiration message

Frontend must NOT:

* Trust token validity
* Attempt signature verification
* Enforce access control

All security validation is handled by backend.

---

## UI Requirements

### Input Fields

* New Password (required)
* Confirm Password (required)

Password Requirements:

* Minimum length (define, e.g., 8+ characters)
* Strength validation (optional but recommended)
* Must match confirmation

---

### Button

**Update Password**

* Disabled until validation passes
* Shows loading spinner on submit
* Prevents duplicate submission

---

# 7️⃣ Primary Use Case – Reset Password

## Use Case ID

UC-FP-02

---

## Main Flow

1. User clicks reset link in email
2. Page loads with `token` in URL
3. Frontend decodes token for expiration check (UX only)
4. If expired → show expired message
5. If valid-looking → show form
6. User enters new password
7. User clicks Update Password
8. API request sent:

```
POST /auth/reset-password
```

Body:

```json
{
  "token": "JWT_TOKEN",
  "newPassword": "StrongPassword123"
}
```

---

## Backend Validation (Authoritative)

Backend must:

1. Verify JWT signature
2. Verify expiration
3. Verify purpose == `password_reset`
4. Verify token exists in DB
5. Verify token not already used
6. Hash new password
7. Update user password
8. Mark token as used
9. Invalidate all active refresh tokens (recommended)

---

## Success Response

```json
{
  "message": "Password updated successfully."
}
```

Frontend behavior:

* Show success message
* Redirect to `/login`

---

# 🔁 Alternative Flows

---

## A1 – Missing Token

Frontend:

* Show invalid link message
* Provide link back to `/forgot-password`

---

## A2 – Expired Token (Frontend Decode)

Frontend:

* Show:

  > "This reset link has expired."
* Provide button to request new link

---

## A3 – Invalid / Tampered Token

Backend returns 400:

> "Invalid or expired reset link."

Frontend:

* Show generic invalid message

Do not differentiate expired vs invalid.

---

## A4 – Token Already Used

Backend returns generic invalid/expired message.

---

## A5 – Weak Password

Backend returns 400 with validation error.

---

# 8️⃣ Security Best Practices

✔ Do not reveal whether email exists
✔ Use short-lived reset tokens
✔ Store hashed token in DB
✔ Single-use tokens only
✔ Purpose-scoped JWT
✔ Separate email rate limiting
✔ Invalidate all sessions after password change
✔ Log suspicious reset attempts
✔ Never trust frontend validation

---

# 9️⃣ Architecture Decisions

### Why No `/validate-reset-token` Endpoint?

Token verification already happens during:

```
POST /auth/reset-password
```

Adding a validation endpoint would:

* Add extra API call
* Not increase security
* Duplicate logic

Frontend decoding is used only for UX improvement.

Backend remains sole authority.

---

# 🔟 Flow Summary

1. User requests reset
2. Backend silently handles existence
3. Reset email sent if applicable
4. User opens link with token
5. Frontend optionally checks expiration (UX only)
6. User submits new password
7. Backend verifies token fully
8. Password updated
9. Sessions invalidated

---

# ✅ Final Notes

This design:

* Prevents enumeration
* Prevents token abuse
* Avoids unnecessary API calls
* Maintains strong security boundaries
* Keeps frontend lightweight
* Is scalable and independent from login flow
