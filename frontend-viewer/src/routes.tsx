import { createBrowserRouter } from "react-router";
import SignUpScreen from "./pages/SignUpScreen";
import LoginScreen from "./pages/LoginScreen";
import HomeScreen from "./pages/HomeScreen";

const router = createBrowserRouter([
  {
    path: "/signup",
    element: <SignUpScreen />,
  },
  {
    path: "/login",
    element: <LoginScreen />,
  },
  {
    path: "/",
    element: <HomeScreen />,
  },
]);

export default router;
