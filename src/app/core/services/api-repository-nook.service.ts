import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotificationService } from './notification.service';
import { AuthenticationService } from './authentication.service';
import { ConfigurationService } from './configuration.service';
import { Database } from '../models/api/database';
import { Collection } from '../models/api/collection';
import { Response } from '../models/api/response';
import { Repository, NameValuePair } from '../models/api/repository';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class APIRepositoryNookService {

  constructor(public httpClient: HttpClient, public auth:AuthenticationService, public config:ConfigurationService, public notify:NotificationService) { 
  }

  response:Response;
  databases:Database[];
  collections: Collection[];

  repositoryItems: Repository[];

  CreateNew(repository:Repository) : Promise<Repository> {
    let uri: string = this.baseURI() + "/" + this.config.settings.database + "/" + this.config.settings.collection;
    let reqBody = JSON.stringify(repository);

    let promise = new Promise<Repository>((resolve, reject) => {
     this.httpClient
            .post(uri, reqBody,
                          { 
                            responseType: 'text', 
                            headers: new HttpHeaders()
                                .set("Authorization", `Bearer ${this.auth.token}`)
                                .set("Content-Type", "application/json")                 
                            })
            .toPromise()
            .then( res => {
                      let response = JSON.parse(res) as Response;
                      let repository = JSON.parse(JSON.stringify(response.data)) as Repository;
                      resolve(repository);
            });
      });
      return promise;
  }
  GetAll() : Observable<Repository[]> {
    let uri: string= this.baseURI() + "/" + this.config.settings.database + "/" + this.config.settings.collection; 
    this.repositoryItems = [];
    this.httpClient
    .get(uri, { responseType: 'text', 
                headers: new HttpHeaders()
                    .set("Authorization", `Bearer ${this.auth.token}`)
    })
    .subscribe( body => {
                  this.response = JSON.parse(body) as Response;
                  for(var i=0; i < this.response.data.length ; i++) {  
                    let repoString = JSON.stringify(this.response.data[i]);
                    this.repositoryItems.push( JSON.parse(repoString) as Repository );
                  }
                }
              );
    const repositoryItemsObservable = new Observable<Repository[]>(observer => {
        setTimeout(() => {
            observer.next(this.repositoryItems);
        }, 1000);
    });
    return repositoryItemsObservable;
  }

  GetDatabases() : Observable<Database[]> {
    let uri: string = this.baseURI();
    this.databases = [];
    this.httpClient
      .get(uri, { responseType: 'text', 
                  headers: new HttpHeaders()
                      .set("Authorization", `Bearer ${this.auth.token}`)
      })
      .subscribe( body => {
                    this.response = JSON.parse(body) as Response;
                    for(var i=0; i < this.response.data.length; i++) {
                      this.databases.push( JSON.parse(this.response.data[i].toString()) as Database);
                    }
                  },
                  error => this.notify.open('GET Databases error. Check Configuration/Settings and retry.', 'error')
                );
    const databasesObservable = new Observable<Database[]>(observer => {
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
                    this.response = body as Response;
                    for(var i=0; i < this.response.data.length; i++) {
                      this.collections.push( JSON.parse(this.response.data[i].toString()) as Collection)
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
