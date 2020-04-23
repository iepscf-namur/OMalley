import { environment } from '../../../environments/environment';
import { DataServiceComponent } from '../data-service/data-service.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TypeRoleService extends DataServiceComponent {

  private API_ENDPOINT_EXTENSION : string = '/roles'

  constructor(httpClient: HttpClient) {

    super(httpClient);

    this.getUrl();
  
  }

  getUrl() {
  
    this.url = environment.API_BASE_URL + this.API_ENDPOINT_EXTENSION ;
  }

}