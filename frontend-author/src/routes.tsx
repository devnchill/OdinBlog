import { createBrowserRouter } from "react-router";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ErrorPage from "./pages/ErrorPage";
import { Layout } from "./components/Layout";
import DashBoard from "./pages/DashBoard";
import BlogDetailPage from "./pages/BlogDetailPage";
import AddBlog from "./pages/AddBlog";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/signup", element: <SignUpPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/dashboard", element: <DashBoard /> },
      { path: "/write", element: <AddBlog /> },
      { path: "/blog/:slug", element: <BlogDetailPage /> },
    ],
    errorElement: <ErrorPage />,
  },
]);

export default router;
