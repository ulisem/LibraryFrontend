import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBadgeModule } from "@angular/material/badge";
//import {} from '@angular/material/autocomplete';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatMenuModule} from "@angular/material/menu";
/* Ngx Translate */
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ChargeComponent } from '../charge/charge.component';
import { TableComponent } from '../books/table/table.component';
import { TableLoanComponent } from '../loans/table-loan/table-loan.component';
import {TableAdminsComponent} from "../users/table/table.component";




@NgModule({
  declarations: [
    ChargeComponent,TableComponent,TableLoanComponent,TableAdminsComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatTableModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatBadgeModule,
  ],
  exports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ChargeComponent,
    MatCheckboxModule,
    MatRadioModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatTableModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatBadgeModule,
    TableComponent,
    TableLoanComponent,
    TableAdminsComponent
  ]
})
export class SharedModule { }
