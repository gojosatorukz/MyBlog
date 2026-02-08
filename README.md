# 🚀 Secure Full-Stack Blog Platform

A production-ready blogging platform built with **Node.js, Express, MongoDB, and EJS**.
This project features a secure authentication system, role-based access control (RBAC), real-time social interactions, and a modern "Glassmorphism" UI with Dark Mode support.

---

## ✨ Key Features

### 🔐 Advanced Security (OWASP Top 10 Protection)
* **Brute-Force Protection:** Implemented `express-rate-limit` on auth routes to block repeated login attempts.
* **Data Sanitization:**
    * **NoSQL Injection:** Protected via `express-mongo-sanitize`.
    * **XSS Attacks:** Inputs are cleaned using `xss-clean` to prevent malicious script injection.
* **Secure Headers:** HTTP headers are hardened using `helmet`.
* **Authentication:** JWT (JSON Web Tokens) stored securely in HTTP-only cookies.
* **Password Security:** All passwords are salted and hashed using `bcryptjs`.

### 📝 Smart Content Management
* **Smart Like System:** Prevents duplicate likes. A user can only like a post once (toggle logic).
* **Live View Counter:** Tracks unique views for every post.
* **Interactive Comments:**
    * Users can add comments.
    * **Inline Editing:** Edit your own comments directly on the page without reloading.
    * **Soft Deletes:** Admin can remove content without breaking database integrity.

### 🎨 Modern UI/UX
* **Dark Mode 🌑:** Fully functional theme toggle with `localStorage` persistence.
* **Glassmorphism Design:** Modern translucent header and UI elements.
* **Responsive Layout:** Optimized for Mobile, Tablet, and Desktop (Bootstrap 5).
* **Dynamic Profiles:** User dashboards with auto-generated avatars (UI Avatars) and bio editing.

---

## 🛠️ Tech Stack & Architecture

The project follows the **MVC (Model-View-Controller)** architectural pattern.

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Backend** | Node.js, Express.js | Server-side logic & API Routing |
| **Database** | MongoDB, Mongoose | NoSQL Database with Schema Validation |
| **Frontend** | EJS, Bootstrap 5 | Server-side templating & Responsive UI |
| **Security** | Helmet, Rate-Limit, XSS-Clean | Middleware for hardening the server |
| **Auth** | JWT, BcryptJS | Stateless authentication |

---

## 📂 Project Structure

```text
📦 blog-platform
 ┣ 📂 src
 ┃ ┣ 📂 config        # Database connection logic
 ┃ ┣ 📂 controllers   # Business logic (Auth, Posts, Users)
 ┃ ┣ 📂 middleware    # Auth guards, Rate limiters
 ┃ ┣ 📂 models        # Mongoose Schemas (User, Post, Comment)
 ┃ ┣ 📂 routes        # API Endpoints
 ┃ ┗ 📂 views         # EJS Templates (Partials, Pages)
 ┣ 📂 public          # Static assets (CSS, Images, JS)
 ┣ 📜 server.js       # App entry point
 ┗ 📜 .env            # Environment variables

```

---


## 🚀 Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/gojosatorukz/MyBlog.git
cd blog-platform

```

### 2. Install Dependencies

```bash
npm install

```

### 3. Configure Environment

Create a `.env` file in the root directory and add your credentials:

```env
PORT=3000
MONGO_URI=mongodb+srv://<your_connection_string>
JWT_SECRET=mysupersecretkey

```

### 4. Run the Server

```bash
# Run in development mode (with nodemon)
npm run dev

# Run in production mode
npm start

```

### 5. Access the App

Open your browser and go to: `http://localhost:3000`

---

## 🛡️ API Endpoints (Backend)

| Method | Endpoint | Description | Access |
| --- | --- | --- | --- |
| **POST** | `/api/auth/register` | Register a new user | Public |
| **POST** | `/api/auth/login` | Login & Get Token | Public (Rate Limited) |
| **GET** | `/api/posts` | Get all posts | Public |
| **POST** | `/api/posts` | Create a new post | Private |
| **PUT** | `/api/posts/:id/like` | Toggle Like (Once per user) | Private |
| **DELETE** | `/api/posts/:id` | Delete post | Admin/Owner |

---

### 👤 Author

**Bekzat Rashiduly**

---

*This project was developed as a Final Project for the Web Technologies course.*
