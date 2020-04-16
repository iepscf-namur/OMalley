import { environment } from '../../../environments/environment';
import { DataServiceComponent } from '../data-service/data-service.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceComponent extends DataServiceComponent {

  // Test made with a json file
  // private API_ENDPOINT_EXTENSION : string = '/guitarCatalog.json';
  private API_ENDPOINT_EXTENSION : string = '/users/'
  private API_ENDPOINT_EXTENSION_LOGIN : string = '/login'

  constructor(httpClient: HttpClient) { 

    super(httpClient);
    this.getUrl();
    this.getLoginUrl();

  }

  getUrl() {
    this.url = environment.API_BASE_URL + this.API_ENDPOINT_EXTENSION ;
    console.log(this.url);
  }

  //THIS WILL BE LATER REPLACED BY A FULL USERS SERVICE
  getLoginUrl(){
    this.loginUrl =  environment.API_BASE_URL + this.API_ENDPOINT_EXTENSION_LOGIN;
  } 
}
