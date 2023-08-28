import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

export const loginGuard: CanActivateFn = () => {
  const authServise = inject(AuthService);
  const router = inject(Router);
  const auth = authServise.isLoggedIn();

  if (auth) {
    router.navigateByUrl('/schedule');
    return false;
  }

  return true;
};
