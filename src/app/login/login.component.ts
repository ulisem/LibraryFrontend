import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  public AccessType:string;

  public readerLoginForm: FormGroup;
  public adminLoginForm:FormGroup;
  public readerSignUpForm: FormGroup;

  public showPassword: boolean = false;


  constructor(
    private fb:FormBuilder,
    private loginService:AuthService,
    private router:Router
  ) {

   }

  ngOnInit(): void {
    this.readerLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.adminLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.readerSignUpForm = this.fb.group({

    })
  }

  goToReader(){
    this.AccessType = "Reader";
  }

  goToAdmin(){
    this.AccessType = "Admin";
  }


  setShowPassword() {
    this.showPassword = !this.showPassword;
  }


  async logIn(){

    console.log(typeof( this.AccessType));

    try {
      if(this.AccessType.toString() === 'Reader'){
        console.log("reader");
        console.log(this.readerLoginForm.value);
        const response:any = await this.loginService.readerLogin(this.readerLoginForm.value.email,this.readerLoginForm.value.password);
        console.log(response);
        this.loginService.token = response.accesToken;
        this.loginService.readerToken = response.accesToken;
        this.loginService.registerLoginReader(response.accesToken);
        this.router.navigate(["/book/user"]);

      } if(this.AccessType.toString() === "Admin"){
        console.log("admin");
        const response:any = await this.loginService.adminLogin(this.readerLoginForm.value.email,this.readerLoginForm.value.password);
        console.log(response,"admin");
        this.loginService.token = response.accesToken;
        this.loginService.adminToken = response.accesToken;
       const result = await this.loginService.registerLoginAdmin(response.accesToken);
       setTimeout(() => {
         if(localStorage.getItem("type") == "ADMINISTRADOR"){

        this.router.navigate(["/book/admin"]);
         }else{

        this.router.navigate(["loan/admin/SOLICITADO"]);
         }
         
       }, 1200);

      }

    } catch (error) {
      console.log(error);
      
    }

  }


}
