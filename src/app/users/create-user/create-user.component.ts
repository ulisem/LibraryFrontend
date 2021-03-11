import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BookService } from 'src/app/services/book.service';
import { AuthService } from 'src/app/services/auth.service';

import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  
  stateCtrl = new FormControl();
  public books: any;
  public data: any = [];
  public charge: boolean = false;
  public showTable: boolean = false;

  public readerSearch: FormGroup;
  public idReader:string;
  hide: boolean = true;

  constructor(
    private booksService: BookService,
    private readerService:AuthService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.readerSearch = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      firstname:['', [Validators.required,]],
      lastname: ['', [Validators.required,]],
      createdDate: ['', ],
      phoneNumber: ['', [Validators.required,]],
      state: ['', [Validators.required,]],
      city: ['', [Validators.required,]],
      neigborhood: ['', [Validators.required,]],
      street: ['', [Validators.required,]],
      extnumber: ['', [Validators.required,]],
      intnumber: ['', []] ,
      debt: ['', []],
      img: ['',[]]
    });
    //this.getMeUser();
    this.idReader = this.route.snapshot.params["id"];
    if(this.idReader != null){
      this.getMeUser();

    }
    

  }


  async getMeUser(){

    try {
      const data = await this.readerService.getReaderById(this.idReader);
      this.data = data;
      console.log(this.data);
      this.readerSearch.patchValue(this.data);
      this.readerSearch.controls["password"].setValue('');
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
      this.router.navigate(["user/reader"]);
      
    } catch (error) {
      this._snackBar.open("Error al actualizar usuario","", {
        duration:   5000,
        verticalPosition: "top",
        horizontalPosition: "right"
      });
      
    }

  }


  async createReader(){
    try {
        const result = await this.readerService.createReader(this.readerSearch.value);
        this._snackBar.open("Lector creado con exito","", {
          duration:   5000,
          verticalPosition: "top",
          horizontalPosition: "right"
        });

      this.router.navigate(["user/reader"]);
    } catch (error) {
      this._snackBar.open("Lector creado sin exito","", {
        duration:   5000,
        verticalPosition: "top",
        horizontalPosition: "right"
      });
    }
  }

}
