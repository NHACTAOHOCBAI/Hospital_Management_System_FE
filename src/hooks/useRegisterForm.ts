"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useRegisterUser } from "@/hooks/queries/useUser";

// Define the registration schema with comprehensive validation
export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be at most 20 characters")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores"
      ),

    email: z.string().email("Please enter a valid email address"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Error will be attached to confirmPassword field
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

export function useRegisterForm() {
  const { mutate: register, isPending } = useRegisterUser();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    register(
      {
        fullName: data.username,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          toast.success("Registration successful!");
          form.reset();
        },
        onError: (error) => {
          toast.error(`Registration failed: ${error.message}`);
        },
      }
    );
  };

  return {
    form,
    onSubmit,
    isPending,
  };
}
