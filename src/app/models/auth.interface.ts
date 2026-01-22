// Interfaces para Auth
export interface LoginRequest {
  usuario: string;
  pass: string;
}

export interface LoginResponse {
  accessToken: string;
  expiresAt: string; // ISO 8601
  sessionId: string; // GUID
  userId: string; // GUID
  usuario: string;
}
