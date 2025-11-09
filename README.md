# ChatIng

Chat-Ingg is a full-stack social application designed for language exchange. It allows users to find language partners based on their native and learning languages, connect with them, and communicate through real-time chat and video calls.

## ✨ Core Features

  * **Authentication:** Secure user signup and login using JWT (JSON Web Tokens) stored in HTTP-only cookies. Passwords are hashed using `bcryptjs`.
  * **Onboarding:** A one-time onboarding process for new users to set up their profile, including their full name, bio, native language, learning language, and location.
  * **User Discovery:** Recommends other onboarded users who are not already friends.
  * **Friend System:**
      * Users can send friend requests to recommended users.
      * A dedicated notifications page shows pending incoming friend requests and recently accepted requests.
      * Users can accept pending friend requests.
      * A "Friends" page lists all connected friends.
  * **Real-time Chat:** 1-on-1 instant messaging powered by **Stream.io**, including a full chat interface with message lists, input, and thread support.
  * **Video Calling:** Integrated 1-on-1 video call functionality, also using **Stream.io's Video SDK**. Users can send a call link directly in the chat.
  * **Dynamic Theming:** A theme selector allows users to choose from a wide variety of themes (powered by DaisyUI), with the preference saved to local storage using Zustand.
  * **Responsive Layout:** The application features a responsive design with a main content area and an optional sidebar for desktop views.

## 🛠 Tech Stack

The project is structured as a monorepo with separate `backend` and `frontend` directories.

### Backend

  * **Runtime:** Node.js
  * **Framework:** Express.js
  * **Database:** MongoDB with Mongoose (ORM)
  * **Authentication:** JSON Web Tokens (`jsonwebtoken`) & `cookie-parser`
  * **Password Hashing:** `bcryptjs`
  * **Chat & Video API:** Stream.io (`stream-chat`)
  * **Middleware:** `cors`, custom auth middleware for protected routes
  * **Environment:** `dotenv` for environment variables

### Frontend

  * **Framework:** React 19
  * **Build Tool:** Vite
  * **Routing:** React Router DOM v7
  * **Data Fetching & State:** Tanstack Query (React Query) for server state
  * **Global State:** Zustand for client state (e.g., theme)
  * **Chat UI:** Stream.io (`stream-chat-react`)
  * **Video UI:** Stream.io (`@stream-io/video-react-sdk`)
  * **Styling:** Tailwind CSS + DaisyUI
  * **HTTP Client:** Axios
  * **Icons:** Lucide React
  * **Notifications:** `react-hot-toast`

## 📁 Project Structure

```
/
├── backend/
│   ├── src/
│   │   ├── controllers/  # Request/response logic (auth, user, chat)
│   │   ├── lib/          # Database (MongoDB) & Stream.io helpers
│   │   ├── middleware/   # Auth protection (protectRoute)
│   │   ├── models/       # Mongoose schemas (User, FriendRequest)
│   │   ├── routes/       # API route definitions
│   │   └── server.js     # Express server entry point
│   ├── package.json
│   └── .gitignore
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/   # Reusable React components (Navbar, Sidebar, etc.)
│   │   ├── constants/    # App-wide constants (themes, languages)
│   │   ├── hooks/        # Custom hooks (useAuth, useLogin, etc.)
│   │   ├── lib/          # API client (axios), utils
│   │   ├── pages/        # Top-level page components (HomePage, ChatPage, etc.)
│   │   ├── store/        # Zustand global state (useThemeStore)
│   │   ├── App.jsx       # Main component with routing logic
│   │   ├── main.jsx      # React entry point
│   │   └── index.css     # Global styles & Tailwind/DaisyUI imports
│   ├── package.json
│   ├── vite.config.js
│   └── .gitignore
│
├── package.json          # Root package.json with build/start scripts
└── README.md
```

## 🚀 Getting Started

### Prerequisites

  * Node.js (v18 or higher)
  * npm (v8 or higher)
  * MongoDB Atlas account (or local MongoDB instance)
  * Stream.io account (for API Key and Secret)

### 1\. Installation

Clone the repository and install dependencies for all workspaces.

```bash
git clone https://github.com/PraveshAggarwal/Chat-Ingg.git
cd Chat-Ingg
npm install # Installs root, backend, and frontend dependencies
```

### 2\. Environment Variables

You will need to create two `.env` files.

**A. Backend (`/backend/.env`)**

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret_key

STEAM_API_KEY=your_stream_api_key
STEAM_API_SECRET=your_stream_api_secret

NODE_ENV=development
```

**B. Frontend (`/frontend/.env`)**

```
VITE_STREAM_API_KEY=your_stream_api_key
```

### 3\. Running the Application

You can run both the backend and frontend servers concurrently using their respective `dev` scripts from the root directory.

**A. Run the Backend Server**

```bash
npm run dev --prefix backend
# Server will be running on http://localhost:5000
```

**B. Run the Frontend Server**

In a separate terminal:

```bash
npm run dev --prefix frontend
# App will be running on http://localhost:5173
```

Open [http://localhost:5173](https://www.google.com/search?q=http://localhost:5173) in your browser to use the application.

## 📦 Build & Deploy

To create a production build of the frontend, run:

```bash
npm run build --prefix frontend
```

This will create a `dist` folder in `/frontend`. The backend server is configured to serve these static files when `NODE_ENV` is set to `production`.

To run the application in production:

1.  Ensure you have run the frontend build script (`npm run build --prefix frontend`).
2.  Set `NODE_ENV=production` in your `/backend/.env` file.
3.  Start the backend server using the `start` script:

<!-- end list -->

```bash
npm run start --prefix backend
```

## 🔐 API Endpoints

All API routes are prefixed with `/api`.

### Auth Routes (`/api/auth`)

  * `POST /signup`: Register a new user.
  * `POST /login`: Log in an existing user and set JWT cookie.
  * `POST /logout`: Clear the JWT cookie to log out.
  * `POST /onboarding`: (Protected) Update user profile with onboarding data.
  * `GET /me`: (Protected) Get the currently authenticated user's data.

### User Routes (`/api/users`)

  * `GET /`: (Protected) Get recommended users (not friends).
  * `GET /friends`: (Protected) Get all of the current user's friends.
  * `POST /friend-request/:id`: (Protected) Send a friend request to a user by their ID.
  * `PUT /friend-request/:id/accept`: (Protected) Accept a friend request by its request ID.
  * `GET /friend-requests`: (Protected) Get all incoming pending and accepted-by-you friend requests.
  * `GET /outgoing-friend-requests`: (Protected) Get all outgoing pending friend requests.

### Chat Routes (`/api/chat`)

  * `GET /token`: (Protected) Generate a Stream.io token for the authenticated user.

-----
