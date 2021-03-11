import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Book } from 'src/app/books/filter/filter.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponentList implements OnInit {

  stateCtrl = new FormControl();
  filteredStates: Observable<Book[]>;
  public books:any;
  public data:any=[];
  public type:string = "Admin";
  public charge:boolean=false;
  public showTable:boolean=false;

  public readerSearch: FormGroup;

  constructor(
    private router:Router,
    private authService:AuthService) { }

  ngOnInit(): void {

    this.getAdmins();

    
  }


  public goToCreateBook(){
    this.router.navigate(["user/admin/create"]);

  }


  public async getAdmins(){
    try {
      this.charge = true;
      const admins = await this.authService.getAllAdmins();
      console.log(admins);
      this.data = admins;
      setTimeout(() => {
        this.charge = false;
        this.showTable = true;
      }, 1500);
      
    } catch (error) {
      
    }

  }

}
