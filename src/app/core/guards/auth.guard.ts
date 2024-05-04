import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private global: GlobalService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
    let user:any = localStorage.getItem('l2e-login');
    user = JSON.stringify(user);
    if(!user) {
      if(route.routeConfig?.path !='login') {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    }
    else {
      this.global.set_user(user);
      if(route.routeConfig?.path == 'login') {
        this.router.navigate(['/home']);
      }
      return true
    }
  }
  
}
