import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { BookService } from 'src/app/services/book.service';
import { LoanService } from 'src/app/services/loan.service';
import { MatSnackBar } from '@angular/material/snack-bar';


export interface Loan {
  id: string;
  title: string;
  isbn: string;
  createdDate: Date;
  edition: number;
  status: string,
  returnDate: string,
  aprovedDate: string,
  email: string,
  debt: number
}
@Component({
  selector: 'app-tableloanadmin',
  templateUrl: './tableloanadmin.component.html',
  styleUrls: ['./tableloanadmin.component.scss']
})
export class TableloanadminComponent implements OnInit {


  @Input() data: any[];
  @Input() type: string;
  public dataSource = new MatTableDataSource(this.data);
  displayedColumns: string[] = ['title', 'isbn', 'createdDate', 'status', 'email', 'debt', 'aprovedDate', 'returnDate', 'actions'];




  constructor(
    public dialog: MatDialog,
    private bookService: BookService,
    private loanService: LoanService,
    private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    console.log(this.data, "desde hijo");
    this.dataSource = new MatTableDataSource(this.data);


  }



async getMyLoans(){
  try {

   const result:any = await this.loanService.getAllLoans(this.type);
  this.dataSource = new MatTableDataSource(result);
  
    
  } catch (error) {
    
  }
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async aprobeLoan(element: Loan) {
    try {
      const result = await this.loanService.approveLoan(element.id);
      this._snackBar.open("Solicitud de prestamo aprobada con exito","", {
        duration:   5000,
        verticalPosition: "top",
        horizontalPosition: "right"
      });
      this.getMyLoans();
      
    } catch (error) {
      this._snackBar.open("error en aprobación de prestamo","", {
        duration:   5000,
        verticalPosition: "top",
        horizontalPosition: "right"
      });
    }

  }


  async cancelLoan(element: Loan) {
    
    try {

      const result = await this.loanService.revokeLoan(element.id);
      this._snackBar.open("Solicitud de prestamo cancelada con exito","", {
        duration:   5000,
        verticalPosition: "top",
        horizontalPosition: "right"
      });

      this.getMyLoans();
      
    } catch (error) {
      this._snackBar.open("error","", {
        duration:   5000,
        verticalPosition: "top",
        horizontalPosition: "right"
      });
      
    }

  }


  async returnLoan(element: any) {
    
    try {

      const result = await this.loanService.returnLoan(element.id,element.readerId);
      this._snackBar.open("Devolución de prestamo hecha con exito","", {
        duration:   5000,
        verticalPosition: "top",
        horizontalPosition: "right"
      });

      this.getMyLoans();
      
    } catch (error) {
      this._snackBar.open("error","", {
        duration:   5000,
        verticalPosition: "top",
        horizontalPosition: "right"
      });
      
    }

  }

}
