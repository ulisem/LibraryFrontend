import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Book } from 'src/app/books/filter/filter.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-readers',
  templateUrl: './readers.component.html',
  styleUrls: ['./readers.component.scss']
})
export class ReadersComponent implements OnInit {


  stateCtrl = new FormControl();
  filteredStates: Observable<Book[]>;
  public books:any;
  public data:any=[];
  public type:string = "Reader";
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
    this.router.navigate(["user/reader/create"]);

  }


  public async getAdmins(){
    try {
      this.charge = true;
      const admins = await this.authService.getAllReader();
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
