# Product Management System

A full-stack Product Management application built with the **MERN stack** (MongoDB, Express, React, Node.js). This system allows users to create, view, update, and delete products with support for image uploads, advanced filtering, and validation.

## 🚀 Features

-   **Product Operations (CRUD)**: Create, Read, Update, and Delete products.
-   **Image Uploads**: Upload product images (stored locally).
-   **Search & Filter**: Real-time search by name and filtering by category.
-   **Sorting & Pagination**: Sort functionality (Price, Date) and paginated lists.
-   **Validation**:
    -   **Frontend**: Real-time form validation using **Zod** & **React Hook Form**.
    -   **Backend**: Request validation using **Joi**.
-   **UI/UX**: Modern "Glassmorphism" design with responsive layout.

## 🛠️ Tech Stack

### Backend
-   **Node.js & Express**: API Server.
-   **MongoDB**: Database (using Mongoose).
-   **Multer**: Handling multipart/form-data for image uploads.
-   **Joi**: Data validation.

### Frontend
-   **React (Vite)**: Fast, modern UI library.
-   **React Router**: Client-side routing.
-   **React Hook Form & Zod**: Form handling and validation.
-   **Axios**: API requests.
-   **Vanilla CSS**: Custom variable-based design system.

## 📦 Installation & Setup

### Prerequisites
-   Node.js installed.
-   MongoDB installed (Local or Atlas).

### 1. Clone the Repository
```bash
git clone <repository-url>
cd product_app
```

### 2. Backend Setup
Navigate to the backend folder and install dependencies:
```bash
cd Backend
npm install
```

**Configuration:**
Create a `.env` file in the `Backend` directory:
```env
PORT=8000
MONGODB_URI=mongodb://localhost:27017/product_app
# Or your Atlas URI
```

**Start the Server:**
```bash
npm run dev
```
*Server runs on http://localhost:8000*

### 3. Frontend Setup
Open a new terminal, navigate to the frontend folder, and install dependencies:
```bash
cd Frontend
npm install
```

**Start the Client:**
```bash
npm run dev
```
*Client runs on http://localhost:5173*

## 🔌 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/products` | Get all products (supports query: `search`, `category`, `sort`, `page`) |
| `GET` | `/api/products/:id` | Get details of a single product |
| `POST` | `/api/products` | Create a new product (Multipart Form Data) |
| `PUT` | `/api/products/:id` | Update an existing product |
| `DELETE` | `/api/products/:id` | Delete a product |

## 📂 Project Structure

```
product_app/
├── Backend/
│   ├── config/         # Database connection
│   ├── controllers/    # Route logic
│   ├── middleware/     # Upload and Validation
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API routes
│   ├── uploads/        # Stored images
│   └── server.js       # Entry point
│
└── Frontend/
    ├── src/
    │   ├── components/ # Reusable UI (Card, Navbar, Form)
    │   ├── pages/      # Views (Home, Add, Edit, Details)
    │   ├── services/   # API calls
    │   └── App.jsx     # Routing
```
