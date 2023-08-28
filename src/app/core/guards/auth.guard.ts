import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authServise = inject(AuthService);
  const router = inject(Router);
  const auth = authServise.isLoggedIn();

  if (!auth) {
    router.navigateByUrl('/');
    return false;
  }

  return true;
};
