import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }
  private token = null;
  private baseURL = 'http://localhost/dk-commerce/public/index.php/';

  allProducts() {
    const url = this.baseURL + `products`;
    return this.http.get(url);
  }

  login(email, password) {
    const request = this.http.post(`${this.baseURL}login`, { email, password }).toPromise();
    return request.then((result: any) => {
      console.log(result);
      this.token = result.api_key;
      return true;
    })
      .catch(error => {
        console.error(error);
        return false;
      });
  }

  register(email, password, name) {
    return this.http.post(`${this.baseURL}register`, { email, password, name }).toPromise();
  }

  logout() {
    const promise = this.http.post(`${this.baseURL}logout`, { api_key: this.token }).toPromise();
    return promise
      .then(() => {
        this.token = null;
        return true;
      })
      .catch(() => false);
  }

  isAuthorized() {
    return this.token ? true : false;
  }

  addProduct(title, description, variants= []) {
    return this.http.post(`${this.baseURL}product/create`, { title, description, variants, api_key: this.token });
  }

  editProduct(productId, title, description) {
    return this.http.post(`${this.baseURL}product/update`, { title, description, api_key: this.token });
  }

  loadAProduct(productId) {
    return this.http.get(`${this.baseURL}product/show/${productId}`);
  }

  deleteProduct(productId) {
    return this.http.post(`${this.baseURL}product/delete/${productId}`, { api_key: this.token });
  }

  addVariant(productId, color, price) {
    return this.http.post(`${this.baseURL}variant/add/${productId}`, { color, price, api_key: this.token });
  }

  editVariant(variantId, color, price) {
    return this.http.post(`${this.baseURL}variant/edit/${variantId}`, { color, price, api_key: this.token });
  }

  deleteVariant(variantId) {
    return this.http.post(`${this.baseURL}variant/delete/${variantId}`, { api_key: this.token });
  }

  search(query) {
    return this.http.get(`${this.baseURL}search/${query}`);
  }

}
