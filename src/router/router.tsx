import AdminLayout from "@/layouts/admin_layout/admin-layout";
import Users from "@/pages/admin/user/page";
import Login from "@/pages/auth/login/page";
import Register from "@/pages/auth/register/page";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        path: "/",
        element: <>landing page</>
    },
    {
        path: "admin",
        element: <AdminLayout />,
        children: [
            {
                path: "users/view-users",
                element: <Users />
            },

        ]
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/login",
        element: <Login />
    },

]);
export default router