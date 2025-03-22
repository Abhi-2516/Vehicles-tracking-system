# Vehicle Tracking System

## 🚀 Overview
The **Vehicle Tracking System** is a web application that allows users to register vehicles and track their locations in real time. It utilizes **Google Maps API** for location tracking and distance calculation. The system is built using **Next.js (Frontend)** and **Node.js with Express.js (Backend)** and uses **MongoDB** for data storage.

## 📌 Features Implemented
### ✅ 1. Authentication (JWT)
- Users can **register, login, and logout** securely.
- JWT-based authentication is implemented to protect routes.
- Middleware is used to restrict unauthorized access.

### ✅ 2. REST API with CRUD Operations
- **User Management:** Register, Login, and Profile Management.
- **Vehicle Management:**
  - Register a vehicle (license number, owner details, type, model, etc.).
  - Update vehicle details.
  - Delete vehicle records.
- **Location Updates:**
  - Record periodic GPS location updates for each vehicle.

### ✅ 3. Distance Calculation Using Google Maps API (In Progress)
- Allows users to calculate the **distance and estimated travel time** between two vehicle locations.
- Uses **Google Maps Distance Matrix API** for calculations.
- Feature is on the verge of completion.

## 📌 Future Plans
### 🔜 4. Efficient Pagination for Large Datasets
- Implement **cursor-based pagination** for handling **millions of vehicle records**.
- Use **lazy loading or infinite scrolling** on the frontend for better performance.

### 🔜 5. Data Visualization Using Charts
- Use **Chart.js or Google Charts** to display:
  - **Vehicle Movement Heatmap**.
  - **Total Distance Traveled Per Vehicle (Bar Chart)**.
  - **Leaderboard for Top 10 Vehicles with Maximum Distance Traveled**.

### 🔜 6. Seed Data Generation
- Write a script to **generate 1 million vehicle records**.
- Each vehicle will have **detailed metadata and location history**.
- Simulate real-world movement using **GPS coordinate updates**.

## 🛠️ Tech Stack
### Frontend:
- **Next.js**
- **React.js**
- **Google Maps API**
- **Tailwind CSS**

### Backend:
- **Node.js & Express.js**
- **MongoDB with Mongoose**
- **JWT Authentication**
- **Google Maps API (Distance Matrix & Geocoding)**

## ⚙️ Setup Instructions
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/vehicle-tracking-system.git
cd vehicle-tracking-system
```

### 2️⃣ Backend Setup
```sh
cd backend
npm install
```
- Create a **.env** file and add:
```sh
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```
- Start the backend server:
```sh
node server.js
```

### 3️⃣ Frontend Setup
```sh
cd frontend
npm install
```
- Update the **Google Maps API Key** in the frontend.
- Start the frontend:
```sh
npm run dev
```

### 4️⃣ Open the Application
- **Frontend:** `http://localhost:3000`
- **Backend API:** `http://localhost:5000`

## 📄 API Documentation
- API documentation available via **Postman Collection** or **Swagger** (to be added in future versions).

## 📜 License
This project is **open-source** under the **MIT License**.

---
### 🌟 Contributors
- **[Abhishek Yadav]** - Developer & Maintainer

