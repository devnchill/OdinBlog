import { createBrowserRouter } from "react-router";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { AboutPage } from "@odinblog/blog-shared-components";
import { ContactPage } from "@odinblog/blog-shared-components";
import BlogPage from "./pages/BlogPage";
import ErrorPage from "./pages/ErrorPage";
import { Layout } from "./components/Layout";
import BlogDetailPage from "./pages/BlogDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/blog", element: <BlogPage /> },
      { path: "/blog/:slug", element: <BlogDetailPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/signup", element: <SignUpPage /> },
      { path: "/login", element: <LoginPage /> },
    ],
    errorElement: <ErrorPage />,
  },
]);

export default router;
