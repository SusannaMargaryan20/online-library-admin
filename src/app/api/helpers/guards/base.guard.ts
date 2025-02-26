import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../auth-service.service';

@Injectable()
export abstract class BaseAuthGuard implements CanActivate {
  protected authService = inject(AuthService);
  protected activatedRoute = inject(ActivatedRoute);
  protected router = inject(Router);

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    // Directly check the user token stored in the browser's localStorage
    const token = this.authService.getUserTokenFromStorage();
    if (token && token.trim()) {
      return this.checkSuccessResponse();
    } else {
      return this.checkAuthFail();
    }
  }

  protected navigateByRole() {
    const token = this.authService.getUserTokenFromStorage();
    if (!token || token.trim() === '') {
      this.authService.removeAuth();
      this.router.navigate(['/auth'], { relativeTo: this.activatedRoute });
    } else {
      this.router.navigate(['/admin'], { relativeTo: this.activatedRoute });
    }
  }

  protected checkRoleOrNavigate() {
    const token = this.authService.getUserTokenFromStorage();
    if (token != null) {
      return true;
    } else {
      this.navigateByRole();
      return of(false);
    }
  }

  protected abstract checkAuthFail(): any;

  protected abstract checkSuccessResponse(): any;
}
