import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanComponent } from './loan/loan.component';
import { SharedModule } from '../shared/shared.module';
import { TableLoanComponent } from './table-loan/table-loan.component';



@NgModule({
  declarations: [LoanComponent,TableLoanComponent],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class LoansModule { }
