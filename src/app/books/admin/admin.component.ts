import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { BookService } from 'src/app/services/book.service';
import { Router } from '@angular/router';

export interface Book {
  publicationYear: string;
  description: string;
  edition: number;
  img: string,
  isbn: string,
  location:string,
  quantity: number,
  title: string
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  
  stateCtrl = new FormControl();
  filteredStates: Observable<Book[]>;
  public books:any;
  public data:any=[];
  public type:string = "Admin";
  public charge:boolean=false;
  public showTable:boolean=false;

  public readerSearch: FormGroup;


  constructor(
    private booksService:BookService,
    private fb:FormBuilder,
    private router:Router
        ) {
  
  }

  ngOnInit(){
    this.readerSearch = this.fb.group({
      search: ['', [Validators.required, Validators.minLength(2)]],
      type: ['', [Validators.required]]
    });
    this.getAllbooks();
 
  }

  async getAllbooks(){
    try {
      this.charge = true;
   this.books =  await this.booksService.getAllBooks();
  this.data = this.books;
   console.log(this.books);
   setTimeout(() => {
     
    this.charge = false;
    this.showTable = true;
   }, 1500);
   
    } catch (error) {
      
    }
  }

  public goToCreateBook(){
    this.router.navigate(["book/create"]);

  }

  


}
