#  Resume Enhancer (React + Express)
## Deployed-Link (https://resume-enhancer-frontend.onrender.com)

A web-based resume editor that allows users to upload their `.pdf` or `.docx` resume, edit content, and enhance sections with AI-powered mock suggestions. Built with React.js (frontend) and Express.js (backend).

---

## Features

-  Upload `.pdf` or `.docx` resume (mock parsed)
-  Edit name, summary, education, and skills
-  Enhance each section using AI (mocked responses)
-  Save enhanced resume to server as `.json`
-  Download resume JSON file locally

---

## Tech Stack

### Frontend:
- React.js (Vite)
- Axios
- CSS Modules / Custom Styling

### Backend:
- Node.js + Express.js
- Multer (for file uploads)
- Mock AI Enhancement
- FileSystem for save/download

---

##  Getting Started
### Prerequisites:
- Node.js installed

---

### Backend Setup

```bash
cd backend
npm install
node app.js

cd frontend
npm install
npm run dev
