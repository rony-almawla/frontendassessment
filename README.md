Vue 3 Entity Management App

A simple CRUD (Create, Read, Update, Delete) application built with Vue 3, Vue Router, Axios, and JSON Server. This project allows users to register, log in, and manage entities with fields such as name, date of birth, gender, marital status, and profile picture.

Features

User Authentication

Sign up with email and password (passwords hashed with bcryptjs)

Login and JWT-like token stored in localStorage

Access control: protected routes redirect unauthorized users to Access Denied

Entity Management

Add, read, update, and delete entities

Upload and preview profile pictures (supports drag & drop)

Search entities by first or last name

Responsive Design

Mobile-friendly layout

Styled using scoped CSS

Routing

Vue Router with authentication guards

404 Not Found page for unknown routes

Project Structure
src/
├─ components/
│  ├─ AppHeader.vue       # Navigation header
│  ├─ BaseInput.vue       # Reusable input component
│  ├─ BaseSelect.vue      # Reusable select dropdown
│  ├─ BaseRadio.vue       # Reusable radio buttons
│  ├─ AddEntity.vue       # Form to add new entity
│  ├─ UpdateEntity.vue    # Form to edit entity
│  ├─ ReadEntity.vue      # List and manage entities
│  ├─ Login.vue           # User login form
│  ├─ SignUp.vue          # User registration form
│  ├─ HomePage.vue        # Dashboard after login
│  ├─ AccessDenied.vue    # Access denied page
│  └─ NotFound.vue        # 404 page
├─ App.vue
├─ main.js
├─ routers.js
└─ assets/

Installation

Clone the repository

git clone https://github.com/your-username/vue-entity-crud.git
cd vue-entity-crud


Install dependencies

npm install


Install JSON Server globally (if not installed)

npm install -g json-server


Start JSON Server (mock backend)

json-server --watch db.json --port 3000


Run the Vue app

npm run dev

Usage

Open your browser at http://localhost:5173 (Vite default port)

Sign up as a new user

Log in with your credentials

Navigate to Add Entity to add a new entity

View all entities in Read Entity

Edit or delete entities as needed

Access control ensures only logged-in users can add, read, or update entities

JSON Server (db.json) Example
{
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "password": "$2a$10$..."
    }
  ],
  "entities": [
    {
      "id": 1,
      "firstName": "Alice",
      "lastName": "Smith",
      "dob": "1990-05-15",
      "maritalStatus": "Single",
      "address": "123 Main St",
      "phone": "12345678",
      "gender": "Female",
      "profilePic": ""
    }
  ]
}

Dependencies

Vue 3

Vue Router 4

Axios

bcryptjs

JSON Server (for mock backend)

Screenshots

(Optional: Add screenshots of Home Page, Add Entity Form, Read Entity Table, Login, and Access Denied pages)

Notes

Passwords are stored hashed in the JSON database for security.

Profile pictures are saved as base64 URLs in the database.

Authentication uses a simple token in localStorage with expiry checks.

Future Improvements

Replace JSON Server with a real backend (Node.js + Express + Database)

Add role-based access (admin vs user)

Improve image upload and storage (using cloud storage)

Add unit tests and validation