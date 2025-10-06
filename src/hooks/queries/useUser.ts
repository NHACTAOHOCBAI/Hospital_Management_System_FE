import { deleteUsers, getUsers, registerUser } from "@/services/user.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useUsers = (params: QueryParams) =>
  useQuery({
    queryKey: ["users", params],
    queryFn: () => getUsers(params),
  });
const useDeleteUsers = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUsers,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
//hook cho dang ky user
const useRegisterUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
export { useUsers, useDeleteUsers, useRegisterUser };
