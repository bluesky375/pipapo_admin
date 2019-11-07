import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../config/config'

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  private apiUrl = API_BASE_URL + '/gallery';
  constructor(private http: Http) { }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'));
  }

  public getAllGallery() {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.apiUrl, { headers: headers });
  }

  public getGalleryImageById(id: number) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.apiUrl + '/' + id, { headers: headers });
  }

  public deleteGalleryById(id: number) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.delete(this.apiUrl + '/' + id, { headers: headers });
  }


}
