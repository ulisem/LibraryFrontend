import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { BookService } from 'src/app/services/book.service';
import { LoanService } from 'src/app/services/loan.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-table-loan',
  templateUrl: './table-loan.component.html',
  styleUrls: ['./table-loan.component.scss']
})
export class TableLoanComponent implements OnInit {

  @Input() data:any;
  public dataSource = new MatTableDataSource(this.data);
  displayedColumns: string[] = ['publicationYear', 'title', 'location', 'isbn','edition','quantity','actions'];




constructor(
  public dialog: MatDialog,
  private bookService: BookService,
  private loanService:LoanService,
  private _snackBar: MatSnackBar) {
 }

ngOnInit(): void {
  console.log(this.data,"desde hijo");

  this.dataSource = new MatTableDataSource(this.data);


}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}


}
