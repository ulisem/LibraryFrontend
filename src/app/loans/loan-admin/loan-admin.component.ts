import { Component, OnInit } from '@angular/core';
import { LoanService } from 'src/app/services/loan.service';
@Component({
  selector: 'app-loan-admin',
  templateUrl: './loan-admin.component.html',
  styleUrls: ['./loan-admin.component.scss']
})
export class LoanAdminComponent implements OnInit {

  public charge:boolean;
  public books:any;
  public data:any=[];
  public showTable:boolean=false;


  constructor(
    private loanService:LoanService,) { }

  ngOnInit(): void {
    this.getMyLoans();
  }


async getMyLoans(){
  try {

    this.charge=true;
   const result = await this.loanService.getAllLoans();
   console.log(result);
   this.data = result;
   setTimeout(() => {
     this.showTable=true;
     this.charge=false;
     
   }, 2000);
    
  } catch (error) {
    
  }
}
}
