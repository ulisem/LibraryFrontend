import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public token = localStorage.getItem('token');
  private readerAuth = `${environment.api}/reader/sigin`;
  private adminAuth = `${environment.api}/admin/sigin`;
  private meReader = `${environment.api}/reader/test`;
  private meAdmin = `${environment.api}/admin/test`;
  public isLoggedIn = false;

  constructor(private http: HttpClient) { }

   readerLogin(email:string, password:string){
    const credentials = {
      email:email,
      password:password
    }
    return this.http.post(this.readerAuth,credentials).toPromise();

  }

   adminLogin(email:string, password:string){
    const credentials = {
      email:email,
      password:password
    }
    return this.http.post(this.adminAuth,credentials).toPromise();

  }

  getInfo() {
    return this.http.post(`${environment.api}/admin/test`,null ,{
      headers: {
        'Authorization': 'Bearer ' + this.token,
      }
    }).toPromise();
  }
}
