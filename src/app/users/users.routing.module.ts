import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MeComponent } from './me/me.component';

const routes: Routes = [
  {
    path: "user",
    component: MeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
