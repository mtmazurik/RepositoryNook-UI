import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotificationService } from '../../core/services/notification.service';
import { AuthenticationService } from '../../core/services/authentication.service';
import { ConfigurationService } from '../../core/services/configuration.service';
import { ConfigurationModel } from '../models/configuration.model';
import { IDatabase } from '../models/api/database';
import { ICollection } from '../models/api/collection';
import { IResponse } from '../models/api/response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RepositoryNookAPIService {

  private _environmentSettings: ConfigurationModel;

  constructor(public httpClient: HttpClient, public auth:AuthenticationService, public notify:NotificationService, public config:ConfigurationService) { 
    this._environmentSettings =  config.environmentSettings;
    if (!this.auth.isAuthenticated()){
      this.auth.renewToken();
    }
  }

  response:IResponse;
  databases:IDatabase[];
  collections: ICollection[];

  GetDatabases() : Observable<IDatabase[]> {
    let uri: string = this.baseURI();
    this.databases = [];
    this.httpClient
      .get(uri, { responseType: 'text', 
                  headers: new HttpHeaders()
                      .set("Authorization", `Bearer ${this.auth.accessToken}`)
      })
      .subscribe( body => {
        this.response = JSON.parse(body) as IResponse;
        for(var i=0; i < this.response.data.length; i++) {
          this.databases.push( JSON.parse(this.response.data[i].toString()) as IDatabase);
        }
  });

    const databasesObservable = new Observable<IDatabase[]>(observer => {
        setTimeout(() => {
            observer.next(this.databases);
        }, 1000);
    });
    return databasesObservable;
  }

  GetCollections() : Observable<any> {
    var repositorySettings = this.config.repositorySettings;
    let uri: string = this.baseURI() + "/" + repositorySettings.database;
    this.collections = [];
    this.httpClient
      .get(uri, { 
                  responseType: 'json', 
                  headers: new HttpHeaders()
                      .set("Authorization", `Bearer ${this.auth.accessToken}`)
      })
      .subscribe( body => {
            this.response = body as IResponse;
            for(var i=0; i < this.response.data.length; i++) {
              this.collections.push( JSON.parse(this.response.data[i].toString()) as ICollection)
            }
      });

    const collectionsObservable = new Observable(observer => {
        setTimeout(() => {
            observer.next(this.collections);
        }, 1000);
    });
    return collectionsObservable;
  }

  Ping(){ // non-Authenticated
      let uri:string =  this.baseURI() + '/admin/ping';   
      this.httpClient
          .get(uri, {responseType: "text"})
          .subscribe( 
              respBody => this.notify.open(respBody, 'info', 3),
              error => this.notify.open('GET Ping error. Check REST URI and port number and  retry.', 'error')
          );
  }

  GetVersion(){ // Authenticated
      let uri:string = this._environmentSettings.serviceAddress + ':' + this._environmentSettings.servicePort + '/admin/version';   
      this.httpClient
          .get(uri, { responseType: "text", 
                      headers: new HttpHeaders()
                          .set("Authorization", `Bearer ${this.auth.accessToken}`)
                    })
          .subscribe( 
              respBody => this.notify.open(respBody,'info',3),
              error => this.notify.open('GET Version error. Could be AUTH issue. Check AUTH ClientId and URI:Port and retry.', 'error')
          );
  }

  private baseURI() {
    return this._environmentSettings.serviceAddress + ':' + this._environmentSettings.servicePort;
  }
}
