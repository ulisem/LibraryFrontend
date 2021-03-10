import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import {FilterComponent} from './filter/filter.component';
import { TableComponent } from './table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [FilterComponent,TableComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatMenuModule
  ]
})
export class BooksModule { }
