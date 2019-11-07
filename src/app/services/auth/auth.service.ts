import { Injectable } from '@angular/core';
import { User } from './../../interfaces/user/user';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = API_BASE_URL + '/signin';
  constructor(private http: Http) { }

  public login(userInfo: User): Observable<any> {

    const body = { 'email': userInfo.email, 'password': userInfo.password }
    return this.http.post(this.apiUrl, body);
  }

  public isLoggedIn() {
    return localStorage.getItem('ACCESS_TOKEN') !== null;

  }

  public logout() {
    localStorage.removeItem('ACCESS_TOKEN');
  }
}
