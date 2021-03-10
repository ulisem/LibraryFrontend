import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {
    path: 'auth', component: LoginComponent
  
  },
  {
    path: 'book',
    loadChildren: () => import('src/app/books/books.routing.module').then(m => m.BeginingRoutingModule),
    //canLoad: [NoauthloadGuard]
  }, 
  {
    path: 'loan',
    loadChildren: () => import('src/app/loans/loan.routing.module').then(m => m.LoanRoutingModule),
    //canLoad: [NoauthloadGuard]
  }, 
  {
    path: 'user',
    loadChildren: () => import('src/app/users/users.routing.module').then(m => m.UsersRoutingModule),
    //canLoad: [NoauthloadGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled',
    scrollOffset: [0,0],
    anchorScrolling: "enabled"
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
