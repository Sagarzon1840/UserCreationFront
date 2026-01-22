// Interfaces para Personas
export interface CreatePersonaRequest {
  nombres: string;
  apellidos: string;
  numeroIdentificacion: string;
  email: string;
  tipoIdentificacion: string;
}

export interface PersonaResponse {
  identificador: string;
  nombres: string;
  apellidos: string;
  numeroIdentificacion: string;
  email: string;
  tipoIdentificacion: string;
  fechaCreacion: string;
  idCompleto: string;
  nombreCompleto: string;
}
