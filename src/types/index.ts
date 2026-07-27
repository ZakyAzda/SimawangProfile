// Tipe response standar untuk semua API
export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };

// Helper untuk membuat response sukses
export function okResponse<T>(data: T): ApiResponse<T> {
  return { success: true, data };
}

// Helper untuk membuat response error
export function errResponse(error: string): ApiResponse<never> {
  return { success: false, error };
}
