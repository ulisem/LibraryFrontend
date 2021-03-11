import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { BookService } from 'src/app/services/book.service';
import { LoanService } from 'src/app/services/loan.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';



export interface Loan {
  id:string;
  title: string;
  isbn:string
  createdDate: Date;
  edition: number;
  status: string,
  returnDate: string,
  aprovedDate:string,
  email:string,
  debt: number
}
@Component({
  selector: 'app-table-loan',
  templateUrl: './table-loan.component.html',
  styleUrls: ['./table-loan.component.scss']
})
export class TableLoanComponent implements OnInit {

  @Input() data:any[];
  public dataSource = new MatTableDataSource(this.data);
  displayedColumns: string[] = ['title','isbn', 'createdDate', 'status','aprovedDate','returnDate'];




constructor(
  public dialog: MatDialog,
  private bookService: BookService,
  private loanService:LoanService,
  private router:Router,
  private route:ActivatedRoute,
  private _snackBar: MatSnackBar) {
 }

ngOnInit(): void {
  console.log(this.data,"desde hijo");

  this.getMyLoans();
  this.router.events.subscribe(console.log);

  this.route.url.subscribe(url =>{
    console.log(url);
});


}

async getMyLoans(){
  try {
   const result :any= await this.loanService.getLoanByReader();
   console.log(result);

   this.dataSource = new MatTableDataSource(result);
    
  } catch (error) {
    
  }
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}


}
