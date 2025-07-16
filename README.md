# 🌐 Codial – A Full-Stack Social Media Platform

Codial is a dynamic, feature-rich **social media web application** built using **Node.js, Express, MongoDB, and EJS**, offering a seamless user experience similar to mainstream platforms.

It supports:
- 📝 Posting text and photos
- 💬 Commenting & liking posts
- 👥 Friend requests & connections
- 💬 Real-time chat system
- 🔐 User authentication (local + Google OAuth)

---

## 🚀 Features

- 🔐 **User Authentication**
  - Local signup/signin using Passport.js
  - Google OAuth 2.0 integration
  - JWT-based token authentication for APIs
- 📝 **Posts**
  - Text and image uploads using Multer
  - Like/unlike functionality
  - CRUD operations on posts
- 💬 **Comments**
  - Comment on any post
  - Real-time updates with flash messages
- ❤️ **Likes**
  - Like/unlike posts and comments
- 👥 **Friendship System**
  - Add/remove friends
  - Friend list per user
- 💬 **Chat Engine**
  - Real-time messaging with Socket.io
- 🧾 **Flash Messages & Session Management**
  - User feedback on all actions
  - Persistent login sessions using cookies

---

## 🛠️ Tech Stack & Libraries

### 💻 Frontend:
- HTML, CSS, JavaScript
- EJS (Embedded JavaScript Templates)
- SASS (via `node-sass-middleware`)
- Bootstrap

### 🧪 Backend:
- Node.js
- Express.js

### 🗃️ Database:
- MongoDB
- Mongoose ODM

### 🔐 Authentication & Security:
- Passport.js
- passport-local
- passport-jwt
- passport-google-oauth
- bcrypt & crypto
- express-session
- connect-mongo (session storage)
- jsonwebtoken

### 📦 Other Middleware & Utilities:
- express-ejs-layouts
- multer (file uploads)
- connect-flash
- cookie-parser
- morgan (logging)

---

## 🖼️ Reference Video

https://user-images.githubusercontent.com/71987067/123326729-37cd3b00-d557-11eb-9637-0a756b5c0efb.mp4


