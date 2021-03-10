import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import {FilterComponent} from './filter/filter.component';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { AdminComponent } from './admin/admin.component';


@NgModule({
  declarations: [FilterComponent, AdminComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatMenuModule
  ]
})
export class BooksModule { }
