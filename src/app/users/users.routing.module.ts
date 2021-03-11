import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MeComponent } from './me/me.component';
import { AdminsComponentList } from './admins/admins.component';
import { CreateAdminComponent } from './create-admin/create-admin.component';
import { ReadersComponent } from './readers/readers.component';
import { CreateUserComponent } from './create-user/create-user.component';

const routes: Routes = [
  {
    path: "user",
    component: MeComponent
  },
  {
    path: "admin",
    component: AdminsComponentList
  },
  {
    path: "admin/create",
    component: CreateAdminComponent
  },
  {
    path: "admin/edit/:id",
    component: CreateAdminComponent
  },
  {
    path: "reader",
    component: ReadersComponent
  },
  {
    path: "reader/create",
    component: CreateUserComponent
  },
  {
    path: "reader/edit/:id",
    component: CreateUserComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
