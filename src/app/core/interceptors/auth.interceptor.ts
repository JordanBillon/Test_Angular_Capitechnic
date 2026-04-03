import { HttpInterceptorFn } from '@angular/common/http';

// Intercepteur qui ajoute automatiquement le token d'auth à chaque requête HTTP
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cloned = req.clone({
    setHeaders: {
      AUTH_TOKEN: 'token123'
    }
  });
  return next(cloned);
};