import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanComponent } from './loan/loan.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [LoanComponent],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class LoansModule { }
