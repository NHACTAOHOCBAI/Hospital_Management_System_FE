import { LoginForm } from "@/components/auth/login-form";
import { Hospital } from "lucide-react";
const backgroundImage = "/public/assets/background 1.png";
export default function Page() {
    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-x-hidden overflow-y-auto">
            <img
                src={backgroundImage}
                alt="Hospital backdrop"
                className="fixed inset-0 -z-20 h-full w-full object-cover"
            />
            <div className="fixed inset-0 -z-10" />
            <div className="relative z-10 w-full max-w-md px-4 py-6 sm:px-6 sm:py-8 md:max-w-lg md:py-10">
                <div className="flex flex-col items-center gap-3 text-center sm:gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 shadow-[0_4px_15px_rgba(37,99,235,0.45)] sm:h-14 sm:w-14">
                        <Hospital className="h-7 w-7 text-white sm:h-8 sm:w-8" />
                    </div>
                    <div className="flex flex-col items-center gap-1.5 sm:gap-2">
                        <p className="min-w-[233px] text-balance text-base font-semibold text-slate-900 sm:text-lg">
                            Hospital Management System
                        </p>
                    </div>
                </div>
                <LoginForm className="mt-4 w-full sm:mt-5" />
            </div>
        </div>
    );
}
