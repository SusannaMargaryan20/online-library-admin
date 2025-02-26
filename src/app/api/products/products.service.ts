import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class ProductsService {

    private http = inject(HttpClient);
    private apiUrl = 'https://fakerapi.it/api/v2/';
  
    getProducts(page: Number): Observable<any> {
      const params = new HttpParams()
        .set('_quantity', page.toString())
  
      return this.http.get<any>(`${this.apiUrl}products`, {params});
    }

}