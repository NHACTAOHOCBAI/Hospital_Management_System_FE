

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Login() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Login Page</h1>
            <Button asChild>
                <Link to="/register">Register</Link>
            </Button>
        </div>
    );
}