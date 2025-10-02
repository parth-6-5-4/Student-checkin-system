# Backend - Student Check-In API

## Setup

1. Copy environment file and fill your MongoDB connection string:
   ```bash
   cp .env.example .env
   # edit .env and set MONGODB_URI
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run in development with Nodemon:
   ```bash
   npm run dev
   ```

The server listens on `PORT` (default 3000).

## Endpoints

- POST `/students`
  - Body: `{ "name": string, "email": string, "studentId": string }`
  - 201 Created, 409 on duplicate `email` or `studentId`.

- GET `/students`
  - 200 OK: list of students

- POST `/checkin`
  - Body: `{ "studentId": string }`
  - Server sets the `timestamp` using server time (UTC). Client input for `timestamp` is ignored.

- GET `/checkins`
  - 200 OK: list of check-ins with populated student details

## Notes
- Emails and Student IDs are unique and required.
- Timestamps stored in UTC.
