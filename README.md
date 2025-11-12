# Authentication App (Babylon Demo)

An authentication app built with Next.js 16, React 19, Firebase Authentication, and Firestore, showcasing user registration & login.

## Features

- **User Registration**: Create new accounts with email and password
- **User Login**: Secure authentication with Firebase
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS

## Project Structure

```
.
├── register/          # User registration page
├── login/             # User login page
├── homepage/          # Protected dashboard page
├── firebase.ts        # Firebase configuration
├── layout.tsx         # Root layout component
├── page.tsx          # Landing page
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase account with a project configured

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Babylon-Submission
```

2. Install dependencies:
```bash
npm install
```

3. Configure Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication (Email/Password provider)
   - Create a Firestore database
   - Update `firebase.ts` with your configuration (or use environment variables)

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser
