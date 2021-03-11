import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class LoanService {

    public token = localStorage.getItem('token');
    private getLoanService = `${environment.api}/loan`;
    private createLoan = `${environment.api}/loan`;
    private getBooksByAuthor = `${environment.api}/book?author=`;
    private meReader = `${environment.api}/reader/test`;
    private meuser = `${environment.api}/loan/myUser`;
    public isLoggedIn = false;

    constructor(private http: HttpClient) { }


    getAllLoans(status:string) {
        return this.http.get(this.getLoanService+"?status="+status,{
            headers:{
                'Authorization': 'Bearer ' + this.token,
            }
        }).toPromise();

    }

    getLoanById(id:string){
        return this.http.get(this.getLoanService+"/"+id).toPromise();
    }

    getLoanByReader(){
        return this.http.get(this.meuser,{
            headers:{
                'Authorization': 'Bearer ' + this.token,
            }
        }).toPromise();
    }

  /*  getBooksByTitle(search: string) {
        return this.http.get(this.getBookByTitle + search).toPromise();
    }

    getBooksByAuthors(search: string) {
        return this.http.get(this.getBooksByAuthor + search).toPromise();
    }*/
    getInfo() {
        return this.http.post(`${environment.api}/admin/test`, null, {
            headers: {
                'Authorization': 'Bearer ' + this.token,
            }
        }).toPromise();
    }

    createLoans(body:any){
        return this.http.post(this.getLoanService, body,{
            headers: {
                'Authorization': 'Bearer ' + this.token,
            }
        }).toPromise();
    }

    approveLoan(id:string){
        return this.http.patch(this.getLoanService+"/approve/"+id,null,{
            headers: {
                'Authorization': 'Bearer ' + this.token,
            }
        }).toPromise();
    }

    returnLoan(id:string,idread:string){
       const  idReader = {
            idReader: idread
        }
        return this.http.patch(this.getLoanService+"/return/"+id,idReader,{
            headers: {
                'Authorization': 'Bearer ' + this.token,
            }
        }).toPromise();
    }


    revokeLoan(id:string){
        return this.http.patch(this.getLoanService+"/cancel/"+id,null,{
            headers: {
                'Authorization': 'Bearer ' + this.token,
            }
        }).toPromise();
    }
}
