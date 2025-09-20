import AdminLayout from "@/layouts/admin_layout/AdminLayout";
import Users from "@/pages/admin/user/page";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        path: "admin",
        element: <AdminLayout />,
        children: [
            {
                path: "users/view-users",
                element: <Users />
            }
        ]
    }
]);
export default router