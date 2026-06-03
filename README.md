# ReadVault

A modern digital library and book discovery platform built with Next.js 16, React 19, Tailwind CSS v4, and DaisyUI 5. ReadVault enables users to explore, organize, and manage books through a secure, responsive, and user-friendly experience powered by Better Auth and MongoDB.

## Live Demo

🔗 https://assignment-08-blond.vercel.app/

## Repository

🔗 https://github.com/rajking69/Assignment-08

---

## Features

- Secure authentication with Better Auth
- Optional Google OAuth sign-in
- Browse and discover books through an intuitive interface
- Advanced search and filtering functionality
- Personalized user experience
- MongoDB-powered data management
- Responsive design for desktop and mobile devices
- Smooth animations and modern UI components

---

## Tech Stack

### Frontend
- Next.js 16
- React 19
- Tailwind CSS v4
- DaisyUI 5
- Framer Motion
- React Icons

### Authentication
- Better Auth
- Google OAuth

### Database
- MongoDB

### Forms & Notifications
- React Hook Form
- Sonner

### Language
- JavaScript

---

## Installation

Clone the repository:

```bash
git clone https://github.com/rajking69/Assignment-08.git
cd Assignment-08
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file:

```env
BETTER_AUTH_SECRET=your_secret_key
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

---

## Project Structure

```text
src/
├── app/
│   ├── api/
│   ├── Components/
│   ├── Login/
│   ├── Registration/
│   ├── Books/
│   ├── BookDetails/
│   └── Profile/
│
├── lib/
│   ├── auth.js
│   └── auth-client.js
│
├── middleware.js
│
public/
```

---

## Authentication

ReadVault uses Better Auth for secure authentication and session management.

Supported login methods:

- Email & Password Authentication
- Google OAuth Authentication

Protected routes are secured through middleware-based authentication.

---

## Key Functionalities

### Book Discovery
- Browse available books
- View detailed book information
- Explore curated collections

### Search & Filtering
- Search books by title
- Filter books efficiently
- Improved content discovery

### User Experience
- Personalized interactions
- Responsive design
- Modern animations and transitions

### Data Management
- MongoDB integration
- Secure data storage
- Efficient content handling

---

## Deployment

### Vercel

Build the application:

```bash
npm run build
```

Configure the required environment variables in the Vercel dashboard and deploy.

### Production Notes

- Set `BETTER_AUTH_URL` to your deployed domain.
- Configure MongoDB Atlas connection string.
- Enable Google OAuth credentials if social login is required.

---

## Tech Highlights

- Next.js 16 App Router
- React 19
- Better Auth Authentication
- MongoDB Integration
- Tailwind CSS v4
- DaisyUI 5
- Responsive UI Design
- Search & Filtering System
- Framer Motion Animations

---

## Author

**Sheikh Mohammad Rajking**

- Portfolio: https://smrajking.vercel.app
- GitHub: https://github.com/rajking69
- LinkedIn: https://www.linkedin.com/in/sheikh-mohammad-rajking-a6a485413/
