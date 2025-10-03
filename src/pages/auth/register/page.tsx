// register page 

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Register() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Register Page</h1>
            <Button asChild>
                <Link to="/login">Login</Link>
            </Button>
        </div>
    );
}