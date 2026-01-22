// Interfaces para Usuarios
export interface CreateUsuarioRequest {
  usuario: string;
  pass: string;
  personaId?: string;
}

export interface UsuarioResponse {
  identificador: string;
  usuario: string;
  fechaCreacion: string;
  personaId?: string;
}
