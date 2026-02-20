# 🛠️ AutoParts Dashboard

[![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react&logoColor=white)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.3.3-teal?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

> A sleek inventory, sales, and expenses management dashboard for your autoparts business. Keep your stock, sales, and cashflow under control — all in one place.  

**Live Demo:** [Your Vercel Link Here](https://your-vercel-app.vercel.app)

---

## 🏗️ Features

- **Inventory Management**
  - Add, edit, and delete products
  - Search by OEM, Product, or Brand
  - Low Stock warnings
- **Sales Tracking**
  - Record sales with product, quantity, and total amount
  - Searchable and editable sales records
  - Sales over time visualization
- **Expenses Tracking**
  - Record expenses with categories
  - Track totals by category
- **Dashboard**
  - Total Products, Low Stock Items, Sales, Expenses (clickable cards!)
  - Low Stock Bar Chart in red
  - Sales vs Expenses Line Chart (profit visualization)
  - Recent products table

---

## 📁 Project Structure

```text
autoparts-dashboard/
├─ src/
│  ├─ components/      # Navbar, forms, modals
│  ├─ data/            # products.js, sales.js, expenses.js
│  ├─ pages/           # Dashboard.jsx, Inventory.jsx, Sales.jsx, Expenses.jsx
│  ├─ App.jsx
│  └─ main.jsx
├─ public/
├─ package.json
└─ tailwind.config.js