
Overview
This project is a simple and secure login and signup system built with **Vue 3**.  
It demonstrates form validation, password security, and token-based authentication using a mock backend.  
The goal was to simulate a real authentication flow — from user registration to login — without relying on a real API.

---

 What I Built
- A **Signup Page** where users can register by entering their name, email, and password.
- A **Login Page** that verifies user credentials stored in a mock database.
- A **Home Page** that displays after successful login and stores a simulated token in `localStorage`.
- A secure validation system that checks for:
  - Valid email format.
  - Passwords that are at least 8 characters long.
  - Error messages when credentials are incorrect.

---

# Technologies Used
- **Vue 3** (Frontend Framework)
- **VeeValidate + Yup** (Form Validation)
- **bcrypt.js** (Password hashing)
- **JSON Server** (Mock API backend)
- **localStorage** (Token storage)
- **DOMPurify** (Input sanitization)

---

How to Run the Project

1. Clone the repository:
```bash
git clone <your-repo-url>
Navigate into the project folder:

Copy code
cd login-vuejs
Install all dependencies:

Copy code
npm install
Start the mock backend (JSON Server):

Copy code
npx json-server --watch db.json --port 3000
Run the Vue app:

Copy code
npm run serve
Open your browser and visit:


Copy code
http://localhost:8080
