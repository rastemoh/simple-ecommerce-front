import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }
  private baseURL = 'http://localhost/dk-commerce/public/index.php/';

  allProducts() {
    const url = this.baseURL + `products`;
    return this.http.get(url);
  }
}
