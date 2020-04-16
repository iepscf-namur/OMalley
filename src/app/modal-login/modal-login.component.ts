import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';

// import { Button } from 'protractor';
// import { BadRequest } from './common/bad-request-error';
import { AppError } from './../common/validators/app-error';
import { NotFoundError } from './../common/not-found-error';

import { LoginService } from './../services/login-service/login.service';
import { NotificationService } from '../services/notification/notification.service';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
})
export class ModalLoginComponent implements OnInit {

  private cookieValue: String;

  login: string = '';
  password: string = '';
  username: string = '';

  userConnected : any;
//   posts: any[];
  button = "btn btn-outline-info my-2 my-sm-0";
  buttonText = "Login";

//   // private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false');
  private loggedInStatus = JSON.parse(this.cookieService.get('loggedIn') || 'false');

  closeResult: string;

  constructor(
    private modalService: NgbModal,
    private service : LoginService,
    private cookieService : CookieService,
    private router : Router,
//     private route : ActivatedRoute,
    private notifyService: NotificationService
  ) { }

  ngOnInit(): void {
    this.changeButton();
    this.cookieService.set('cookie-name','our cookie value');
    this.cookieValue = this.cookieService.get('cookie-name');
    this.cookieValue = this.cookieService.get('cookie-namekkk');
  }

  method : String;

  methodSwitch(form){
    if (this.method == "login") {
      this.getCredentials(form);
    } else {
      this.logout();
      this.clearForm();
    }
  }

  public open(content) {
    // If loggin we will open the login modal, if not button should be logout and we will revert it to login
    if (this.buttonText == "Login") {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else {
      this.buttonText = "Login";
      this.button = "btn btn-outline-info my-2 my-sm-0";
      this.logout();
      this.setLoggedIn(false);
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  getCredentials(titleInput: HTMLInputElement){

    let credentials = [{ login: this.login, password: this.password}]
    this.service.checkCredentials(credentials);
    if (this.cookieService.get('loggedIn')) {
      this.changeButton();
      this.cookieService.set('userRole', this.service.getCurrentUser().IdRoleUser)
      this.cookieService.set('username',  this.service.getCurrentUser().Login);

      // AuthGuard added the url we wanted originally to access as URL params
      // It here is one, we navigate to it, if not to homepage
//    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
//    this.router.navigate([returnUrl || '/']);
              
      this.username = this.service.getCurrentUser().sub;
      this.showToasterSuccess('Bienvenue ' + this.username, "Login");
    } else {
      this.showToasterError("Utilisateur ou mot de passe incorrect", "Login");
    }
    this.clearForm();
  }

  logout(){
    this.service.logout();
    this.changeButton();
    this.router.navigate(['/']);
  }

  changeButton(){
    if (this.service.isLoggedIn()){
      this.method = "logout";
      this.button = "btn btn-outline-danger my-2 my-sm-0";
      this.buttonText = "Log out";
    } else {
      this.method = "login";
      this.button = "btn btn-outline-info my-2 my-sm-0";
      this.buttonText = "Login";
    }
  }

  clearForm(){
    this.login = "";
    this.password ="";
  }

  setLoggedIn(value: boolean){
    this.loggedInStatus = value;
    this.cookieService.set('loggedIn', value.toString())
  }

  getLoggedIn() {
    // We are JSON parsing so we need a String value otherwise it will fail
    // return JSON.parse(sessionStorage.getItem('loggedIn') || this.loggedInStatus.toString());
    return JSON.parse(this.cookieService.get('loggedIn') || this.loggedInStatus.toString());
  }

  showToasterSuccess(title, message) {
    this.notifyService.showSuccess(title, message)
  }

  showToasterError(title, message) {
    this.notifyService.showError(title, message)
  }

}
