import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private logger = new Subject<boolean>();
  public adminToken:string;
  public readerToken:string;
  private readerAuth = `${environment.api}/reader/sigin`;
  private adminAuth = `${environment.api}/admin/sigin`;
  private updateReader = `${environment.api}/reader/`;

  public isLoggedIn:boolean = false;
  public token : string;
  public currentUser;
  public type: string;
  public auth$: Subject<{isLoggedIn: boolean, token?: string, currentUser?: any }> = new Subject()
 

  constructor(private http: HttpClient,
    private storageService: StorageService) { 
    this.isLoggedIn = storageService.get('isLoggedIn') == 'true' || false;
    this.token = storageService.get('token') || '';
    this.adminToken = storageService.get('adminToken') || '';
    this.readerToken = storageService.get('readerToken') || '';
    this.currentUser = storageService.get('currentUser') ? JSON.parse(storageService.get('currentUser')) : null;
    this.auth$.next({isLoggedIn: this.isLoggedIn, token: this.token, currentUser: this.currentUser})
    }

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
    return this.http.post(`${environment.api}/admin/me`,null ,{
      headers: {
        'Authorization': 'Bearer ' + this.token,
      }
    }).toPromise();
  }

  getAllAdmins(){
    return this.http.get(`${environment.api}/admin` ,{
      headers: {
        'Authorization': 'Bearer ' + this.token,
      }
    }).toPromise();
  }

  getAllReader(){
    return this.http.get(`${environment.api}/reader` ,{
      headers: {
        'Authorization': 'Bearer ' + this.token,
      }
    }).toPromise();
  }

  createAdmin(data:any){
    return this.http.post(`${environment.api}/admin/signup`,data ,{
      headers: {
        'Authorization': 'Bearer ' + this.token,
      }
    }).toPromise();
  }


  createReader(data:any){
    return this.http.post(`${environment.api}/reader/signup`,data ,{
      headers: {
        'Authorization': 'Bearer ' + this.token,
      }
    }).toPromise();
  }

  updateAdmin(id:string,data:any){
    return this.http.patch(`${environment.api}/admin/${id}`,data ,{
      headers: {
        'Authorization': 'Bearer ' + this.token,
      }
    }).toPromise();
  }

  deleteAdmin(id:string){
    return this.http.delete(`${environment.api}/admin/${id}`,{
      headers: {
      'Authorization': 'Bearer ' + this.token,
    }
    }).toPromise()
  }

  deleteReader(id:string){
    return this.http.delete(`${environment.api}/reader/${id}`,{
      headers: {
      'Authorization': 'Bearer ' + this.token,
    }
    }).toPromise()
  }

  getReaderInfo() {
    return this.http.post(`${environment.api}/reader/me`,null ,{
      headers: {
        'Authorization': 'Bearer ' + this.token,
      }
    }).toPromise();
  }

  patchReader(id:string,data:any) {
    return this.http.patch(`${environment.api}/reader/${id}`,data ,{
      headers: {
        'Authorization': 'Bearer ' + this.token,
      }
    }).toPromise();
  }

  getAdminById(id:string){
    return this.http.get(`${environment.api}/admin/${id}` ,{
      headers: {
        'Authorization': 'Bearer ' + this.token,
      }
    }).toPromise();
  }


  getReaderById(id:string){
    return this.http.get(`${environment.api}/reader/${id}` ,{
      headers: {
        'Authorization': 'Bearer ' + this.token,
      }
    }).toPromise();
  }



  public logOut() {
    this.isLoggedIn = false;
    this.auth$.next({isLoggedIn: false})
  }

  public async registerLoginAdmin(token){
    console.log("admin here");
    try {
      this.token = token;
      this.adminToken = token;
      this.currentUser = await this.getInfo()
      this.isLoggedIn = true;
      this.type = this.currentUser.role;
      this.storageService.set("type",this.type);
      this.storageService.set("token",token)
      this.storageService.set("adminToken",token)
      this.storageService.set("isLoggedIn",true)
      this.storageService.set("currentUser", JSON.stringify(this.currentUser))
      console.log(this.currentUser,"heeey");
      this.auth$.next({isLoggedIn: true, token, currentUser: this.currentUser})
    } catch(err) {
      throw { status: 500 }
    }

  }

  public async registerLoginReader(token){
    console.log("reader here");
    try {
      this.token = token;
      this.readerToken = token;
      this.currentUser = await this.getReaderInfo()
      this.isLoggedIn = true;
      this.storageService.set("token",token)
      this.storageService.set("readerToken",token)
      this.storageService.set("isLoggedIn",true)
      this.storageService.set("currentUser", JSON.stringify(this.currentUser))
      this.auth$.next({isLoggedIn: true, token, currentUser: this.currentUser})
    } catch(err) {
      throw { status: 500 }
    }

  }


}
