import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BookService } from 'src/app/services/book.service';
import { AuthService } from 'src/app/services/auth.service';

import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {

  stateCtrl = new FormControl();
  public books: any;
  public data: any = [];
  public charge: boolean = false;
  public showTable: boolean = false;

  public readerSearch: FormGroup;
  hide: boolean = true;

  constructor(
    private booksService: BookService,
    private readerService:AuthService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
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
}
