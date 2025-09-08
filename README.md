# Full-Stack E-Commerce SPA 🛍️

A complete single-page web application for a modern e-commerce website, built from the ground up. This project features a secure, account-based backend with user authentication and a responsive, dynamic frontend built with React, TypeScript, and Tailwind CSS.

## Live Demo

* **Frontend (Vercel):** `https://ecommerce-spa.vercel.app/`
* **Backend API (Render):** `https://ecommerce-spa-55m5.onrender.com`

---

## Features

* **User Authentication:** Secure user signup and login using JSON Web Tokens (JWT).
* **Seamless Signup:** Users are automatically logged in after a successful signup.
* **Product Catalog:** Fetches and displays a list of products from the backend.
* **Dynamic Filtering:** Filter products by category and minimum price.
* **Account-Based Cart:** The shopping cart is tied to a user's account and persists across sessions and devices.
* **Cart Management:** Users can add and remove items from their cart.
* **Protected Routes:** Only logged-in users can add items to the cart.
* **Simulated Checkout:** A checkout confirmation flow that clears the cart.
* **Responsive Design:** A mobile-first, fully responsive UI that looks great on all screen sizes.

---

## Tech Stack

| Backend                | Frontend         | Deployment           |
| ---------------------- | ---------------- | -------------------- |
| Node.js                | React.js         | Render (for Backend) |
| Express.js             | TypeScript       | Vercel (for Frontend)|
| TypeScript             | Vite             |                      |
| MongoDB                | Tailwind CSS     |                      |
| Mongoose               | React Router     |                      |
| JSON Web Token (JWT)   | Axios            |                      |
| Bcrypt.js              |                  |                      |

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* **Node.js** (v18 or later recommended)
* **npm** or another package manager
* A **MongoDB** database URI (you can get a free one from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### Backend Setup

1.  **Clone the repository:**
    ```bash
    [git clone ](https://github.com/ImmrAD/ecommerce_spa.git)
    cd ecommerce_spa
    ```

2.  **Navigate to the backend directory:**
    ```bash
    cd ecommerce-backend-ts
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Create an environment file:**
    Create a file named `.env` in the `ecommerce-backend-ts` root and add the following variables:
    ```
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_strong_secret_key
    NODE_ENV=development
    ```

5.  **Seed the database with sample products:**
    This command will populate your database with sample items.
    ```bash
    npm run seed
    ```

6.  **Run the backend server:**
    ```bash
    npm run dev
    ```
    The backend will be running on `http://localhost:5000`.

### Frontend Setup

1.  **Navigate to the frontend directory:**
    From the project root, open a **new terminal** and run:
    ```bash
    cd my-react-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create an environment file:**
    Create a file named `.env.local` in the `my-react-app` root. This tells your frontend where to find the local backend API.
    ```
    VITE_API_BASE_URL=http://localhost:5000
    ```

4.  **Run the frontend server:**
    ```bash
    npm run dev
    ```
    The frontend will open and be running on `http://localhost:5173`.
