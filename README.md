# Student Check-In System

A full-stack web application for managing student attendance with real-time check-ins, comprehensive reporting, and a modern glassmorphic interface. Built for educational institutions that need a reliable way to track student attendance without the hassle of paper sheets or clunky software.

## What This Does

This system helps you manage student attendance efficiently. Here's what you can do:

- Register students with their name, email, and student ID
- Record daily check-ins with automatic timestamps
- Search and filter through student records
- View individual student attendance history
- Filter check-ins by date ranges
- Export all data to CSV for reports and analysis
- Access everything through a clean, responsive web interface

Think of it as your digital attendance register, but smarter and way easier to use.

## Tech Stack

**Frontend**
- React 18 with modern hooks architecture
- React Router for client-side navigation
- Custom CSS with glassmorphism effects
- Vite for fast development and optimized builds

**Backend**
- Node.js with Express framework
- MongoDB for data persistence
- JWT-based authentication
- RESTful API design

**Development Tools**
- Nodemon for backend hot reloading
- ESLint for code quality
- Git for version control

## Project Structure

Here's how the code is organized:

```
Student-checkin-system/
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── SearchInput.jsx
│   │   │   ├── DateRangeFilter.jsx
│   │   │   ├── StudentForm.jsx
│   │   │   ├── StudentsTable.jsx
│   │   │   ├── CheckinForm.jsx
│   │   │   ├── CheckinsTable.jsx
│   │   │   └── RequireAuth.jsx
│   │   ├── pages/            # Full page components
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── StudentsPage.jsx
│   │   │   ├── CheckinsPage.jsx
│   │   │   └── StudentDetailPage.jsx
│   │   ├── hooks/            # Custom React hooks
│   │   │   ├── useAuth.js
│   │   │   ├── useStudents.js
│   │   │   ├── useCheckins.js
│   │   │   └── useStudentDetail.js
│   │   ├── utils/            # Helper utilities
│   │   │   └── downloadCSV.js
│   │   ├── App.jsx           # Main app with routing
│   │   ├── main.jsx          # React entry point
│   │   ├── api.js            # API client functions
│   │   ├── util.js           # Common utilities
│   │   └── styles.css        # Global styles
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── src/
│   │   ├── models/           # MongoDB schemas
│   │   │   ├── Admin.js
│   │   │   ├── Student.js
│   │   │   └── CheckIn.js
│   │   ├── routes/           # API route handlers
│   │   │   ├── admin.js
│   │   │   ├── students.js
│   │   │   └── checkins.js
│   │   ├── middleware/       # Express middleware
│   │   │   ├── auth.js
│   │   │   └── errorHandler.js
│   │   ├── config/           # Configuration files
│   │   │   └── db.js
│   │   ├── app.js            # Express app setup
│   │   └── server.js         # Server entry point
│   ├── package.json
│   └── nodemon.json
│
└── README.md                 # This file
```
