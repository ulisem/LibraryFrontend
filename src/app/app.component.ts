import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { SubSink } from "subsink";

import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'LibraryFrontend';
  private subs = new SubSink();
  public auth:boolean=false;



  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private router:Router,
    public authService:AuthService,
    private location:Location
  ) {

    this.subs.add(
      router.events.subscribe(() => {
        this.auth = this.location.path().includes("auth");
      })
    );

    /*this.isLogged = authService.isLoggedIn;

    authService.auth$.subscribe(auth => {
      this.isLogged = auth.isLoggedIn;
    })*/


    iconRegistry
      .addSvgIcon('ic-lock', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/eye.svg'))
      .addSvgIcon('ic-unlock', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/eyeoff.svg'))
      .addSvgIcon('ic-dashboard-off', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/dashboard-off.svg'))
      .addSvgIcon('ic-dashboard-on', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/dashboard-on.svg'))
      .addSvgIcon('ic-dot-on', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/dot-on.svg'))
      .addSvgIcon('ic-publicidad-off', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/publicidad-off.svg'))
      .addSvgIcon('ic-publicidad-on', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/publicidad-on.svg'))
      .addSvgIcon('ic-user-off', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/user-off.svg'))
      .addSvgIcon('ic-user-on', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/user-on.svg'))
      .addSvgIcon('ic-notification-off', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/notificaciones-off.svg'))
      .addSvgIcon('ic-notification-on', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/notificaciones-on.svg'))
      .addSvgIcon('ic-info-off', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/info-off.svg'))
      .addSvgIcon('ic-info-on', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/info-on.svg'))


      .addSvgIcon('ic-sell', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/aditionalinfo.svg'))
      .addSvgIcon('ic-logout', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/logout.svg'))
      .addSvgIcon('ic-aditionalinfo', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/aditionalinfo.svg'))
      .addSvgIcon('ic-list', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/list.svg'))
      .addSvgIcon('ic-active', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/active.svg'))
  }


}
