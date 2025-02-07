# Real Estate App with OpenAI, LangChain, Convex, and Tailwind CSS

A real estate application that allows users to search properties in Seattle using natural language and get AI-powered recommendations based on their preferences.

## Features

- Search properties in Seattle using natural language queries
- Save favorite properties to the database
- Get AI-powered property recommendations using vector similarity search
- Responsive UI with Tailwind CSS
- Real-time updates with Convex database

## Tech Stack

### Frontend

- React 18
- Vite
- Tailwind CSS
- TanStack Router (formerly React Router)

### Backend

- Express.js
- Node.js
- Convex (for vector database)
- LangChain
- OpenAI

### APIs

- OpenAI API (for embeddings and natural language processing)
- Zillow API (via RapidAPI)

## Prerequisites

Before running the application, make sure you have:

- Node.js installed
- An OpenAI API key
- A RapidAPI key with access to the Zillow API
- A Convex account

## Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
OPENAI_API_KEY=your_openai_api_key
RAPID_API_KEY=your_rapid_api_key
VITE_CONVEX_URL=your_convex_url
```

## Installation & Setup

1. Install dependencies:

```bash
npm install
```

2. Log in to Convex (if not already logged in):

```bash
npx convex login
```

## Running the Application

You'll need three terminal windows to run all components:

1. Start the Convex development server:

```bash
npx convex dev
```

2. Start the Express backend server:

```bash
nodemon server.js
```

The server will run on http://localhost:3001

3. Start the frontend development server:

```bash
npm run dev
```

The app will be available at http://localhost:5174

## Project Structure

- `/src` - React frontend code
- `/convex` - Convex database schema and functions
- `server.js` - Express backend server
- `/public` - Static assets

## Contributing

Contributions are welcome! If you'd like to contribute to this project:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
