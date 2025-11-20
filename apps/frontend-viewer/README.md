# Frontend Viewer - Blog App

This is the frontend viewer for the **Chill Times** blog platform. It provides the UI for browsing posts, authenticating users, reading articles, and interacting with the app's features.

---

## Features

- Modern and responsive UI
- Like and Comment on blogs.
- Browse all blogs
- Read individual posts
- Authentication pages (login/signup)
- About & Contact pages
- Integrated with backend API

---

## Requirements

Before running this project, make sure you have:

- **Node.js** (recommended: latest LTS)
- **Yarn** package manager
- Backend server running (for API routes)

---

## Environment Setup

1. Locate the file named `.env.example` in the project root.
2. Create a new file named `.env`.
3. Copy all values from `.env.example` into `.env`.
4. Fill in the correct values for your local or production environment.

---

## Setup & Installation

Follow these steps to get the frontend running:

1. **Install dependencies:**

```bash
yarn install
```

2. **Generate Prisma configuration:**

```bash
yarn prisma generate
```

3. **Start the development server:**

```bash
yarn dev
```

The app will now be available at **<http://localhost:5173>** or the port shown in your terminal.

---

## Additional Notes

- Ensure your backend `.env` matches what the frontend expects.
- If the frontend cannot connect, double-check the API URL in your `.env`.
- Restart the dev server anytime you modify `.env`.

---

## License

This project is for personal / educational use unless a license is added.

---

Happy coding!
