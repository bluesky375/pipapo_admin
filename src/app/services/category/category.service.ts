import { Injectable } from '@angular/core';
import { Http,  Headers } from '@angular/http';
import {API_BASE_URL} from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = API_BASE_URL+'/categories';
  constructor(private http: Http) { }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')); 
  }

  public getAllCategories() {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.apiUrl, { headers: headers });
  }
  public getCategoryById(id: number){
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.apiUrl+"/"+id, { headers: headers });
  }
  public deleteCategoryById(id: number){
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.delete(this.apiUrl+'/'+id, { headers: headers });
  }
  
}
