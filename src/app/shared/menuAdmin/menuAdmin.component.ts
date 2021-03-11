import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menuAdmin.component.html',
  styles: [
  ]
})
export class MenuAdminComponent implements OnInit, OnDestroy {

  public setMenu: any;
  public limitMail: number = 14;
  public isLoggedIn = false;
  public typeUser:any; 
  public email: any;
  public booksUser = false;
  public publicityCategories = false;
  public admin = false;
  public reader = false;
  public publicityOnboarding = false;
  public dashboardUser = false;
  public users = false;
  public type:string;
  public loans = false;
  public aditionalInfo = false;
  public solLoan = false;
  public approveLoan = false;
  public menuItemVisible = {
    banners: false,
    users: false,
    loans: false,
    additionalInfo: false
  }

  private subs = new SubSink();

  constructor(
    private route: Router,
    private location: Location,
    public authService: AuthService,
    private storageService: StorageService
    //private storage: StorageService
  ) {
    this.subs.sink = route.events.subscribe(() => {
      this.booksUser = location.path().includes('book/admin');
      this.dashboardUser = location.path().includes('dashboard/user');
      this.admin = location.path().includes('user/admin');
      this.reader = location.path().includes('user/reader');
      // this.publicityOnboarding = location.path().includes('banners/onboarding');
      this.users = location.path().includes('user/user');
      this.loans = location.path().includes('loan/user');
      this.aditionalInfo = location.path().includes('additional-information');
      this.solLoan = location.path().includes('loan/admin/SOLICITADO');
      this.approveLoan = location.path().includes('loan/admin/APROBADO');
      //this.email = this.authService.currentUser.data.email;
    });
  }
  ngOnInit() {
    this.typeUser = JSON.parse(this.storageService.get("currentUser"));
    console.log(this.typeUser);
    

    
   // const currentUser = JSON.parse(this.storage.get('currentUser'));
   /* for (const grant in currentUser.data.grants) {
      this.menuItemVisible[grant] = currentUser.data.grants[grant] !== 'blocked';
    }*/
  }

  goToPublicityHome() {
    this.route.navigate(['book/admin']);
  }

  goToAdmin(){
    this.route.navigate(["user/admin"]);
  }

  goToPublicityCategory() {
    this.route.navigate(['banners/category']);
  }

  // goToOnboarding() {
  //   this.route.navigate(['banners/onboarding']);
  // }

  goToUsers(){
    this.route.navigate(['user/reader']);
  }

  goToNotifications(){
    this.route.navigate(['loan/user']);
  }
  goToAditionalInformation(){
    this.route.navigate(['additional-information']);
  }

  goToApproveLoan(){

    this.route.navigate(['loan/admin/SOLICITADO']);
  }



  goToReturnLoan(){

    this.route.navigate(['loan/admin/APROBADO']);
  }
  logout() {
    this.authService.logOut()
   localStorage.clear();

   location.reload();
    this.route.navigate(['/auth']);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }


}
