# Next.js Green Screen App

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Development Server](#running-the-development-server)
  - [Environment Variables](#environment-variables)
- [Docker Setup](#docker-setup)
- [Learn More](#learn-more)
- [Deploy on Vercel](#deploy-on-vercel)

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14.x or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/get-started) (if using Docker)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. Install dependencies:

   npm install

   # or

   yarn install

### Running the Development Server

1. Create a .env.local file in the root directory with your API credentials:
   NEXT_PUBLIC_BASE_URL=https://api.themoviedb.org/3
   NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here

2. Run the development server:
   npm run dev

   # or

   yarn dev

3. Open http://localhost:3000 in your browser to view the app.

### Environment Variables

    NEXT_PUBLIC_BASE_URL: Base URL for the API.
    NEXT_PUBLIC_TMDB_API_KEY: API key for accessing the movie database.

## Docker Setup

To build and run the app using Docker Compose:

1. Build the Docker image:

   docker-compose build

2. Start the Docker container:

   docker-compose up

The application will be available at http://localhost:3000.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
