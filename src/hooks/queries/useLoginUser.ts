import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useUserContext } from "@/contexts/UserContext";
import { loginUser } from "@/services/user.service";
import type { LoginRequest, LoginResponse } from "@/services/user.service";
import { useRouter } from "next/navigation";

export function useLoginUser() {
  const { setUser } = useUserContext();
  const router = useRouter();
  return useMutation<LoginResponse, any, LoginRequest>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.access_token);
      setUser(data.user); // cập nhật context
      toast.success("Login successful!");
      router.push("/");
    },
    onError: () => {
      // Không dùng toast, trả về cho form để hiển thị dưới input
    },
  });
}
