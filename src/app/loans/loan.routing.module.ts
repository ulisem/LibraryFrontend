import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoanComponent } from './loan/loan.component';
import { LoanAdminComponent } from './loan-admin/loan-admin.component';


const routes: Routes = [
  {
    path: "user",
    component: LoanComponent
  },
  {
    path: "admin",
    component: LoanAdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoanRoutingModule {}
