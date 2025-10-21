import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useUserContext } from "@/contexts/UserContext";
import { loginUser } from "@/services/user.service";
import type { LoginRequest, LoginResponse } from "@/services/user.service";

export function useLoginUser() {
  const navigate = useNavigate();
  const { setUser } = useUserContext();

  return useMutation<LoginResponse, any, LoginRequest>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.access_token);
      setUser(data.user); // cập nhật context
      toast.success("Login successful!");
      navigate("/admin");
    },
    onError: () => {
      // Không dùng toast, trả về cho form để hiển thị dưới input
    },
  });
}
