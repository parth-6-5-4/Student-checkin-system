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

## Getting Started

### Prerequisites

Before you begin, make sure you have:
- Node.js version 14 or higher installed ([Download here](https://nodejs.org/))
- MongoDB installed locally ([Download here](https://www.mongodb.com/try/download/community)) OR a MongoDB Atlas account ([Sign up free](https://www.mongodb.com/cloud/atlas/register))
- A terminal or command prompt (Terminal on Mac/Linux, PowerShell or Command Prompt on Windows)
- A code editor like VS Code ([Download here](https://code.visualstudio.com/))
- Basic knowledge of JavaScript and React
- Git installed ([Download here](https://git-scm.com/downloads))

**Verify Prerequisites:**

Check if Node.js is installed:
```bash
node --version
# Should show v14.x.x or higher
```

Check if npm is installed:
```bash
npm --version
# Should show 6.x.x or higher
```

Check if MongoDB is installed (if using local MongoDB):
```bash
mongod --version
# Should show db version
```

Check if Git is installed:
```bash
git --version
# Should show git version
```

### Installation

**Step 1: Clone the Repository**

```bash
git clone https://github.com/parth-6-5-4/Student-checkin-system.git
cd Student-checkin-system
```

If you don't have Git, you can download the ZIP file from GitHub and extract it, then navigate to the folder in your terminal.

**Step 2: Backend Setup**

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

This will install all required packages including:
- express (web framework)
- mongoose (MongoDB ODM)
- bcryptjs (password hashing)
- jsonwebtoken (JWT authentication)
- cookie-parser (cookie handling)
- express-validator (input validation)
- cors (cross-origin requests)
- dotenv (environment variables)

**Step 3: Configure Environment Variables**

Create a `.env` file in the backend directory:

```bash
# On Mac/Linux
touch .env

# On Windows
type nul > .env
```

Open the `.env` file in your code editor and add these variables:

```env
# MongoDB Connection
MONGODB_URI=.....
# OR if using MongoDB Atlas:
# MONGODB_URI=......

# JWT Secret (use a strong random string)
JWT_SECRET=your_very_secure_secret_key_change_this_in_production

# Server Port
PORT=3000
```

**Important:**
- Replace `MONGODB_URI` with your actual connection string
- For local MongoDB, make sure MongoDB is running (see "Starting MongoDB" below)
- For MongoDB Atlas, create a cluster and get your connection string from the Atlas dashboard
- Replace `JWT_SECRET` with a strong random string (at least 32 characters)
- You can generate a random secret using: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

**Step 4: Start MongoDB (if using local MongoDB)**

Open a new terminal window and start MongoDB:

```bash
# On Mac (if installed via Homebrew)
brew services start mongodb-community

# On Mac/Linux (manual start)
mongod --dbpath /path/to/your/data/directory

# On Windows
"C:\Program Files\MongoDB\Server\{version}\bin\mongod.exe" --dbpath="C:\data\db"
```

Keep this terminal window open while running the application.

**Step 5: Start the Backend Server**

In the backend directory, run:

```bash
npm run dev
```

You should see output like:
```
Server running on port 3000
MongoDB connected successfully
```

If you see errors:
- Check that MongoDB is running
- Verify your MONGODB_URI in .env
- Make sure port 3000 is not already in use
- Check for any typos in your .env file

Keep this terminal window open and running.

**Step 6: Frontend Setup**

Open a NEW terminal window/tab and navigate to the frontend directory:

```bash
# From the project root
cd frontend
npm install
```

This will install all required packages including:
- react (UI library)
- react-dom (React DOM rendering)
- react-router-dom (routing)
- vite (build tool and dev server)

**Step 7: Configure Frontend Environment**

Create a `.env` file in the frontend directory:

```bash
# On Mac/Linux
touch .env

# On Windows
type nul > .env
```

Open the `.env` file and add:

```env
# Backend API URL
VITE_API_BASE=http://localhost:3000
```

**Important:**
- Make sure the port matches your backend PORT (default 3000)
- Don't add quotes around the URL
- The prefix VITE_ is required for Vite to expose the variable

**Step 8: Start the Frontend Development Server**

In the frontend directory, run:

```bash
npm run dev
```

You should see output like:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

The application will automatically open in your browser at `http://localhost:5173`

If it doesn't open automatically, manually open your browser and go to `http://localhost:5173`

### First Run

Now you have three terminal windows running:
1. MongoDB (if using local MongoDB)
2. Backend server (port 3000)
3. Frontend dev server (port 5173)

**Initial Setup Steps:**

1. Open `http://localhost:5173` in your browser
2. You should see the login page
3. Click on "Sign Up" link at the bottom
4. Fill in the signup form:
   - **Name**: Your full name (e.g., "John Doe")
   - **Email**: Your email address (e.g., "john@example.com")
   - **Institution Name**: Your school/college name (e.g., "ABC University")
   - **Password**: Choose a strong password (minimum 6 characters)
5. Click "Sign Up" button
6. You'll be automatically logged in and redirected to the dashboard
7. Start adding students by clicking "Students" in the sidebar
8. Add your first student with name, email, and student ID
9. Navigate to "Check-ins" to record attendance
10. Enter a student ID and click "Check In" to record attendance

That's it! You're ready to start using the system.

### Stopping the Application

To stop the application:

1. In the frontend terminal, press `Ctrl + C`
2. In the backend terminal, press `Ctrl + C`
3. If using local MongoDB and want to stop it:
   ```bash
   # On Mac (if using Homebrew)
   brew services stop mongodb-community
   
   # On Mac/Linux/Windows (if running manually)
   # Just close the MongoDB terminal or press Ctrl + C
   ```

### Restarting the Application

To restart later:

1. Make sure MongoDB is running (if using local MongoDB)
2. Start backend: `cd backend && npm run dev`
3. Start frontend: `cd frontend && npm run dev`
4. Open `http://localhost:5173` in your browser

### Common Setup Issues

**"Port 3000 is already in use"**
- Another application is using port 3000
- Solution: Change PORT in backend/.env to a different port (e.g., 3001)
- Update VITE_API_BASE in frontend/.env to match the new port

**"Cannot connect to MongoDB"**
- MongoDB is not running
- Solution: Start MongoDB (see Step 4 above)
- Or check your MongoDB Atlas connection string

**"Module not found" errors**
- Dependencies not installed properly
- Solution: Delete node_modules folder and package-lock.json, then run `npm install` again

**Frontend shows blank page**
- Backend might not be running
- Solution: Check backend terminal for errors, restart if needed
- Open browser console (F12) to check for errors

**"CORS policy" errors**
- Backend and frontend URLs mismatch
- Solution: Verify VITE_API_BASE matches your backend URL
- Make sure backend CORS settings allow frontend origin

### Development Tips

**Hot Reloading:**
- Both frontend and backend have hot reloading enabled
- Frontend: Changes to .jsx, .js, .css files reload automatically
- Backend: Changes to .js files restart the server automatically (via nodemon)
- Just save your files and see changes instantly

**Database Access:**
If you want to view/edit your MongoDB data directly:
- Install MongoDB Compass (GUI tool): https://www.mongodb.com/products/compass
- Or use mongosh (MongoDB Shell): `mongosh "your-connection-string"`

**Browser DevTools:**
- Open with F12 or Right-click → Inspect
- Console tab: See JavaScript errors and logs
- Network tab: See API requests and responses
- Application tab: View cookies and local storage

**Recommended VS Code Extensions:**
- ES7+ React/Redux/React-Native snippets
- ESLint
- Prettier - Code formatter
- MongoDB for VS Code
- Thunder Client (API testing)

## Features Overview

### Authentication System

The application uses a robust JWT-based authentication system to secure all operations.

**How it works:**
- Admin accounts are created with name, email, institution name, and password
- Passwords are hashed using bcrypt with a salt factor of 10 before storing in the database
- Upon login, a JWT token is generated and stored in HTTP-only cookies
- The token expires after 7 days, after which users need to log in again
- All protected routes verify the token before allowing access
- Middleware on the backend validates tokens and attaches admin information to requests

**Security features:**
- Passwords never stored in plain text
- HTTP-only cookies prevent XSS attacks
- JWT tokens include user ID and institution name
- Protected routes return 401 Unauthorized without valid token
- Session management keeps users logged in across page refreshes

### Students Management

The students module provides complete CRUD operations for managing student records.

**Adding Students:**
- Fill out a simple form with name, email, and student ID
- Backend validates that email and student ID are unique within the institution
- Duplicate entries are rejected with a clear error message
- All fields are required and validated on both frontend and backend
- Students are automatically associated with the admin's institution

**Viewing Students:**
- All students displayed in a clean, sortable table
- Shows name, email, student ID, and creation date
- Each row is clickable to view detailed student information
- Table is responsive and scrolls horizontally on mobile devices
- Loading states provide feedback during data fetching

**Searching Students:**
- Real-time search functionality filters as you type
- Searches across name and student ID fields simultaneously
- Case-insensitive matching for better user experience
- Search happens on the backend to handle large datasets efficiently
- Results update instantly without page reload

**Student Details:**
- Click any student to see their complete profile
- View all personal information in a formatted card
- See complete attendance history in chronological order
- Filter check-ins by date range for specific periods
- Download individual student's attendance records

### Check-Ins Management

The check-in system is designed for speed and accuracy in daily attendance tracking.

**Recording Check-Ins:**
- Simple one-field form requires only student ID
- System automatically validates student exists in the institution
- Timestamp is generated server-side using UTC to prevent tampering
- Client-submitted timestamps are ignored for security
- Immediate feedback confirms successful check-in
- Error messages guide users if student ID is invalid

**Today's Summary:**
- Dashboard shows total check-ins for current day (UTC)
- Count updates automatically when new check-ins are recorded
- Resets at midnight UTC every 24 hours
- Large, prominent display for at-a-glance monitoring
- Useful for daily attendance verification

**Check-In History:**
- Complete log of all check-ins across all students
- Each entry shows student name, email, ID, and timestamp
- Sorted by most recent first for easy review
- Pagination-ready structure for handling thousands of entries
- Populated with student details for comprehensive reporting

**Date Filtering:**
- Filter check-ins by custom date ranges
- Select "From" and "To" dates using calendar picker
- Filters work in UTC timezone for consistency
- Apply button triggers filtered results
- Clear filters to return to full history
- Perfect for generating weekly, monthly, or custom period reports

### Individual Student View

Each student has a dedicated detail page with comprehensive information.

**Student Information Card:**
- Displays name, email, and student ID prominently
- Clean layout with color-coded labels
- Information arranged in a horizontal grid on desktop
- Stacks vertically on mobile for better readability
- Subtle background and accent border for visual clarity

**Attendance History:**
- Table showing all check-ins for this specific student
- Timestamps formatted in readable local time
- Empty state message when no check-ins exist
- Filter by date range to analyze specific periods
- Loading indicator while fetching data
- Chronological order for easy tracking

**Personal Reports:**
- Download button exports this student's data as CSV
- Filename includes student ID and current date
- Contains student name, ID, and all check-in timestamps
- Opens in Excel, Google Sheets, or any CSV reader
- Useful for sharing attendance with parents or advisors

### Data Export

Every data table in the application includes CSV export functionality.

**How it works:**
- Download button appears above each table when data exists
- Click to instantly generate and download CSV file
- No server processing required - happens in the browser
- Automatic filename with current date (e.g., students-2025-10-03.csv)
- Files open directly in spreadsheet applications

**What gets exported:**

*Students Table CSV:*
- Name, Email, Student ID, Created Date
- Formatted timestamps in readable format
- One row per student with headers

*Check-Ins Table CSV:*
- Student Name, Email, Student ID, Timestamp
- All check-ins in the current filtered view
- Includes date range if filters are applied

*Student Detail CSV:*
- Student Name, Student ID, Timestamp
- All check-ins for that specific student
- Filtered data if date range is selected

**Technical features:**
- Handles special characters (commas, quotes, newlines)
- Properly escapes CSV format according to RFC 4180
- Null values represented as empty cells
- UTF-8 encoding for international characters
- Memory-efficient processing using Blob API

**Use cases:**
- Generate end-of-term attendance reports
- Share data with administration
- Import into other systems
- Backup important records
- Analyze attendance patterns in Excel
- Create charts and visualizations

### Responsive Design

The entire interface adapts seamlessly to any screen size.

**Desktop Experience (1024px and above):**
- Sidebar always visible on the left (260px wide)
- Main content area with generous spacing
- Tables display full width with all columns
- Forms arranged in multi-column grids
- Sticky header stays at top while scrolling
- Hover effects on interactive elements

**Tablet Experience (768px to 1024px):**
- Sidebar width reduces to 220px
- Content spacing optimized for medium screens
- Tables maintain full column visibility
- Forms adjust to available space
- Touch-friendly button sizes

**Mobile Experience (below 768px):**
- Sidebar collapses by default to save space
- Toggle button in header to open sidebar
- Sidebar becomes full-width overlay when opened
- Box shadow separates sidebar from content
- All forms stack to single column
- Tables scroll horizontally with smooth touch scrolling
- Minimum table width maintained for readability
- Search input expands to full width
- Buttons become full-width for easy tapping

**Small Mobile (below 600px):**
- Reduced padding throughout (12px instead of 24px)
- Smaller font sizes for headers
- Compact card spacing
- Input font size set to 16px to prevent iOS zoom
- Larger touch targets (minimum 40px)
- Simplified table layout with smaller cells

**Touch Optimizations:**
- All buttons minimum 40x40px for comfortable tapping
- Adequate spacing between interactive elements
- Smooth scrolling with -webkit-overflow-scrolling
- No hover states on touch devices
- Larger click areas for links and buttons

### Modern UI Elements

The interface features a contemporary design with attention to detail.

**Sticky Header:**
- Remains visible while scrolling down the page
- Initial state: semi-transparent with light blur effect
- Scrolled state: increased opacity and stronger blur
- Smooth transition between states (0.3s ease)
- Glassmorphism effect using backdrop-filter
- Maintains navigation and branding visibility

**Glassmorphic Sidebar:**
- Semi-transparent background with blur effect
- See-through quality while maintaining readability
- Smooth slide animation when toggling
- Toggle button positioned contextually (in sidebar when open, in header when collapsed)
- Navigation links with hover states
- Logout button at bottom for easy access

**Custom Calendar Icons:**
- SVG icons embedded in date input fields
- Replace browser's default calendar icon
- Consistent styling across all browsers
- Positioned absolutely on the right side
- Scales appropriately on mobile devices
- Maintains functionality while improving aesthetics

**Password Visibility Toggle:**
- Eye icon button in password fields
- Click to reveal/hide password text
- Helps users verify password while typing
- SVG icon changes between open and closed eye
- Positioned on the right side of input
- Available on both login and signup forms

**Search Integration:**
- Magnifying glass icon embedded in search input
- Positioned on the left side with padding
- Icon in muted color for subtle appearance
- Input text starts after icon with proper spacing
- Unified search experience across the app

**Visual Feedback:**
- Loading states with text indicators
- Error messages in red with clear text
- Success feedback after actions
- Disabled states for buttons during processing
- Hover effects on interactive elements
- Active states for clicked items
- Smooth transitions for all state changes

**Color Scheme:**
- Dark theme reduces eye strain
- Deep blue background (#0b1020)
- Lighter cards (#131a2a) for content separation
- Blue accent color (#5b8cff) for primary actions
- Muted text (#9aa4b2) for secondary information
- High contrast for readability
- Consistent throughout the application

## API Documentation

All API endpoints require authentication except signup and login. Include the JWT token in cookies or Authorization header.

### Authentication Endpoints

**POST /admin/signup**
- Creates a new admin account
- Body: `{ name, email, instituteName, password }`
- Returns: Admin object with JWT token

**POST /admin/login**
- Authenticates an admin
- Body: `{ email, password }`
- Returns: Admin object with JWT token

**GET /admin/me**
- Gets current admin profile
- Requires: Authentication
- Returns: Admin object

### Students Endpoints

**GET /students**
- Lists all students for the logged-in admin's institution
- Query: `?q=search_term` (optional)
- Returns: Array of student objects

**POST /students**
- Creates a new student
- Body: `{ name, email, studentId }`
- Returns: Created student object

**GET /students/:studentId**
- Gets a specific student by their ID
- Returns: Student object with check-in history

### Check-Ins Endpoints

**POST /checkin**
- Records a new check-in
- Body: `{ studentId }`
- Returns: Check-in object with populated student data

**GET /checkins**
- Lists all check-ins for the admin's institution
- Query: `?from=YYYY-MM-DD&to=YYYY-MM-DD` (optional)
- Returns: Array of check-in objects

**GET /checkins/todayCount**
- Gets count of check-ins for today (UTC)
- Returns: `{ count: number }`

## Architecture Details

### Backend Architecture

The backend is built with Node.js and Express, following RESTful principles and MVC architecture.

**Server Setup (`server.js` and `app.js`):**
- Express application configured with middleware
- CORS enabled for cross-origin requests from frontend
- Cookie parser for JWT token handling
- JSON body parser for request processing
- Error handling middleware for consistent error responses
- MongoDB connection established on server start
- Environment variables loaded from .env file
- Server listens on configured PORT (default 3000)

**Database Layer:**

*MongoDB Connection (`config/db.js`):*
- Mongoose ODM for schema-based modeling
- Connection string from environment variables
- Automatic reconnection on connection loss
- Connection pooling for performance
- Indexes on frequently queried fields

*Models (`models/`):*

- **Admin.js**: Stores administrator accounts
  - Fields: name, email, instituteName, password (hashed)
  - Unique constraint on email
  - Password hashing using bcrypt before save
  - Methods for password comparison
  - Institute name for multi-tenancy support

- **Student.js**: Stores student information
  - Fields: name, email, studentId, institute, createdAt
  - Composite unique constraint on email and institute
  - Composite unique constraint on studentId and institute
  - Indexed on studentId for fast lookups
  - Timestamps automatically managed by Mongoose

- **CheckIn.js**: Stores attendance records
  - Fields: student (ObjectId reference), timestamp
  - References Student model with population
  - Timestamp defaults to current server time
  - Indexed on timestamp for date-range queries
  - Indexed on student for per-student queries

**Route Handlers (`routes/`):**

*Admin Routes (`admin.js`):*
- **POST /admin/signup**: Creates new admin account
  - Validates input (name, email, instituteName, password)
  - Checks for duplicate email
  - Hashes password before saving
  - Generates JWT token
  - Sets HTTP-only cookie
  - Returns admin object

- **POST /admin/login**: Authenticates existing admin
  - Validates credentials
  - Compares password hash
  - Generates new JWT token
  - Updates cookie
  - Returns admin object with institution

- **GET /admin/me**: Returns current admin profile
  - Requires authentication
  - Extracts admin from JWT token
  - Returns full admin details

*Student Routes (`students.js`):*
- **GET /students**: Lists all students for institution
  - Requires authentication
  - Filters by admin's institution
  - Optional search query parameter
  - Searches name and studentId fields
  - Case-insensitive regex matching
  - Returns array of student objects

- **POST /students**: Creates new student
  - Requires authentication
  - Validates name, email, studentId
  - Checks uniqueness within institution
  - Associates with admin's institution
  - Returns created student
  - Returns 409 for duplicates

- **GET /students/:studentId**: Gets individual student
  - Requires authentication
  - Finds student by ID and institution
  - Fetches all check-ins for student
  - Optional date range filtering
  - Populates complete student data
  - Returns 404 if not found

*Check-In Routes (`checkins.js`):*
- **POST /checkin**: Records new check-in
  - Requires authentication
  - Validates studentId
  - Verifies student exists in institution
  - Creates check-in with server timestamp (UTC)
  - Ignores any client-provided timestamp
  - Populates student details
  - Returns check-in object

- **GET /checkins/todayCount**: Today's check-in count
  - Requires authentication
  - Calculates today's UTC date range
  - Counts check-ins for institution's students
  - Returns count as number
  - Resets at UTC midnight

- **GET /checkins**: Lists all check-ins
  - Requires authentication
  - Filters by admin's institution
  - Optional date range parameters (from, to)
  - Converts dates to UTC for consistent querying
  - Sorts by timestamp descending (newest first)
  - Populates student information
  - Returns filtered and populated array

**Middleware (`middleware/`):**

*Authentication Middleware (`auth.js`):*
- Extracts JWT token from cookies
- Verifies token signature using JWT_SECRET
- Decodes token to get admin ID
- Fetches admin from database
- Attaches admin object to req.admin
- Returns 401 if token invalid or expired
- Returns 403 if admin not found

*Error Handler (`errorHandler.js`):*
- Catches all errors from route handlers
- Formats error responses consistently
- Logs errors for debugging
- Returns appropriate HTTP status codes
- Hides sensitive error details in production
- Provides clear error messages to client

**Security Implementations:**
- Input validation using express-validator
- SQL injection prevention via Mongoose parameterization
- XSS protection through input sanitization
- Rate limiting can be added for brute force protection
- CORS configured to allow only frontend origin
- Environment variables for sensitive data
- Passwords never logged or exposed in responses

### Frontend Architecture

The frontend is a modern React application using hooks and functional components.

**Application Structure:**

*Entry Point (`main.jsx`):*
- Renders React app into DOM
- Wraps app with React.StrictMode for development warnings
- Single root render for entire application

*Main App Component (`App.jsx`):*
- Sets up React Router for navigation
- Manages sidebar collapse state
- Defines all application routes
- Separates auth routes (Login, Signup) from dashboard routes
- Passes authentication state to routes
- Handles sidebar toggle functionality
- Provides layout structure for dashboard pages

**Custom Hooks (`hooks/`):**

*useAuth (`useAuth.js`):*
- Manages authentication state across the app
- Functions:
  - `admin`: Current logged-in admin object or null
  - `loading`: Boolean for async operations
  - `signup(name, email, instituteName, password)`: Creates account
  - `login(email, password)`: Authenticates user
  - `logout()`: Clears session and redirects
  - `checkAuth()`: Verifies current session on mount
- State persists in component lifecycle
- Automatically checks auth status on app load
- Handles all authentication API calls
- Provides loading states for UI feedback

*useStudents (`useStudents.js`):*
- Manages student list and operations
- Functions:
  - `students`: Array of student objects
  - `loading`: Loading state for fetches
  - `error`: Error message if operations fail
  - `addStudent(formData)`: Creates new student
  - `load(searchQuery)`: Fetches students with optional search
- Automatically loads students on mount
- Re-loads when search query changes
- Debouncing can be added for search optimization

*useStudentDetail (`useStudentDetail.js`):*
- Manages individual student data
- Functions:
  - `student`: Single student object
  - `checkins`: Array of check-ins for this student
  - `loading`: Loading state
  - `error`: Error state
  - `load(from, to)`: Fetches with optional date filter
- Loads student and check-ins on mount
- Accepts date range parameters for filtering
- Separates student data from check-in data

*useCheckins (`useCheckins.js`):*
- Manages check-in records
- Functions:
  - `checkins`: Array of all check-ins
  - `todayCount`: Number of today's check-ins
  - `loading`: Loading state
  - `error`: Error state
  - `checkIn(studentId)`: Records new check-in
  - `load(from, to)`: Loads with date filter
  - `loadTodayCount()`: Fetches today's count
- Loads check-ins on mount
- Updates today count after new check-ins
- Handles date range filtering

**Page Components (`pages/`):**

*Login.jsx:*
- Email and password input fields
- Password visibility toggle
- Form validation
- Error display
- Link to signup page
- Redirects to dashboard on success
- Loading state during authentication

*Signup.jsx:*
- Name, email, institution name, password fields
- All fields required
- Password visibility toggle
- Validation feedback
- Link to login page
- Creates account and auto-logs in
- Error handling for duplicates

*StudentsPage.jsx:*
- Split into two sections: Add Student and All Students
- Add Student section:
  - StudentForm component
  - Success/error messages
  - Form resets after successful addition
- All Students section:
  - SearchInput for filtering
  - StudentsTable with all records
  - Loading indicator
  - Empty state message

*CheckinsPage.jsx:*
- Today's Summary card:
  - Shows today's check-in count
  - Styled with accent border
  - Large number display
  - CheckinForm for new entries
- Check-in History section:
  - DateRangeFilter for custom ranges
  - CheckinsTable with all records
  - Download CSV button
  - Loading and empty states

*StudentDetailPage.jsx:*
- Student information card with name, email, ID
- Horizontal layout on desktop
- DateRangeFilter for attendance history
- Table of student's check-ins
- Download CSV for this student
- Back navigation implied through sidebar
- Loading state while fetching

**Reusable Components (`components/`):**

*Header.jsx:*
- Shows current page title based on route
- Sidebar toggle button (when sidebar collapsed)
- Sticky positioning with scroll effect
- Responsive font sizes
- Only shows when authenticated

*Footer.jsx:*
- Shows attribution text
- Centered layout
- Minimal styling
- Present on all pages

*Sidebar.jsx:*
- Navigation menu with links
- Home, Students, Check-ins pages
- Logout button at bottom
- Toggle button when expanded
- Smooth collapse/expand animation
- Glassmorphic styling
- Active link highlighting

*RequireAuth.jsx:*
- Higher-order component for protected routes
- Checks authentication status
- Redirects to login if not authenticated
- Shows loading during check
- Wraps dashboard pages

*SearchInput.jsx:*
- Text input with search icon
- Real-time onChange handler
- Placeholder text
- Styled consistently
- Icon positioned inside input

*DateRangeFilter.jsx:*
- Two date inputs (From and To)
- Custom calendar icons
- Apply button
- UTC label indication
- Grid layout (3 columns)
- Responsive stacking on mobile

*StudentForm.jsx:*
- Three inputs: name, email, studentId
- All fields required
- Minimum length validation
- Submit button
- Resets on successful submission
- Error display from parent
- Grid layout for inputs

*CheckinForm.jsx:*
- Single input for studentId
- Submit button aligned with input
- Loading state during submission
- Error display from parent
- Quick access for rapid check-ins

*StudentsTable.jsx:*
- Displays all students in table
- Columns: Name, Email, Student ID, Created
- Name is clickable link to detail page
- Download CSV button above table
- Empty state message
- Loading prop for parent control
- Responsive scrolling

*CheckinsTable.jsx:*
- Shows all check-ins with student info
- Columns: Student, Email, Student ID, Time
- Download CSV button
- Empty state message
- Sorted by timestamp
- Handles missing student data gracefully

**Utilities (`utils/` and `util.js`):**

*downloadCSV.js:*
- Pure function for CSV generation
- Accepts data array and filename
- Extracts headers from object keys
- Handles special characters (commas, quotes, newlines)
- Proper CSV escaping per RFC 4180
- Creates Blob with correct MIME type
- Triggers browser download
- Cleans up object URLs

*util.js:*
- `parseError(error)`: Formats API errors for display
  - Handles JSON error responses
  - Extracts error messages from objects
  - Falls back to generic message
  
- `formatDate(date)`: Formats timestamps
  - Converts to local readable format
  - Uses browser's locale settings
  - Returns empty string for null

**API Client (`api.js`):**

Functions for backend communication:
- `apiGet(path)`: Makes GET requests
  - Sends credentials (cookies)
  - Throws on non-OK responses
  - Returns parsed JSON
  
- `apiPost(path, body)`: Makes POST requests
  - Sets Content-Type header
  - Sends credentials
  - Stringifies body
  - Returns parsed JSON

Both functions use fetch API with credentials: 'include' for cookie handling.

**Styling (`styles.css`):**

Global styles using CSS custom properties:
- CSS variables for theming (colors, spacing)
- Responsive breakpoints (768px, 600px, 400px)
- Glassmorphism effects with backdrop-filter
- Grid systems (grid-2, grid-3)
- Form styling with consistent inputs
- Table styling with hover states
- Button variants (primary, download)
- Card layouts with borders
- Utility classes (align-end, muted)
- Mobile-first responsive design
- Smooth transitions and animations
- Print styles for better reports

## Development Workflow

### Running Both Servers

You need two terminal windows:

**Terminal 1 - Backend**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend**
```bash
cd frontend
npm run dev
```

Both have hot reloading enabled. Make changes and see them instantly.

### Code Organization Tips

Keep components small and focused. Extract reusable logic into custom hooks. Use meaningful variable and function names. Comment complex logic but let code be self-documenting. Follow the existing patterns in the codebase.

### Common Development Tasks

**Adding a new field to students:**
1. Update Student schema in `backend/src/models/Student.js`
2. Update StudentForm in `frontend/src/components/StudentForm.jsx`
3. Update StudentsTable to display the new field

**Changing the color scheme:**
1. Edit CSS variables in `frontend/src/styles.css`
2. Look for the `:root` selector at the top
3. Modify color values as needed

**Adding a new page:**
1. Create component in `frontend/src/pages/`
2. Add route in `frontend/src/App.jsx`
3. Add navigation link in Sidebar component

## Deployment Guide

### Frontend Deployment

**Build the production version:**
```bash
cd frontend
npm run build
```

This creates a `dist` folder with optimized static files.

**Deploy to Vercel (Recommended):**
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the frontend directory
3. Follow the prompts
4. Set environment variable: `VITE_API_BASE=your_backend_url`

**Deploy to Netlify:**
1. Connect your GitHub repo to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variable: `VITE_API_BASE=your_backend_url`

### Backend Deployment

**Deploy to Render:**
1. Create new Web Service on Render
2. Connect your GitHub repo
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables (MONGODB_URI, JWT_SECRET)

**Deploy to Railway:**
1. Create new project on Railway
2. Connect GitHub repo
3. Railway auto-detects Node.js
4. Add environment variables in dashboard

**Deploy to Heroku:**
1. Install Heroku CLI
2. Run `heroku create your-app-name`
3. Push code: `git push heroku main`
4. Set config vars: `heroku config:set MONGODB_URI=... JWT_SECRET=...`

### Database Setup

For production, use MongoDB Atlas:
1. Create free cluster at mongodb.com/cloud/atlas
2. Add database user with password
3. Whitelist your deployment server's IP (or use 0.0.0.0/0 for all)
4. Copy connection string to MONGODB_URI

## Troubleshooting

**Backend won't start**
- Check if MongoDB is running locally
- Verify MONGODB_URI in .env file
- Make sure port 3000 isn't already in use
- Check for syntax errors in recent changes

**Frontend shows blank page**
- Check browser console for errors
- Verify VITE_API_BASE is set correctly
- Make sure backend is running
- Clear browser cache and reload

**Login doesn't work**
- Check if JWT_SECRET is set in backend .env
- Verify email and password are correct
- Check network tab for API errors
- Make sure cookies are enabled

**Students won't save**
- Check for duplicate email or student ID
- Verify all required fields are filled
- Check backend logs for validation errors
- Confirm MongoDB connection is active

**CSV download fails**
- Make sure there's data to download
- Check browser's download settings
- Try a different browser
- Check console for JavaScript errors

**Today's count shows wrong number**
- Server uses UTC time for "today"
- Make sure todayCount endpoint comes before generic /checkins route
- Check backend logs for the correct date range
- Verify check-ins exist for today in UTC

## Customization Guide

### Changing the Theme

Edit `frontend/src/styles.css` and modify these CSS variables:

```css
:root {
  --bg: #0b1020;           /* Background color */
  --card: #131a2a;         /* Card background */
  --text: #e7ecf5;         /* Text color */
  --muted: #9aa4b2;        /* Muted text */
  --primary: #5b8cff;      /* Primary blue */
  --primary-hover: #4a7ae8;/* Hover state */
  --border: #263045;       /* Border color */
}
```

### Adding Institution-Specific Features

Each admin account has an `instituteName` field. Use this to:
- Filter data by institution
- Customize branding per institution
- Add institution-specific settings

### Modifying the Data Model

To add new fields or collections:
1. Create/update schema in `backend/src/models/`
2. Update corresponding routes in `backend/src/routes/`
3. Update frontend forms and displays
4. Run migrations if needed for existing data

## Contributing

Found a bug or have an idea? Here's how to contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes with clear commit messages
4. Test thoroughly
5. Push to your fork: `git push origin feature-name`
6. Open a Pull Request with a description of changes

Keep code clean, follow existing patterns, and add comments for complex logic.

## License

This project is open source and available for educational purposes. Feel free to use it, modify it, and learn from it.

## Acknowledgments

Built with modern web technologies and a focus on developer experience. Thanks to the open source community for the amazing tools and libraries that made this possible.

## Support

Having issues? Check the troubleshooting section first. Still stuck? Open an issue on GitHub with details about:
- What you were trying to do
- What happened instead
- Steps to reproduce
- Error messages or screenshots
- Your environment (OS, Node version, browser)

---

Built by Parth Dambhare for educational institutions that deserve better attendance systems.
