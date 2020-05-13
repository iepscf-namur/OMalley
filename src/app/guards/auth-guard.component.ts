import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router'; 
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login-service/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router : Router,
    private loginService : LoginService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
      boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.loginService.isLoggedIn()) return true;

    //With the state parameter we can get access to the URL the user want initially to access
    this.router.navigate(['/'],{ queryParams: {returnUrl: state.url}});
    return false;
  }

}
