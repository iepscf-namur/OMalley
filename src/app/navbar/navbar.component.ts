import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from './../services/login-service/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private user;

  constructor(
    public loginService: LoginService,
    private cookieService: CookieService
  ) { }

  username: string = "";
  
  ngOnInit(): void {
    this.username = this.loginService.getCurrentUser().Surname;
  }

}
