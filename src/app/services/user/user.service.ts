import { Injectable } from '@angular/core';
import { Http,  Headers } from '@angular/http';
import {API_BASE_URL} from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = API_BASE_URL+'/users';
  constructor(private http: Http) { }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')); 
  }

  public getAllUsers() {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.apiUrl, { headers: headers });
  }

  public updateUserActivityStatusById(id: number, active: any){
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.put(this.apiUrl+'/active/'+id , active, { headers: headers });
  }
  public getUserById(id: number){
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.apiUrl+'/'+id ,{ headers: headers });
  }  
}
