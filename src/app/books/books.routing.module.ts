import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FilterComponent } from './filter/filter.component';
import { AdminComponent } from './admin/admin.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  {
    path: "user",
    component: FilterComponent
  },
  {
    path:"admin",
    component: AdminComponent
  },
  {
    path:"create",
    component: CreateComponent
  },
  {
    path:"edit/:id",
    component: CreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeginingRoutingModule {}
