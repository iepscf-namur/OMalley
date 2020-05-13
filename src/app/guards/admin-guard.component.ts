import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router'; 
import { Router } from '@angular/router';
import { LoginService } from '../services/login-service/login.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private router : Router,
    private loginService : LoginService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    //voir dans la db l'idRankUser --> 1 correspond à l'admin
    if (this.loginService.isLoggedIn() && this.loginService.getCurrentUser && this.loginService.getCurrentUser().Role.includes('1'))
      return true;

    //Should be a permission denied page in the future
    this.router.navigate(['/']);
    return false;
  }
}