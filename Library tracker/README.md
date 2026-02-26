# Full Stack Library Tracker (MERN)

A **full-stack library management system** built with **MongoDB, Express, React, and Node.js (MERN)**.  
This app allows users to browse and rent books while admins can manage books and view loan history.

---

## **Features**

### User Features
- Register and login with secure authentication (JWT & bcrypt hashing)  
- Browse all available books  
- Rent books (up to 3 active loans per user)  
- Return books  
- View personal loan history  

### Admin Features
- Add new books  
- View all loans (including overdue loans)  
- Delete users or books  
- Role-based access control (Admins vs Users)  

---

## **Tech Stack**

- **Frontend:** React, Axios, React Router DOM, Vite  
- **Backend:** Node.js, Express.js
- **Database:** MongoDB  
- **Authentication:** JWT, bcryptjs  
- **Styling:** CSS (modular, external per component)  

---


---

## **Getting Started**

### 1. Clone the repository

git clone https://github.com/Koutsiotas7/Full-Stack-Projects.git cd Full-Stack-Projects/library-tracker

### 2. Backend Setup
cd backend
npm i

Create a .env file like this
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Run backend server
Node server.js

### 3. Frontend Setup
cd ../frontend
npm i
npm run dev
Program runs at http://localhost:5173

### 4. Test the App
git clone https://github.com/Koutsiotas7/Full-Stack-Projects.git
cd Full-Stack-Projects/library-tracker
