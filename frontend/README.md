# AI Resume Builder

An AI-powered resume builder that helps you create professional resumes in minutes. Features include PDF parsing, AI-driven content extraction, and a real-time preview.

## Features

- **AI Resume Parsing**: Upload a PDF resume and let Gemini AI extract your details automatically.
- **Real-time Preview**: See your changes instantly as you edit.
- **User Authentication**: Secure signup and login to save your resumes.
- **Multiple Resumes**: Create and manage multiple versions of your resume.
- **Public Sharing**: Share a read-only link to your resume with recruiters.
- **PDF Download**: Download your polished resume as a PDF.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS (via custom CSS), Lucide React
- **Backend**: Node.js, Express, MongoDB
- **AI**: Google Gemini API
- **PDF Processing**: pdfjs-dist

## Setup

1.  **Clone the repository**
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Environment Variables**:
    Create a `.env` file in the `server` directory with the following:
    ```env
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    PORT=5001
    ```
    Create a `.env` file in the root directory with:
    ```env
    VITE_GOOGLE_API_KEY=your_gemini_api_key
    ```
4.  **Run the application**:
    ```bash
    npm start
    ```
    This command runs both the frontend and backend concurrently.

## License

MIT

