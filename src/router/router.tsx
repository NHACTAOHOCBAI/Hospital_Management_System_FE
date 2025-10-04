import AdminLayout from "@/layouts/admin_layout/admin-layout";
import Users from "@/pages/admin/user/page";
<<<<<<< Updated upstream
import Login from "@/pages/auth/login/page";
import Register from "@/pages/auth/register/page";
import { createBrowserRouter, Navigate } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
=======
import { createBrowserRouter, Navigate } from "react-router";

const router = createBrowserRouter([
  //Thêm route cho trang chủ để redirect
  {
    path: "/",
    element: <Navigate to="/admin" replace />,
>>>>>>> Stashed changes
  },
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      {
        path: "users/view-users",
        element: <Users />,
      },
    ],
  },
<<<<<<< Updated upstream
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

=======
  // Them route cho trang register
  {
    path: "/register",
  },
]);
>>>>>>> Stashed changes
export default router;
