import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { CreateUsuarioRequest, UsuarioResponse } from '../models/usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  create(data: CreateUsuarioRequest): Observable<UsuarioResponse> {
    return this.http.post<UsuarioResponse>(`${this.API_URL}/usuarios`, data);
  }
}
