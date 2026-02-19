# Tentwenty Timesheet Management App

A simplified SaaS-style Timesheet Management application built as part of the Tentwenty Frontend Developer Technical Assessment.

This project demonstrates clean UI structure, reusable components, API integration, filtering, pagination, and authentication handling using a mock backend.

---

## Tech Stack

### Frontend
- React (Create React App)
- React Router DOM (v6)
- Axios
- CSS (Custom Styling)
- React Hooks (useState, useEffect, Context API)

### Backend (Mock API)
- Node.js
- Express
- CORS
- In-memory data storage (no database)

---

## Features Implemented

### Authentication
- Dummy login authentication
- Protected routes using React Router
- Session handling via Context API
- Redirect to dashboard on successful login

###  Dashboard
- Table view of weekly timesheets
- Status-based action rendering:
  - **Completed → View**
  - **Incomplete → Update**
  - **Missing → Create**
- Status filtering
- Week-based filtering
- Combined filters
- Pagination (5 records per page)
- Responsive layout
- Clean SaaS-style UI

### Backend API Endpoints

- `POST /login` – Dummy authentication
- `GET /timesheets` – Fetch timesheet list
- `POST /timesheets` – Create timesheet
- `PUT /timesheets/:id` – Update timesheet
- `DELETE /timesheets/:id` – Delete timesheet

> Data is stored in-memory for simplicity.

---

##  Setup Instructions

### 1️ Clone the Repository

```bash
git clone https://github.com/harishkumarpendem/tentwenty-timesheet-app.git
cd tentwenty-timesheet-app

cd server
npm install
node index.js

Email: admin
Password: password

