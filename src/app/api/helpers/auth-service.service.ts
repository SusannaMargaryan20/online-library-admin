import { inject, Injectable, signal } from "@angular/core";
import { Observable, tap } from "rxjs";
import { Router } from "@angular/router";
import { LoginReqModel } from "../user/req/login-req.model";
import { UserService } from "../user/user.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  private readonly storageUserToken: string = 'User-Token';

  private router = inject(Router);
  private userService = inject(UserService)


  async logout() {
    const res = await this.userService.postApiUsersessionLogOut().toPromise();
    if (res) {
      this.removeAuth();
      this.router.navigate(['/auth/login']);
    }
  }


  public login(data: LoginReqModel): Observable<any> {
    return this.userService.postApiUsersessionLogin(data)
      .pipe(
        tap((res) => {
          if (res !== null && res.token) {
            this.saveUserTokenToStorage(res.token);
          } else {
            this.removeAuth();
            throw res;
          }
        }),
      );
  }




  saveUserTokenToStorage(value: any): void {
    localStorage.setItem(this.storageUserToken, JSON.stringify(value));
  }


  getUserTokenFromStorage(): any {
    const value = localStorage.getItem(this.storageUserToken);
    if (value) {
      return JSON.parse(value);
    }
  }


  removeUserTokenStorage(): void {
    localStorage.removeItem(this.storageUserToken);
  }


  public removeAuth(): void {
    this.removeUserTokenStorage();
  }

}