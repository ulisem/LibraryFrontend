import { Component, OnInit, Input } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { ModalDetailsComponent } from 'src/app/modal/modal-details/modal-details.component';
import { MatDialog } from '@angular/material/dialog';
import { async } from '@angular/core/testing';
import { BookService } from 'src/app/services/book.service';
import { LoanService } from 'src/app/services/loan.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


export interface User {
  id:string;
  firstname:string;
  lastname: string;
  role: string;
  phoneNumber: number;
  createdDate: string;
}

@Component({
  selector: 'app-table-admins',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableAdminsComponent implements OnInit {

  @Input() data:any;
  @Input() type:any;
  public dataSource = new MatTableDataSource(this.data);
  displayedColumns: string[] = ['firstname', 'lastname', 'role', 'phoneNumber','createdDate','actions'];




constructor(
  public dialog: MatDialog,
  private bookService: BookService,
  private loanService:LoanService,
  private authService:AuthService,
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


async openModal(element:User){
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


async goToEditBook(element){
  this.router.navigate(["user/admin/edit/"+element.id]);
}


async goToEditReader(element){
  this.router.navigate(["user/reader/edit/"+element.id]);
}


async deleteBook(element:User){
  try {
    const deleteBook = await this.authService.deleteAdmin(element.id);
    this._snackBar.open("Administrador Eliminado con exito","", {
      duration:   5000,
      verticalPosition: "top",
      horizontalPosition: "right"
    });
    this.data = await  this.authService.getAllAdmins();

  this.dataSource = new MatTableDataSource(this.data);

    
  } catch (error) {
    this._snackBar.open("No se pudo eliminar el administrador","", {
      duration:   5000,
      verticalPosition: "top",
      horizontalPosition: "right"
    });
    
  }
}


async deleteReader(element:User){
  try {
    const deleteBook = await this.authService.deleteReader(element.id);
    this._snackBar.open("Lector Eliminado con exito","", {
      duration:   5000,
      verticalPosition: "top",
      horizontalPosition: "right"
    });
    this.data = await  this.authService.getAllReader();

  this.dataSource = new MatTableDataSource(this.data);

    
  } catch (error) {
    this._snackBar.open("No se pudo eliminar el lector","", {
      duration:   5000,
      verticalPosition: "top",
      horizontalPosition: "right"
    });
    
  }
}


}
