import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoanComponent } from './loan/loan.component';


const routes: Routes = [
  {
    path: "user",
    component: LoanComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoanRoutingModule {}
