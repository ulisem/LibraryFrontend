import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate, CanLoad {

  public token = (localStorage.getItem('token'));

  constructor(
    private router: Router,
    private authService:AuthService
  ) {
    
   }
   
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Observable<boolean>(observer => {
      if(this.token){
        observer.next(true)
      }else{
        this.router.navigate(['auth']);
        observer.next(false);
      }
    });
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      return new Promise(async (resolve, reject) => {
        if(!this.authService.token) {
          this.authService.token = localStorage.getItem('token');
          if(this.authService.token) {
            try {
              await this.authService.getInfo();
            } catch (e) {
              this.authService.token = "";
              localStorage.clear();
              this.router.navigate(["/auth"]);
              resolve(false);
              return;
            }
          }
        };
        if (!this.authService.token) {
          this.router.navigate(["/auth"]);
          resolve(false);
          return;
        } else {
          resolve(true);
          return;
        }
      });
  }
}
