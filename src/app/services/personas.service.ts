import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { CreatePersonaRequest, PersonaResponse } from '../models/persona.interface';

@Injectable({
  providedIn: 'root',
})
export class PersonasService {
  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  create(data: CreatePersonaRequest): Observable<PersonaResponse> {
    return this.http.post<PersonaResponse>(`${this.API_URL}/personas`, data);
  }

  getCreadas(desde?: string, hasta?: string): Observable<PersonaResponse[]> {
    let params = new HttpParams();
    if (desde) {
      params = params.append('desde', desde);
    }
    if (hasta) {
      params = params.append('hasta', hasta);
    }

    return this.http.get<PersonaResponse[]>(`${this.API_URL}/personas/creadas`, { params });
  }
}
