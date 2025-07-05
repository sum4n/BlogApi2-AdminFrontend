import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Login from "./components/Login/Login.jsx";
import NewPost from "./components/NewPost/NewPost.jsx";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "/user/login", element: <Login /> },
      { path: "/posts/new", element: <NewPost /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
