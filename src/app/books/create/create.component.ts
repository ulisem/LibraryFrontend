import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BookService } from 'src/app/services/book.service';
import { AuthService } from 'src/app/services/auth.service';

import {MatSnackBar} from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { AutorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

 
  stateCtrl = new FormControl();
  public books: any;
  public data: any = [];
  public authors: any = [];
  public charge: boolean = false;
  public showTable: boolean = false;
  public idBook:string;

  public readerSearch: FormGroup;
  hide: boolean = true;

  constructor(
    private booksService: BookService,
    private readerService:AuthService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private authorService: AutorService,
    private router:Router,
    private route:ActivatedRoute
  ) {

  }

  ngOnInit() {

    this.readerSearch = this.fb.group({
      title: ['', [Validators.required]],
      isbn: ['', [Validators.required, Validators.minLength(9)]],
      PublicationYear:['', [Validators.required]],
      edition: ['', [Validators.required,]],
      description: ['', Validators.required],
      quantity: ['', [Validators.required,]],
      location: ['', [Validators.required,]],
      img: ['', [Validators.required,]],
      author: ['', [Validators.required,]]
    });
    console.log(this.route.snapshot.params["id"]);
    this.idBook = this.route.snapshot.params["id"];
    if(this.idBook != null){
      this.getBook();
    }
    this.getAllAuthors();
    this.getMeUser();
    

  }


  async getMeUser(){

    try {
      const data = await this.readerService.getReaderInfo();
      this.data = data;
      console.log(this.data);
      this.readerSearch.patchValue(this.data);
      this.readerSearch.controls["password"].setValue('');
    } catch (error) {
      
    }

  }

  async getBook(){
    try {
      const book:any = await this.booksService.getBookById(this.idBook);
     this.readerSearch.patchValue(book);
      let authores:any=[];
      for(const autor of book.author){
        authores.push(autor.id);
      }

      this.readerSearch.controls["author"].setValue(authores);
      
    } catch (error) {
      
    }
  }

  async updateReader(){
    try {

      const result = await this.readerService.patchReader(this.data.id,this.readerSearch.value);
      this._snackBar.open("Usuario Actualizado con exito","", {
        duration:   5000,
        verticalPosition: "top",
        horizontalPosition: "right"
      });
      
    } catch (error) {
      this._snackBar.open("Error al actualizar usuario","", {
        duration:   5000,
        verticalPosition: "top",
        horizontalPosition: "right"
      });
      
    }

  }


  async getAllAuthors(){
    try {
     const autors = await this.authorService.getAllAuthor(); 
     console.log(autors);
     this.authors = autors;
    } catch (error) {
      
    }
  }


  async createBook(){
    try {
      const result = await this.booksService.createBook(this.readerSearch.value);
      console.log(result);
      this._snackBar.open("Libro Creado con exito","", {
        duration:   5000,
        verticalPosition: "top",
        horizontalPosition: "right"
      });
      this.router.navigate(["book/admin"]);
    } catch (error) {
      this._snackBar.open("error al crear Libro ","", {
        duration:   5000,
        verticalPosition: "top",
        horizontalPosition: "right"
      });
    }
  }

  async updateBook(){
    try {
      console.log(this.idBook);
      const result = await this.booksService.updateBook( this.idBook,this.readerSearch.value);
      console.log(result);
      this._snackBar.open("Libro actualizado con exito","", {
        duration:   5000,
        verticalPosition: "top",
        horizontalPosition: "right"
      });
      this.router.navigate(["book/admin"]);
    } catch (error) {
      this._snackBar.open("error al actualizar Libro ","", {
        duration:   5000,
        verticalPosition: "top",
        horizontalPosition: "right"
      });
    }
  }

}
