import { Component, OnInit } from '@angular/core';
import { LoanService } from 'src/app/services/loan.service';
@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent implements OnInit {

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
   const result = await this.loanService.getLoanByReader();
   console.log(result);
   setTimeout(() => {
     this.showTable=true;
     this.charge=false;
     
   }, 2000);
    
  } catch (error) {
    
  }
}

}
