import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.prod";
import { Observable } from "rxjs";
import { LoginReqModel } from "./req/login-req.model";

@Injectable({
    providedIn: "root"
})
export class UserService {

    private http = inject(HttpClient);
    private apiUrl = environment.url;
  
    getUsers(page: Number): Observable<any> {
      const params = new HttpParams()
        .set('page', page.toString())
  
      return this.http.get<any>(`${this.apiUrl}users`, {params});
    }

    postApiUsersessionAdd(userModel: any): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}add`, userModel);
    }

    putApiUsersessionEdit(userModel: any): Observable<any> {
      return this.http.put<any>(`${this.apiUrl}users/${userModel.id}`, userModel);
    }

    deleteApiUsersession(userId: number): Observable<any> {
      return this.http.delete<any>(`${this.apiUrl}users/${userId}`);
    }

    postApiUsersessionLogin(userModel: LoginReqModel): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}login`, userModel);
    }

    postApiUsersessionLogOut(): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}logout`, {});
    }
}