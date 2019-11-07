import { Injectable } from '@angular/core';
import { Http,  Headers } from '@angular/http';
import {API_BASE_URL} from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private apiUrl = API_BASE_URL+'/restaurants';
  constructor(private http: Http) { }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')); 
  }

  public getRestaurant(){
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.apiUrl, { headers: headers });
  }

  public insertNewRestaurant( restaurant: any){
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(this.apiUrl , restaurant, { headers: headers });
  }
  
  public updateRestaurant(id: number, restaurant: any){
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.put(this.apiUrl+'/'+id , restaurant, { headers: headers });
  }
}


