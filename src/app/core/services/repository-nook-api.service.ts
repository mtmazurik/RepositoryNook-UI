import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotificationService } from '../../core/services/notification.service';
import { AuthenticationService } from '../../core/services/authentication.service';
import { ConfigurationService } from '../../core/services/configuration.service';
import { ConfigurationModel } from '../models/configuration.model';
import { RepositoryModel } from '../models/repository.model';
import { IDatabase } from '../models/api/database';
import { IResponse } from '../models/api/response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RepositoryNookAPIService {

  private _environmentSettings: ConfigurationModel;
  private _repositorySettings: RepositoryModel;

  constructor(public httpClient: HttpClient, public auth:AuthenticationService, public notify:NotificationService, public config:ConfigurationService) { 
    this._environmentSettings =  config.environmentSettings;
    this._repositorySettings = config.repositorySettings;
  }

  response:IResponse;
  databases:IDatabase[];
  GetDatabases() : Observable<any> {
    let uri: string = this.baseURI();
    this.databases = [];
    this.httpClient
      .get(uri, { 
                  responseType: 'text', 
                  headers: new HttpHeaders()
                      .set("Authorization", `Bearer ${this.auth.accessToken}`)
      })
      .subscribe( body => {
            this.response = JSON.parse(body) as IResponse;
            for(var i=0; i < this.response.data.length; i++) {
              this.databases.push( JSON.parse(this.response.data[i].toString()) as IDatabase);
            }
      });

    const databasesObservable = new Observable(observer => {
        setTimeout(() => {
            observer.next(this.databases);
        }, 1000);
    });
    return databasesObservable;
  }

  Ping(){ // non-Authenticated
      let uri:string =  this.baseURI() + '/admin/ping';   
      this.httpClient
          .get(uri, {responseType: "text"})
          .subscribe( 
              respBody => this.notify.open(respBody, 'info', 3),
              error => this.notify.open('GET Ping error. Check REST URI and port number and retry.', 'error')
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
