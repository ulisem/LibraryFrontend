import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { BookService } from 'src/app/services/book.service';
import { LoanService } from 'src/app/services/loan.service';
import { MatSnackBar } from '@angular/material/snack-bar';


export interface Loan {
  id:string;
  title: string;
  createdDate: Date;
  edition: number;
  status: string,
  returnDate: string,
  aprovedDate:string
}
@Component({
  selector: 'app-tableloanadmin',
  templateUrl: './tableloanadmin.component.html',
  styleUrls: ['./tableloanadmin.component.scss']
})
export class TableloanadminComponent implements OnInit {


  @Input() data:any[];
  public dataSource = new MatTableDataSource(this.data);
  displayedColumns: string[] = ['title', 'createdDate', 'status','aprovedDate','returnDate'];




constructor(
  public dialog: MatDialog,
  private bookService: BookService,
  private loanService:LoanService,
  private _snackBar: MatSnackBar) {
 }

ngOnInit(): void {
  console.log(this.data,"desde hijo");

  this.getMyLoans();


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
