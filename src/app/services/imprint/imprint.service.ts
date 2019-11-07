import { Injectable } from '@angular/core';
import { Http,  Headers } from '@angular/http';
import {API_BASE_URL} from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class ImprintService {

  private apiUrl = API_BASE_URL+'/help';
  constructor(private http: Http) { }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')); 
  }
  
  public getContent() {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.apiUrl, { headers: headers });
  }

  public updateContent(item: string, help: any){
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.put(this.apiUrl+'/'+item , help, { headers: headers });
  }
  
  public getContentByKey(item: string){
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.apiUrl+'/'+item , { headers: headers });
  }
}
