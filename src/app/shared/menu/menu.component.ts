import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
  ]
})
export class MenuComponent implements OnInit, OnDestroy {

  public setMenu: any;
  public limitMail: number = 14;
  public isLoggedIn = false;
  public email: any;
  public publicityHome = false;
  public publicityCategories = false;
  public publicityOnboarding = false;
  public users = false;
  public notifications = false;
  public aditionalInfo = false;
  public menuItemVisible = {
    banners: false,
    users: false,
    notifications: false,
    additionalInfo: false
  }

  private subs = new SubSink();

  constructor(
    private route: Router,
    private location: Location,
    //public authService: AuthService,
    //private storage: StorageService
  ) {
    this.subs.sink = route.events.subscribe(() => {
      this.publicityHome = location.path().includes('dashboard');
      this.publicityCategories = location.path().includes('banners/category');
      // this.publicityOnboarding = location.path().includes('banners/onboarding');
      this.users = location.path().includes('users');
      this.notifications = location.path().includes('loan');
      this.aditionalInfo = location.path().includes('additional-information');
      //this.email = this.authService.currentUser.data.email;
    });
  }
  ngOnInit() {
   // const currentUser = JSON.parse(this.storage.get('currentUser'));
   /* for (const grant in currentUser.data.grants) {
      this.menuItemVisible[grant] = currentUser.data.grants[grant] !== 'blocked';
    }*/
  }

  goToPublicityHome() {
    this.route.navigate(['banners/home']);
  }

  goToPublicityCategory() {
    this.route.navigate(['banners/category']);
  }

  // goToOnboarding() {
  //   this.route.navigate(['banners/onboarding']);
  // }

  goToUsers(){
    this.route.navigate(['users']);
  }

  goToNotifications(){
    this.route.navigate(['notifications']);
  }
  goToAditionalInformation(){
    this.route.navigate(['additional-information']);
  }

  logout() {
   // this.authService.logOut()
   // this.storage.clear()
    this.route.navigate(['/login'])
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }


}
