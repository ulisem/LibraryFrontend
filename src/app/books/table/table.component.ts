import { Component, OnInit, Input } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { ModalDetailsComponent } from 'src/app/modal/modal-details/modal-details.component';
import { MatDialog } from '@angular/material/dialog';
import { async } from '@angular/core/testing';
import { BookService } from 'src/app/services/book.service';
import { LoanService } from 'src/app/services/loan.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';


export interface Book {
  id:string;
  publicationYear: string;
  description: string;
  edition: number;
  img: string,
  isbn: string,
  location:string,
  quantity: number,
  title: string
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

    @Input() data:any;
    @Input() type:any;
    public dataSource = new MatTableDataSource(this.data);
    displayedColumns: string[] = ['publicationYear', 'title', 'location', 'isbn','edition','quantity','actions'];
 

  

  constructor(
    public dialog: MatDialog,
    private bookService: BookService,
    private loanService:LoanService,
    private router:Router,
    private _snackBar: MatSnackBar) {
   }

  ngOnInit(): void {
    console.log(this.data,"desde hijo");
    console.log(this.type);

    this.dataSource = new MatTableDataSource(this.data);

  
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  async openModal(element:Book){
    try {
      let data = await this.bookService.getBookById(element.id);
      const dialogRef = this.dialog.open(ModalDetailsComponent, {
        width: '600px',
        data: data

      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    } catch (error) {
      
    }
   


  }

  async SoliciteLoan(element:Book){
    try {
      const bookId = {"bookId":element.id}
      const loan = await this.loanService.createLoans(bookId);
      console.log(loan);
      this._snackBar.open("Solicitud de prestamo creada con exito","", {
        duration:   5000,
        verticalPosition: "top",
        horizontalPosition: "right"
      });
    } catch (error) {
      console.log((error), error.message);
      this._snackBar.open(error.error.message,"", {
        duration:   5000,
        verticalPosition: "top",
        horizontalPosition: "right"
      });
      
    }

  }

  async goToEditBook(element){
    this.router.navigate(["book/edit/"+element.id]);
  }


  async deleteBook(element:Book){
    try {
      const deleteBook = await this.bookService.deleteBook(element.id);
      this._snackBar.open("Libro Eliminado con exito","", {
        duration:   5000,
        verticalPosition: "top",
        horizontalPosition: "right"
      });
      this.data = await  this.bookService.getAllBooks();

    this.dataSource = new MatTableDataSource(this.data);

      
    } catch (error) {
      this._snackBar.open("No se pudo eliminar el libro","", {
        duration:   5000,
        verticalPosition: "top",
        horizontalPosition: "right"
      });
      
    }
  }


  


}
