import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MenuComponent} from "./shared/menu/menu.component";

import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './login/login.component';
import { FilterComponent } from './books/filter/filter.component';
import { LoanComponent } from './loans/loan/loan.component';
import { MeComponent } from './users/me/me.component';
import { MenuAdminComponent } from './shared/menuAdmin/menuAdmin.component';
import { AdminComponent } from './books/admin/admin.component';
import { CreateComponent } from './books/create/create.component';
import { AdminsComponentList } from './users/admins/admins.component';
import { CreateAdminComponent } from './users/create-admin/create-admin.component';
import { ReadersComponent } from './users/readers/readers.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { LoanAdminComponent } from './loans/loan-admin/loan-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MenuAdminComponent,
    LoginComponent,
    FilterComponent,
    LoanComponent,
    MeComponent,
    AdminComponent,
    CreateComponent,
    AdminsComponentList,
    CreateAdminComponent,
    ReadersComponent,
    CreateUserComponent,
    LoanAdminComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
