import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';

import { catchError, map, retry } from 'rxjs/operators';
import { throwError, EMPTY, from, Observable } from 'rxjs';

import { BadRequest } from '../../common/bad-request-error';
import { AppError } from '../../common/validators/app-error';
import { NotFoundError } from '../../common/not-found-error';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export abstract class DataServiceComponent {

  url : string;
  loginUrl : string;
  
  constructor(public httpClient: HttpClient) { }

  abstract getUrl();

  getLogin(ressource) {
    return this.httpClient.post(this.loginUrl, JSON.stringify(ressource), httpOptions).pipe(catchError(this.handleError));
  };
  
  getAll() {
    //We are now using an Interceptor to add Authorization in requests headers
    return this.httpClient.get(this.url).pipe(catchError(this.handleError));
  };

  getOne(ressource){
    return this.httpClient.get(this.url + '/' + ressource).pipe(catchError(this.handleError));
  };
  
  create(ressource){
    return this.httpClient.post(this.url, JSON.stringify(ressource)).pipe(catchError(this.handleError));
  }

  update(ressource, oldRessource){
    return this.httpClient.put(this.url + '/' + oldRessource, JSON.stringify(ressource)).pipe(catchError(this.handleError));
  }

  delete(ressource){
    return this.httpClient.delete(this.url + '/' + ressource).pipe(catchError(this.handleError));
  }

  public handleError(err: Response){
    if (err.status == 400 )
      {
        return Observable.throw(new BadRequest(err));
      }
    else if (err.status == 404)
      {
        return Observable.throw(new NotFoundError(err));
      }
    else
      {
        // Return error by default if no specific error
        return Observable.throw(new AppError(err));
      }
  }

}