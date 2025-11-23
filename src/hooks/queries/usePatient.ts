import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getPatients,
  deletePatients,
  createPatient,
  updatePatient,
} from "@/services/patient.service";

export function usePatients(params: QueryParams) {
  return useQuery({
    queryKey: ["patients", params],
    queryFn: () => getPatients(params),
  });
}

export function useDeletePatients() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePatients,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      toast.success("Patients deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete patients: ${error.message}`);
    },
  });
}

export function useCreatePatient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      toast.success("Patient created successfully");
    },
    onError: (error: Error) => {
      toast.error(`Failed to create patient: ${error.message}`);
    },
  });
}

export function useUpdatePatient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Partial<Omit<Patient, "id" | "createdAt">>;
    }) => updatePatient(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      toast.success("Patient updated successfully");
    },
    onError: (error: Error) => {
      toast.error(`Failed to update patient: ${error.message}`);
    },
  });
}
