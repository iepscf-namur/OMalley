import { environment } from '../../../environments/environment';
import { DataServiceComponent } from '../data-service/data-service.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadServiceService extends DataServiceComponent {

  // Test made with a json file
  // private API_ENDPOINT_EXTENSION : string = '/guitarCatalog.json';
  private API_ENDPOINT_EXTENSION : string = '/songs/'
  
  constructor(httpClient: HttpClient) { 

    super(httpClient);
    this.getUrl();

  }

  getUrl() {
    this.url = environment.API_BASE_URL + this.API_ENDPOINT_EXTENSION ;
    console.log(this.url);
  }

}