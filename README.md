# AI Code Reviewer

An intelligent, AI-powered Pull Request Review Agent that integrates with GitHub and automatically reviews code whenever a Pull Request is created, synchronized, or reopened. Built with the MERN stack and Groq AI (Llama 3.3).

## Architecture
- **Frontend:** React, Vite, Tailwind CSS, Recharts
- **Backend:** Node.js, Express, MongoDB
- **AI Integration:** Groq API
- **GitHub Integration:** Octokit API & Webhooks

## Prerequisites
- Node.js (v18+)
- MongoDB Atlas or Local MongoDB
- GitHub Account & Repository
- Groq API Key

## Setup Instructions

### Quick Start (Root Directory)
If you want to start both the frontend and backend with a single command:
1. Run `npm install` in the root directory.
2. Run `npm run dev`.

This will start the backend on port 5000 and the frontend on port 5173/5174 concurrently.

### 1. Backend Setup
1. Navigate to the `backend` directory.
2. Run `npm install`.
3. Create a `.env` file based on `.env.example`:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_uri
   GITHUB_TOKEN=your_github_personal_access_token
   GITHUB_WEBHOOK_SECRET=your_webhook_secret
   GROQ_API_KEY=your_groq_api_key
   NODE_ENV=development
   ```
4. Run the server: `npm run dev` (or `node server.js`).

### 2. Frontend Setup
1. Navigate to the `frontend` directory.
2. Run `npm install`.
3. Create a `.env` file:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Run the development server: `npm run dev`.

### 3. Webhook Configuration (Local Testing)
1. Use `ngrok` to expose your local server:
   ```bash
   ngrok http 5000
   ```
2. Go to your GitHub Repository -> Settings -> Webhooks -> Add webhook.
3. Payload URL: `https://<your-ngrok-url>.ngrok-free.app/webhook`
4. Content type: `application/json`
5. Secret: `your_webhook_secret` (matching the one in your `.env`)
6. Select "Let me select individual events" and check **Pull requests**.
7. Save the webhook.

## Deployment Guide

### MongoDB Atlas
1. Create a cluster on MongoDB Atlas.
2. Whitelist `0.0.0.0/0` in Network Access.
3. Get the connection string and update `MONGODB_URI` in your backend deployment.

### Backend (Render)
1. Push your code to GitHub.
2. Create a new Web Service on Render.
3. Connect your repository.
4. Set Build Command: `npm install` (in backend dir)
5. Set Start Command: `node server.js`
6. Add Environment Variables from your `.env` file.

### Frontend (Vercel)
1. Create a new Project on Vercel.
2. Import your repository.
3. Set the Framework Preset to Vite.
4. Set the Root Directory to `frontend`.
5. Add Environment Variable `VITE_API_URL` pointing to your deployed Render backend URL (e.g., `https://your-backend.onrender.com/api`).
6. Deploy!
