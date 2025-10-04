import { useState } from "react";
import { toast } from "sonner";
import { useRegisterUser } from "@/hooks/queries/useUser";

export interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function useRegisterForm() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { mutate: register, isPending } = useRegisterUser();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    register(
      {
        fullName: formData.username,
        email: formData.email,
        password: formData.password,
      },
      {
        onSuccess: () => {
          toast.success("Registration successful!");
          setFormData({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
        },
        onError: (error) => {
          toast.error(`Registration failed: ${error.message}`);
        },
      }
    );
  };

  return {
    formData,
    isPending,
    handleChange,
    handleSubmit,
  };
}
