# 🔐 Authentication – Registration Flow (Discord-Based)

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

This document defines the complete registration flow using Discord as the identity verification gateway.

Design Goals:

* Restrict account creation to verified Discord users
* Prevent duplicate accounts
* Enforce unique email addresses
* Use Discord ID as the permanent external identity
* Keep registration payload minimal
* Require email verification before activation
* Maintain strict backend authority

Registration is divided into three phases:

1. Discord Authentication
2. Account Completion
3. Email Verification

---

# 1️⃣ Phase 1 – Discord Authentication

## Entry

User:

* Clicks **Register**
  OR
* Navigates manually to `/register`

---

## Flow

1. Frontend redirects user to backend endpoint:

```text
GET /auth/discord
```

2. Backend initiates Discord OAuth flow.
3. User authenticates with Discord.
4. Discord redirects to backend callback.
5. Backend retrieves:

   * `discord_id` (primary identity)
   * `discord_username` (display convenience only)

---

## Backend Validation

Backend checks:

### If `discord_id` already exists:

* Redirect to `/login`
* Display message:

  > "Account already exists. Please log in."

### If `discord_id` does not exist:

* Generate short-lived **registration token** (JWT)
* Purpose-scoped: `registration`
* Expiration: 10–15 minutes
* Redirect to:

```text
/register/complete?token=REGISTRATION_TOKEN
```

---

# 2️⃣ Registration Token Handling

Frontend responsibilities:

* Extract `token` from URL
* Optionally decode JWT to:

  * Check expiration (UX only)
  * Display optional countdown (not required)

Frontend must NOT:

* Trust token validity
* Perform signature verification
* Enforce security rules

Backend performs authoritative validation on submit.

If token expires:

* Backend returns timeout response
* Frontend redirects user back to Discord authentication flow

---

# 3️⃣ Phase 2 – Account Completion

## Route

```text
/register/complete?token=...
```

---

## UI Fields

### Required Fields

* Email
* Username (auto-filled from Discord, editable)
* Password
* Confirm Password

### Hidden Data

* Discord ID (embedded inside registration token)

---

## Field Rules

### Email

* Required
* Must be valid format
* Must be unique (globally enforced)

### Username

* Pre-filled using Discord username
* User may modify
* Not used as primary identity

### Password

* Required
* Minimum length enforced
* Must match confirmation

---

## Submit Flow

```text
POST /auth/register
```

Body:

```json
{
  "token": "REGISTRATION_TOKEN",
  "email": "user@example.com",
  "username": "app_username",
  "password": "StrongPassword123"
}
```

---

## Backend Validation

Backend must:

1. Verify JWT signature
2. Verify token expiration
3. Verify purpose == `registration`
4. Verify token not previously used
5. Verify `discord_id` not already registered
6. Verify email is unique
7. Hash password
8. Create user with:

   * `discord_id`
   * `discord_username`
   * `email`
   * `username`
   * `password_hash`
   * `is_verified = false`
9. Generate email verification token
10. Send verification email

---

# 4️⃣ Phase 3 – Email Verification

Email verification follows same logic as Forgot Password:

* Short-lived token (15–30 minutes)
* Single-use
* Purpose-scoped: `email_verification`
* Stored hashed in database
* Rate limited per email

---

## Verification Endpoint

```text
POST /auth/verify-email
```

Token provided via URL:

```text
/verify-email?token=EMAIL_VERIFICATION_TOKEN
```

---

## Backend Behavior

1. Verify token signature
2. Verify expiration
3. Verify purpose
4. Mark user as verified
5. Invalidate verification token

---

## Success Behavior

Either:

* Auto-login user
  OR
* Redirect to `/login` with success message

---

# 🔁 Alternative Flows

### A1 – Discord OAuth Failure

Redirect to `/login` with error.

---

### A2 – Registration Token Expired

Backend returns error.
Frontend redirects back to `/register` (Discord auth restart).

---

### A3 – Email Already Exists

Return validation error.

---

### A4 – Weak Password

Return validation error.

---

### A5 – Token Tampering

Return generic invalid/expired message.

---

# 🔐 Security Requirements

* Use Discord ID as unique external identifier
* Never rely on Discord username for identity
* Registration token must be:

  * Short-lived
  * Single-use
  * Purpose-scoped
* Email must be unique
* Email verification required before activation
* Rate-limit email verification attempts
* All token verification handled server-side
* Frontend JWT decode allowed for UX only

---

# 🏗 Data Model (Minimal)

User Table:

* id (internal)
* discord_id (unique)
* discord_username
* email (unique)
* username (app display name)
* password_hash
* is_verified
* created_at

Profile Table (Future Extension – Separate):

* user_id (FK)
* additional profile fields

---

# 🎯 Architectural Decisions

### Why Discord ID as Identity?

* Permanent
* Unique
* Not user-changeable

### Why Separate Profile?

* Keeps registration minimal
* Allows schema evolution
* Prevents locking into unnecessary fields

### Why JWT Decode on Frontend?

* Improves UX
* Not relied upon for security
* Backend always performs authoritative validation

---

# ✅ Final Summary

* Discord controls identity entry point
* Backend owns all verification logic
* Email uniqueness enforced
* Registration token short-lived and scoped
* Profile separated for scalability
* System designed for extension and maintainability
