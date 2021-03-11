import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeComponent } from './me/me.component';
import { SharedModule } from '../shared/shared.module';
import { ReadersComponent } from './readers/readers.component';
import { AdminsComponentList } from './admins/admins.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { CreateAdminComponent } from './create-admin/create-admin.component';



@NgModule({
  declarations: [MeComponent, ReadersComponent, AdminsComponentList, CreateUserComponent, CreateAdminComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class UsersModule { }
