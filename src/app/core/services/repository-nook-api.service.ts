import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotificationService } from '../../core/services/notification.service';
import { AuthenticationService } from '../../core/services/authentication.service';
import { ConfigurationService } from '../../core/services/configuration.service';
import { IDatabase } from '../models/api/database';
import { ICollection } from '../models/api/collection';
import { IResponse } from '../models/api/response';
import { IRepository, NameValuePair } from '../models/api/repository';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RepositoryNookAPIService {

  constructor(public httpClient: HttpClient, public auth:AuthenticationService, public config:ConfigurationService, public notify:NotificationService) { 
  }

  response:IResponse;
  databases:IDatabase[];
  collections: ICollection[];
  repositoryItems: IRepository[];

  GetAll() : Observable<IRepository[]> {
    let uri: string= this.baseURI() + "/" + this.config.settings.database + "/" + this.config.settings.collection + "/repository"; // GET all repository objects given database/collection
    this.repositoryItems = [];
    this.httpClient
    .get(uri, { responseType: 'text', 
                headers: new HttpHeaders()
                    .set("Authorization", `Bearer ${this.auth.token}`)
    })
    .subscribe( body => {
                  this.response = JSON.parse(body) as IResponse;
                  for(var i=0; i < 10 ; i++) { // this.response.data.length
                    var repoItem: IRepository =  { _id: "xxxxx-xxxxxx"
                                                  , keyName: "keyName"
                                                  , keyValue: "keyValue"
                                                  , tags: [{ "name": "", "value": ""}]
                                                  , createdDate: ""
                                                  , createdBy: ""
                                                  , modifiedDate: ""
                                                  , modifiedBy: ""
                                                  , app: ""
                                                  , repository: ""
                                                  , collection: ""
                                                  , validate: false
                                                  , schemaUri: ""
                                                  , data: ""
                                                 } };
                    // repoItem._id = this.response.data[i]["_id"];
                    // this.notify.open(this.response.data[i]["_id"], "info", 10000);
                    // i = this.response.data.length; //exit for loop
                    // repoItem.keyName = this.response.data[i]["keyName"];
                    // repoItem.keyValue = this.response.data[i]["keyValue"];

                    this.repositoryItems.push( repoItem );
                  },
                  error => this.notify.open('GET all repository items failed. Check settings and retry.', 'error')
              );
    const repositoryItemsObservable = new Observable<IRepository[]>(observer => {
        setTimeout(() => {
            observer.next(this.repositoryItems);
        }, 1000);
    });
    return repositoryItemsObservable;
  }

  GetDatabases() : Observable<IDatabase[]> {
    let uri: string = this.baseURI();
    this.databases = [];
    this.httpClient
      .get(uri, { responseType: 'text', 
                  headers: new HttpHeaders()
                      .set("Authorization", `Bearer ${this.auth.token}`)
      })
      .subscribe( body => {
                    this.response = JSON.parse(body) as IResponse;
                    for(var i=0; i < this.response.data.length; i++) {
                      this.databases.push( JSON.parse(this.response.data[i].toString()) as IDatabase);
                    }
                  },
                  error => this.notify.open('GET Databases error. Check Configuration/Settings and retry.', 'error')
                );
    const databasesObservable = new Observable<IDatabase[]>(observer => {
        setTimeout(() => {
            observer.next(this.databases);
        }, 1000);
    });
    return databasesObservable;
  }

  GetCollections() : Observable<any> {
    let uri: string = this.baseURI() + "/" + this.config.settings.database;
    this.collections = [];
    this.httpClient
      .get(uri, { 
                  responseType: 'json', 
                  headers: new HttpHeaders()
                      .set("Authorization", `Bearer ${this.auth.token}`)
      })
      .subscribe( body => {
                    this.response = body as IResponse;
                    for(var i=0; i < this.response.data.length; i++) {
                      this.collections.push( JSON.parse(this.response.data[i].toString()) as ICollection)
                    }
                  },
                  error => this.notify.open('GET Collections error. Check Configuration/Settings and retry.', 'error')
            );
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
      let uri:string = this.config.settings.serviceAddress + ':' + this.config.settings.servicePort + '/admin/version';   
      this.httpClient
          .get(uri, { responseType: "text", 
                      headers: new HttpHeaders()
                          .set("Authorization", `Bearer ${this.auth.token}`)
                    })
          .subscribe( 
              respBody => this.notify.open(respBody,'info',3),
              error => this.notify.open('GET Version error. Could be AUTH issue. Check AUTH ClientId and URI:Port and retry.', 'error')
          );
  }

  private baseURI() {
    return this.config.settings.serviceAddress + ':' + this.config.settings.servicePort;
  }
}
