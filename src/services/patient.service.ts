/* eslint-disable @typescript-eslint/no-explicit-any */

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const genders: Array<"Male" | "Female" | "Other"> = ["Male", "Female", "Other"];

let mockPatients: Patient[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  fullName: `Patient ${i + 1}`,
  dateOfBirth: new Date(
    1950 + Math.floor(Math.random() * 50),
    Math.floor(Math.random() * 12),
    Math.floor(Math.random() * 28) + 1
  )
    .toISOString()
    .split("T")[0],
  gender: genders[Math.floor(Math.random() * genders.length)],
  phone: `+84${Math.floor(Math.random() * 900000000 + 100000000)}`,
  email: `patient${i + 1}@hospital.com`,
  address: `${Math.floor(Math.random() * 999) + 1} Street ${i + 1}, District ${
    Math.floor(Math.random() * 12) + 1
  }, Ho Chi Minh City`,
  bloodType: bloodTypes[Math.floor(Math.random() * bloodTypes.length)],
  allergies: Math.random() > 0.7 ? "Penicillin, Pollen" : undefined,
  medicalHistory: Math.random() > 0.5 ? "Hypertension, Diabetes" : undefined,
  emergencyContact: `Emergency Contact ${i + 1}`,
  emergencyPhone: `+84${Math.floor(Math.random() * 900000000 + 100000000)}`,
  createdAt: new Date(
    Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000
  ).toISOString(),
  updatedAt: new Date().toISOString(),
}));

export const getPatients = async (params: QueryParams) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    sortOrder = "asc",
    sortBy = "id",
  } = params;

  // Filter by search
  let filtered = mockPatients.filter(
    (p) =>
      p.fullName.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()) ||
      p.phone.includes(search)
  );

  // Sort
  filtered = filtered.sort((a, b) => {
    const fieldA = (a as any)[sortBy];
    const fieldB = (b as any)[sortBy];
    if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
    if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  // Simulate 300ms delay
  await new Promise((r) => setTimeout(r, 300));

  return {
    pagination: {
      total: filtered.length,
      page,
      limit,
    },
    data: paginated,
  };
};

// Delete multiple patients
export const deletePatients = async (
  ids: number[]
): Promise<{ statusCode: number; message: string; deletedIds: number[] }> => {
  await new Promise((r) => setTimeout(r, 300));

  const existingIds = mockPatients.map((p) => p.id);
  const deletedIds = ids.filter((id) => existingIds.includes(id));

  mockPatients = mockPatients.filter((p) => !deletedIds.includes(p.id));

  return {
    statusCode: 200,
    message: `Deleted ${deletedIds.length} patient(s) successfully`,
    deletedIds,
  };
};

// Create new patient
export const createPatient = async (
  data: Omit<Patient, "id" | "createdAt" | "updatedAt">
): Promise<{ statusCode: number; message: string; patient: Patient }> => {
  await new Promise((r) => setTimeout(r, 300));

  // Check if email already exists
  if (mockPatients.some((p) => p.email === data.email)) {
    throw new Error(`Patient with email ${data.email} already exists.`);
  }

  const newPatient: Patient = {
    id:
      mockPatients.length > 0
        ? Math.max(...mockPatients.map((p) => p.id)) + 1
        : 1,
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  mockPatients.push(newPatient);

  return {
    statusCode: 201,
    message: "Patient created successfully",
    patient: newPatient,
  };
};

// Update existing patient
export const updatePatient = async (
  id: number,
  data: Partial<Omit<Patient, "id" | "createdAt">>
): Promise<{ statusCode: number; message: string; patient: Patient }> => {
  await new Promise((r) => setTimeout(r, 300));

  const index = mockPatients.findIndex((p) => p.id === id);
  if (index === -1) {
    throw new Error(`Patient with id ${id} not found.`);
  }

  mockPatients[index] = {
    ...mockPatients[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };

  return {
    statusCode: 200,
    message: "Patient updated successfully",
    patient: mockPatients[index],
  };
};
