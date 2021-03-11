import { Component, OnInit } from '@angular/core';
import { LoanService } from 'src/app/services/loan.service';
import { ActivatedRoute, Router } from '@angular/router';
import { timeout } from 'rxjs/operators';
@Component({
  selector: 'app-loan-admin',
  templateUrl: './loan-admin.component.html',
  styleUrls: ['./loan-admin.component.scss']
})
export class LoanAdminComponent implements OnInit {

  public charge:boolean;
  public books:any;
  public data:any=[];
  public type:string;
  public showTable:boolean=false;


  constructor(
    private loanService:LoanService,
    private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.type = this.route.snapshot.params["status"];
    console.log(this.type);
    this.getMyLoans();


  this.route.url.pipe(
  ).subscribe(url =>{

    this.charge=true;
    this.showTable=false;
    this.type = this.route.snapshot.params["status"];
    this.getMyLoans();
});
  }


async getMyLoans(){
  try {

    this.charge=true;
   const result = await this.loanService.getAllLoans(this.type);
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
