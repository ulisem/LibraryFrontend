import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class BookService {

    public token = localStorage.getItem('token');
    private getBooks = `${environment.api}/book`;
    private getBookByTitle = `${environment.api}/book?title=`;
    private getBooksByAuthor = `${environment.api}/book?author=`;
    private meReader = `${environment.api}/reader/test`;
    private meAdmin = `${environment.api}/admin/test`;
    public isLoggedIn = false;

    constructor(private http: HttpClient) { }


    getAllBooks() {
        return this.http.get(this.getBooks).toPromise();

    }

    deleteBook(id:string){
        return this.http.delete(this.getBooks+"/"+id,{
            headers: {
                'Authorization': 'Bearer ' + this.token,
            }
        }).toPromise();
    }

    getBookById(id:string){
        return this.http.get(this.getBooks+"/"+id).toPromise();
    }

    getBooksByTitle(search: string) {
        return this.http.get(this.getBookByTitle + search).toPromise();
    }

    getBooksByAuthors(search: string) {
        return this.http.get(this.getBooksByAuthor + search).toPromise();
    }
    getInfo() {
        return this.http.post(`${environment.api}/admin/test`, null, {
            headers: {
                'Authorization': 'Bearer ' + this.token,
            }
        }).toPromise();
    }
}
