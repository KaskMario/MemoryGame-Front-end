import { CanActivateFn } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { AuthService } from './service/authService';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { catchError } from 'rxjs';
import { of } from 'rxjs';

export const authGuard: CanActivateFn =
  (route: ActivatedRouteSnapshot,
   state: RouterStateSnapshot) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.isLoggedIn().pipe(
      map(isLoggedIn => {
        if (isLoggedIn) {
          return true;
        } else {
          return router.createUrlTree(['/login']);
        }
      }),
      catchError(() => of(router.createUrlTree(['/login'])))
    );
  };
