import { LoginForm } from "@/components/auth/login-form";

export default function Page() {
    return (
        <div
            className="flex min-h-svh w-full items-center justify-center bg-cover bg-center p-6 md:p-10"
            style={{
                backgroundImage: "url('/auth-background.png')",
            }}
        >
            <div className="w-full max-w-sm">
                <LoginForm />
            </div>
        </div>
    );
}
