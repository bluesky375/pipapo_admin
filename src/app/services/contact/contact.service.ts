import { Injectable } from '@angular/core';
import { Http,  Headers } from '@angular/http';
import {API_BASE_URL} from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = API_BASE_URL+'/contacts';
  constructor(private http: Http) { }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')); 
  }

  public getContact() {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.apiUrl, { headers: headers });
  }

  public insertNewContact( contact: any){
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(this.apiUrl , contact, { headers: headers });
  }
  
  public updatecontact(id: number, contact: any){
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.put(this.apiUrl+'/'+id , contact, { headers: headers });
  }
}

