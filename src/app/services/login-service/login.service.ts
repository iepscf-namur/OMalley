import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { catchError, map, retry } from 'rxjs/operators';
import { throwError, EMPTY, from, Observable } from 'rxjs';

import { DataServiceComponent } from './../data-service/data-service.component';
import { AppError } from './../../common/validators/app-error';
import { NotFoundError } from './../../common/not-found-error';
import { environment } from './../../../environments/environment';
import { NotificationService } from './../notification/notification.service';

import { JwtHelperService } from '@auth0/angular-jwt'
import { CookieService } from 'ngx-cookie-service';
import { isConditionalExpression } from 'typescript';

@Injectable({
  providedIn: 'root'
})

export class LoginService extends DataServiceComponent {

  private API_ENDPOINT_EXTENSION : String ='/users';
  private API_ENDPOINT_EXTENSION_LOGIN : String ='/login';
  
  resultat;

  constructor(
    httpClient: HttpClient,
    private cookieService: CookieService,
    private notifyService: NotificationService
    ) {

    super(httpClient);
    this.getUrl();
    this.getLoginUrl();
  
  }

  getUrl(){
    this.url =  environment.API_BASE_URL + this.API_ENDPOINT_EXTENSION;
  }

  getLoginUrl(){
    this.loginUrl =  environment.API_BASE_URL + this.API_ENDPOINT_EXTENSION_LOGIN;
  }

  checkCredentials(ressource) {
    this.getLogin(ressource)
    .subscribe(response =>  {
      console.log(response)
      let result = response;
      this.resultat = result;
      if (result && result['token']) {
        this.cookieService.set('token', JSON.stringify(result['token']));
        this.cookieService.set('loggedIn', "true")
        return true;
      } else {
        return false;
      }
    }, (error : AppError) => {
      if (error instanceof NotFoundError){
        this.showToasterError("Erreur de connexion", "get credentials")
      }
    })
  }

  logout() {
    this.cookieService.deleteAll();
  }

  isLoggedIn() {
    // If we have a valid Token in LocalStorage, and this token is not expired : Our user is logged in
    let jwtHelper = new JwtHelperService();
    let token = this.cookieService.get('token');
    if (!token)
      return false;

    let expirationDate = jwtHelper.getTokenExpirationDate(token);
    let isExpired = jwtHelper.isTokenExpired(token);

    return !isExpired;
  }

  getCurrentUser() {
    // let token = sessionStorage.getItem('token');
    let token = this.cookieService.get('token');
    if (!token)
    return false;

    let jwtHelper = new JwtHelperService();

    // let temp = jwtHelper.decodeToken(token)
    // console.log(temp)

    return jwtHelper.decodeToken(token);
  }

  showToasterError(title, message) {
    this.notifyService.showError(title, message)
  }

}