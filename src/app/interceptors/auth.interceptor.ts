import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  // Clonar la petición y agregar el header de autorización si hay token
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Manejar errores de autenticación
  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        // Token expirado o inválido
        authService.logout();
      }
      return throwError(() => error);
    }),
  );
};
