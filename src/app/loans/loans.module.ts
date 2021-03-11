import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanComponent } from './loan/loan.component';
import { SharedModule } from '../shared/shared.module';
import { LoanAdminComponent } from './loan-admin/loan-admin.component';



@NgModule({
  declarations: [LoanComponent, LoanAdminComponent],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class LoansModule { }
