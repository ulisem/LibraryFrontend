import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BookService } from 'src/app/services/book.service';
import { AuthService } from 'src/app/services/auth.service';

import {MatSnackBar} from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.scss']
})
export class CreateAdminComponent implements OnInit {

 
  stateCtrl = new FormControl();
  public books: any;
  public data: any = [];
  public charge: boolean = false;
  public showTable: boolean = false;
  public roles:string[]=["ADMINISTRADOR","BIBLIOTECARY"];
  public idAdmin:string;

  public readerSearch: FormGroup;
  hide: boolean = true;

  constructor(
    private booksService: BookService,
    private readerService:AuthService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router:Router,
    private route:ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.readerSearch = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      firstname:['', [Validators.required,]],
      lastname: ['', [Validators.required,]],
      phoneNumber: ['', [Validators.required,]],
      role: ['', [Validators.required]]
      });

      this.idAdmin = this.route.snapshot.params["id"]
      if(this.idAdmin != null){


      this.getMeUser();
      }

  }


  async getMeUser(){

    try {
      const data = await this.readerService.getAdminById(this.idAdmin);
      this.data = data;
      console.log(this.data);
      this.readerSearch.patchValue(this.data);
      this.readerSearch.controls["password"].setValue('');
    } catch (error) {
      
    }

  }

  async createAdmin(){
    try {

      const result = await this.readerService.createAdmin(this.readerSearch.value);
      this._snackBar.open("Administrador creado con exito","", {
        duration:   5000,
        verticalPosition: "top",
        horizontalPosition: "right"
      });
      this.router.navigate(["user/admin"]);
      
    } catch (error) {
      this._snackBar.open("Error al crear administrador","", {
        duration:   5000,
        verticalPosition: "top",
        horizontalPosition: "right"
      });
      
    }

  }


  async updateAdmin(){
    try {

      const result = await this.readerService.updateAdmin(this.idAdmin,this.readerSearch.value);
      this._snackBar.open("Administrador actualizado con exito","", {
        duration:   5000,
        verticalPosition: "top",
        horizontalPosition: "right"
      });
      this.router.navigate(["user/admin"]);
      
    } catch (error) {
      this._snackBar.open("Error al actualizar administrador","", {
        duration:   5000,
        verticalPosition: "top",
        horizontalPosition: "right"
      });
      
    }

  }

}
