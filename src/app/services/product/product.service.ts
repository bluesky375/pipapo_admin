import { Injectable } from '@angular/core';
import { Http,  Headers } from '@angular/http';
import {API_BASE_URL} from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = API_BASE_URL+'/products';
  constructor(private http: Http) { }
  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'));     
  }

  public getAllProducts() {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.apiUrl, { headers: headers });
  }

  public getProductById(id: number){
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.apiUrl+'/'+id, { headers: headers });
  }

  public deleteProductById(id: number){
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.delete(this.apiUrl+'/'+id, { headers: headers });
  }
}
