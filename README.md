# Shubham Kumar's Professional Portfolio Website

A premium, dynamic, and database-driven personal portfolio website showcasing Shubham Kumar's skills, education, projects, achievements, and experiences. The project is built using a modern Full Stack (MERN/PostgreSQL) monorepo architecture, featuring an interactive React frontend, a Node.js/Express.js backend, a Supabase PostgreSQL database, and a full Admin Dashboard for content management.

## 🚀 Live Demo
Visit the live site: [portfolio-rho-three-4vk7ykon3k.vercel.app](https://portfolio-rho-three-4vk7ykon3k.vercel.app)

---

## 📸 Key Features

*   **Interactive UI/UX**: Ultra-premium aesthetic with a dynamic dark/light mode toggle, smooth transitions (using Framer Motion), and clean typography (Outfit & Inter).
*   **Custom Cursor Tracking**: A customized cursor follower reticle with an interactive ambient background gradient blob that tracks mouse movements.
*   **Dynamic Projects section**: Displays real-world projects fetched dynamically from the database. Each project card includes active links for GitHub, Live Demos, and images.
*   **Fully-functional Contact Form**: Visitors can send queries/messages directly through the website, storing them in the PostgreSQL database.
*   **Secured Admin panel**: 
    *   Protected Admin Login (using JSON Web Tokens).
    *   Full-featured **Admin Dashboard** allowing the owner to add, edit, or delete projects directly through the UI.
*   **Unified Monorepo Deployment**: Seamless hosting of both the React frontend and Express backend on Vercel as a single linked project.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, TailwindCSS v4, Framer Motion, Lucide React, Axios |
| **Backend** | Node.js, Express.js, CORS, JSON Web Tokens (JWT), Dotenv |
| **Database** | PostgreSQL (Hosted on Supabase), `pg` driver |
| **Linting** | Oxlint |
| **Hosting & Deployment** | Vercel (Frontend & Serverless Backend) |

---

## 📁 Repository Structure

```text
├── client/                 # React.js Frontend
│   ├── src/
│   │   ├── components/     # Reusable layout sections (Hero, About, Projects, Contact, etc.)
│   │   ├── pages/          # Admin Dashboard views
│   │   ├── services/       # Axios API integrations
│   │   └── App.jsx         # App router and theme manager
│   ├── vercel.json         # Client specific routing
│   └── package.json        
├── server/                 # Express.js Backend
│   ├── config/             # Database connection setups
│   ├── controllers/        # Express route handlers
│   ├── routes/             # REST API endpoint definitions
│   ├── seeds/              # Database seed scripts
│   ├── server.js           # Server runner & database entry point
│   └── package.json        
├── api/
│   └── index.js            # Vercel serverless function wrapper
├── vercel.json             # Root-level Vercel monorepo deployment config
└── package.json            # Root workspaces orchestrator
```

---

## 💻 Local Development Setup

Follow these steps to run both the frontend and backend servers locally on your machine:

### 1. Prerequisites
Ensure you have node.js (v18+) and npm installed.

### 2. Clone the Repository
```bash
git clone https://github.com/shubhamverma20/Portfolio.git
cd Portfolio
```

### 3. Setup Backend Environment Variables
Create a `.env` file inside the `server/` directory:
```bash
cp server/.env.example server/.env
```
Fill in the credentials in `server/.env`:
```env
PORT=5000
PG_URI=your_postgresql_supabase_connection_string
ADMIN_PASSWORD=your_secure_admin_password
JWT_SECRET=your_jwt_signing_key
NODE_ENV=development
```

### 4. Install Dependencies
Run from the root directory to install all dependencies for both `client` and `server` workspaces:
```bash
npm install
```

### 5. Running the Application
*   **Run Server (Backend)**:
    ```bash
    cd server
    npm run dev
    ```
    *(Starts local server at `http://localhost:5000`)*
*   **Run Client (Frontend)**:
    ```bash
    cd client
    npm run dev
    ```
    *(Starts development server at `http://localhost:5173`)*

---

## ☁️ Vercel Deployment Instructions

This repository is optimized to deploy both the React frontend and Node.js backend to **Vercel** under a single unified project using Serverless Functions.

### Step 1: Push Changes
Ensure all root configuration files (`package.json`, `vercel.json`, and `api/index.js`) are committed and pushed to your GitHub repository:
```bash
git add .
git commit -m "Configure Vercel monorepo deployment"
git push origin main
```

### Step 2: Configure Project Settings on Vercel
1. Log in to the [Vercel Dashboard](https://vercel.com/) and go to your project settings.
2. Under **Settings > General**:
   * Change **Root Directory** to the repository root (leave it blank/empty).
   * Framework Preset can be set to **Vite** or **Other**.
3. Under **Settings > Environment Variables**, add the environment variables required by the backend:
   * `PG_URI` (Your live Supabase PostgreSQL connection string)
   * `ADMIN_PASSWORD` (Your secure admin dashboard password)
   * `JWT_SECRET` (A secret key for generating admin auth tokens)
   * `NODE_ENV` = `production`
4. Trigger a new deployment. Vercel will automatically build the static frontend assets and provision the database-connected serverless backend under `/api/*`.

---

## 📞 License
Distributed under the ISC License. Created by **Shubham Kumar**.
