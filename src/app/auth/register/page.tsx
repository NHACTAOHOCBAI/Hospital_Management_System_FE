import { RegisterForm } from "@/components/auth/register-form";
import { ICONS } from "@/constants/icons.enum";

export default function Register() {
  return (
    <div
      className="relative min-h-screen w-full bg-white"
      data-name="Register Page"
    >
      {/* Base gradient layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-white to-teal-50" />

      {/* Radial overlays for depth - matching Figma design */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at 20% 30%, rgba(125,211,252,1) 0%, rgba(94,158,189,0.75) 12.5%, rgba(63,106,126,0.5) 25%, rgba(31,53,63,0.25) 37.5%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(20,184,166,1) 0%, rgba(15,138,125,0.75) 12.5%, rgba(10,92,83,0.5) 25%, rgba(5,46,42,0.25) 37.5%, transparent 50%)`,
        }}
      />

      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgb(0 0 0) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 flex min-h-screen w-full items-center justify-center py-8">
        <div className="flex w-full max-w-md flex-col items-center justify-center gap-5 px-4">
          {/* Header with Icon and Title */}
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-3xl bg-sky-600 p-3 text-white shadow-[0px_1px_4px_0px_rgba(0,0,0,0.15)]">
              {ICONS.HOSPITAL}
            </div>
            <h1 className="text-center text-base font-normal leading-6 tracking-[-0.3125px] text-neutral-950">
              Hospital Management System
            </h1>
          </div>

          {/* Register Form Card */}
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
