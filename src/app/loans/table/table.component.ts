import { Component, OnInit, Input } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { ModalDetailsComponent } from 'src/app/modal/modal-details/modal-details.component';
import { MatDialog } from '@angular/material/dialog';
import { async } from '@angular/core/testing';
import { BookService } from 'src/app/services/book.service';
import { LoanService } from 'src/app/services/loan.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-table-loan',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
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

    
    this.getLoan();

    this.dataSource = new MatTableDataSource(this.data);

  
  }


  async getLoan(){
    try {
      const result = await this.loanService.getLoanByReader();
      console.log(result,"loans");
    } catch (error) {
      
    }
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
