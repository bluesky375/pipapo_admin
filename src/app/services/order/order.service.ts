import { Injectable } from '@angular/core';
import { Http,  Headers } from '@angular/http';
import {API_BASE_URL} from '../../config/config';
@Injectable({
  providedIn: 'root'
})
export class OrderService {


  private apiUrl = API_BASE_URL+'/orders';
  constructor(private http: Http) { }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')); 
  }

  public getAllOrders() {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.apiUrl, { headers: headers });
  }

  public edit(id: number) {
    
  }

  public delete(id: number) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.delete(this.apiUrl + '/' + id, { headers: headers });
  }

  public insert(file: File) {
    // body = {'filename': id.append('.png'), 'id': id, 'path': 'gallery/download/' + id};
    console.log('Here is image insert body: ');
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(this.apiUrl, file, { headers: headers });
  }

}
