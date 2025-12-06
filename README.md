# 📌 JobTrack Pro – Job Application Tracker

<div align="center">

![JobTrack Pro](https://img.shields.io/badge/JobTrack-Pro-blue)
![React 18.2](https://img.shields.io/badge/React-18.2-blue)
![License: MIT](https://img.shields.io/badge/License-MIT-green)

A professional React application for tracking job applications with authentication, CRUD operations, and advanced filtering.

🔗 **GitHub Repo:** https://github.com/SubhodeepRoy17/jobtrack-pro

</div>

---

## 📋 Table of Contents
- [Overview](#-overview)  
- [Features](#-features)  
- [Screenshots](#-screenshots)  
- [Tech Stack](#-tech-stack)  
- [Installation](#-installation)  
- [Usage](#-usage)  
- [Project Structure](#-project-structure)  
- [API Reference](#-api-reference)  
- [Contributing](#-contributing)  
- [License](#-license)  
- [Contact](#-contact)  

---

## 📖 Overview

**JobTrack Pro** is a comprehensive job application tracking system built with **React**. It helps users manage their job search process with features like authentication, CRUD operations, sorting, filtering, and dashboard analytics.

---

## ✨ Features

### ✅ Core Features
#### 🔐 Authentication System
- Email-based login  
- Role-based access (manager/user)  
- Protected routes  
- Persistent session  

#### 📄 Job Application Management
- Add new job applications  
- Edit/update existing applications  
- Delete applications  
- Form validation with error messages  

#### 📊 Table Functionalities
- Search by company name / job title  
- Filter by job type & status  
- Sort by company name or applied date  
- Pagination (5 items per page)  

#### 📈 Dashboard
- Summary statistics  
- Recent applications list  

#### 📱 Responsive Design
- Mobile-friendly layout  
- Clean and modern UI  

### 🚀 Bonus Features Implemented
- Inline editing  
- Delete confirmation modal  
- Success & error alerts  
- Persistent data simulation using Context  
- Smooth user experience  

---

## 📸 Screenshots

### 🔐 Login Page
![Login Page](https://github.com/user-attachments/assets/cd2e20d9-f847-4ea9-94c4-5bec228666ed)

### 📑 Applications Table
![Applications Table Part-1](https://github.com/user-attachments/assets/74f0c8b1-f9b5-432c-a76f-cf9e2b460dd1)

![Applications Table Part-2](https://github.com/user-attachments/assets/a5ccd8f2-74f2-46ca-9278-7572116b64f1)

### 📊 Dashboard Summary
![Dashboard](https://github.com/user-attachments/assets/ef3ece83-2590-4735-9e07-0fe06b8f82c6)

---

## 🛠 Tech Stack

- **React 18.2**
- **React Router DOM 6.8**
- **Context API** – state management  
- **CSS3** – styling  
- **Git/GitHub** – version control  

---

## 🚀 Installation

### **Prerequisites**
- Node.js **v14+**
- npm or yarn

### **Setup Instructions**
```bash
# Clone the repository
git clone https://github.com/SubhodeepRoy17/jobtrack-pro.git
cd jobtrack-pro

# Install dependencies
npm install

# Start development server
npm start
```
## Open in your browser:
👉 http://localhost:3000

---

## 💻 Usage

### 🔑 Test Credentials
Manager Account

Email: hrmanager@gmail.com

Password: any password (min 6 chars)

Regular User

Email: user@example.com

Password: any password (min 6 chars)

### 🌟 Features in Action
➕ Adding a New Application

Log in

Go to Add Application

Fill the form

Submit

### 🗂 Managing Applications

View applications

Search & filter

Sort by date or company

Edit inline

Delete with confirmation

### 📊 Viewing Dashboard

Track your job search progress

View recent applications

---

## 📁 Project Structure
```
jobtrack-pro/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── PrivateRoute.jsx
│   │   ├── HomePage.jsx
│   │   ├── LoginForm.jsx
│   │   ├── Dashboard.jsx
│   │   ├── ApplicationForm.jsx
│   │   ├── ApplicationsTable.jsx
│   │   └── NotFound.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── ApplicationContext.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
├── README.md
└── .gitignore
```

---

## 🔧 API Reference
### Authentication Context
```
{
  user: { email, role } | null,
  login: (email, password) => void,
  logout: () => void
}

```

### Application Context
```
{
  applications: Array,
  addApplication: (application) => void,
  updateApplication: (id, data) => void,
  deleteApplication: (id) => void
}
```

---

## 🤝 Contributing

Contributions are welcome! Follow these steps:

```
# Fork the repository
# Create a feature branch
git checkout -b feature-branch-name

# Commit changes
git commit -m "Add new feature"

# Push to your branch
git push origin feature-branch-name
```
Then open a Pull Request.

### ✔ Code Style Guidelines

- Use meaningful variable names

- Add comments for complex logic

- Follow project structure

- Test before submitting

---

## 📄 License

This project is licensed under the **MIT License**.
See the LICENSE file for details.

---

## 📞 Contact

- GitHub Issues: Open an issue

- Email: subhodeeproy37@gmail.com

- Project Link: https://github.com/SubhodeepRoy17/jobtrack-pro
