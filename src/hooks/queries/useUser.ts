import { deleteUsers, getUsers } from "@/services/user.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useUsers = (params: QueryParams) =>
    useQuery({
        queryKey: ['users', params],
        queryFn: () => getUsers(params),
    });
const useDeleteUsers = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteUsers,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });
}
export { useUsers, useDeleteUsers }