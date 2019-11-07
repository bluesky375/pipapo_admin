import { Injectable } from '@angular/core';
import { Http,  Headers } from '@angular/http';
import {API_BASE_URL} from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class BonusService {

  private apiUrl = API_BASE_URL+'/bonuses';
  constructor(private http: Http) { }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')); 
  }

  public getAllBonuses() {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.apiUrl, { headers: headers });
  }

 
  public deleteBonusById(id: number) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.delete(this.apiUrl + '/' + id, { headers: headers });
  }

  public insertNewBouns( bonus: any){
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(this.apiUrl , bonus, { headers: headers });
  }
  
  public updateBouns(id: number, bonus: any){
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.put(this.apiUrl+'/'+id , bonus, { headers: headers });
  }
  public getBonusById(id: number){
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.apiUrl+'/'+id ,{ headers: headers });
  }  
}
