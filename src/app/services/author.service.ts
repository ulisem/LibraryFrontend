import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AutorService {

    public token = localStorage.getItem('token');
    private getAuthor = `${environment.api}/author`;
    public isLoggedIn = false;

    constructor(private http: HttpClient) { }


    getAllAuthor() {
        return this.http.get(this.getAuthor).toPromise();

    }

    createAuthor(data:any){
      return this.http.post(this.getAuthor,data,{
        headers: {
            'Authorization': 'Bearer ' + this.token,
        }
      }).toPromise();
    }

    deleteAuthor(id:string){
        return this.http.delete(this.getAuthor+"/"+id,{
            headers: {
                'Authorization': 'Bearer ' + this.token,
            }
        }).toPromise();
    }

    getAuthorById(id:string){
        return this.http.get(this.getAuthor+"/"+id).toPromise();
    }

  
}
