import { createBrowserRouter } from "react-router";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { AboutPage } from "@odinblog/blog-shared-components";
import { ContactPage } from "@odinblog/blog-shared-components";
import ErrorPage from "./pages/ErrorPage";
import { Layout } from "./components/Layout";
import DashBoard from "./pages/DashBoard";
import BlogDetailPage from "./pages/BlogDetailPage";
import AddBlog from "./pages/AddBlog";
import EditBlog from "./pages/EditBlog";

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
      { path: "/edit/:blogId", element: <EditBlog /> },
      { path: "/blog/:slug", element: <BlogDetailPage /> },
    ],
    errorElement: <ErrorPage />,
  },
]);

export default router;
