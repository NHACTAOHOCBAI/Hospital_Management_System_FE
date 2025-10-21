/* eslint-disable @typescript-eslint/no-explicit-any */

let mockUsers: User[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  email: `user${i + 1}@mail.com`,
  fullName: `User ${i + 1}`,
  password: "******",
}));

export const getUsers = async (params: QueryParams) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    sortOrder = "asc",
    sortBy = "id",
  } = params;

  // Lọc theo search
  let filtered = mockUsers.filter(
    (u) =>
      u.fullName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  // Sắp xếp
  filtered = filtered.sort((a, b) => {
    const fieldA = (a as any)[sortBy];
    const fieldB = (b as any)[sortBy];
    if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
    if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Phân trang
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  // Mô phỏng delay 300ms
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
// 🗑️ API xóa nhiều user
export const deleteUsers = async (
  ids: number[]
): Promise<{ statusCode: number; message: string; deletedIds: number[] }> => {
  await new Promise((r) => setTimeout(r, 300)); // mô phỏng delay

  const existingIds = mockUsers.map((u) => u.id);
  const deletedIds = ids.filter((id) => existingIds.includes(id));

  // Giữ lại user chưa bị xoá
  mockUsers = mockUsers.filter((u) => !deletedIds.includes(u.id));

  return {
    statusCode: 200,
    message: `Deleted ${deletedIds.length} user(s) successfully`,
    deletedIds,
  };
};
//API ham dang ky moi , dung fake data tu mockUsers
export const registerUser = async (
  data: Omit<User, "id">
): Promise<{ statusCode: number; message: string; user: User }> => {
  await new Promise((r) => setTimeout(r, 300)); // mô phỏng delay

  //Kiểm tra email đã tồn tại chưa
  if (mockUsers.some((u) => u.email === data.email)) {
    throw new Error(`User with email ${data.email} already exists.`);
  }
  const newUser: User = {
    id: mockUsers.length > 0 ? Math.max(...mockUsers.map((u) => u.id)) + 1 : 1,
    ...data,
  };

  mockUsers.push(newUser);

  return {
    statusCode: 201,
    message: "User registered successfully",
    user: newUser,
  };
};

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: {
    id: number;
    email: string;
    fullName: string;
  };
}

// Fake login API (mock)
export async function loginUser(data: LoginRequest): Promise<LoginResponse> {
  await new Promise((r) => setTimeout(r, 300)); // mô phỏng delay
  const user = mockUsers.find(
    (u) => u.email === data.email && data.password === "12345678"
  );
  if (!user) {
    // Giả lập lỗi đăng nhập
    const error: any = new Error("Thông tin đăng nhập không hợp lệ");
    error.response = {
      data: { message: "Thông tin đăng nhập không hợp lệ" },
      status: 401,
    };
    throw error;
  }
  return {
    access_token: "FAKE_ACCESS_TOKEN",
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
    },
  };
}
