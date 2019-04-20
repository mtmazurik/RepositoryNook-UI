import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ConfigurationModel } from '../models/configuration.model';
import { RepositoryModel } from '../models/repository.model';

@Injectable({
  providedIn: 'root'
})
//
// ConfigurationService - for reading in environment and reading/saving run-time config settings
//
export class ConfigurationService {

  private _environmentSettings: ConfigurationModel;
  private _repositorySettings: RepositoryModel;

  constructor()
  {
    this._environmentSettings = {  // assign initial config settings from environments/environment.ts file
      serviceAddress: environment.serviceAddress,
      servicePort: environment.servicePort,
      auth0ClientId: environment.auth0ClientId,
      auth0ClientSecret: environment.auth0ClientSecret,
      auth0Audience: environment.auth0Audience,
      auth0GrantType: environment.auth0GrantType 
    };
    this._repositorySettings = { 
      database: environment.database, 
      collection: environment.collection
    };
  }

  set environmentSettings( value ) { // property to override environment settings
    this._environmentSettings = value;
  }
  get environmentSettings() {
    return this._environmentSettings;
  }
  //
  // used by the RepositoryComponent
  //
  set repositorySettings( value ) { // properties to get/set databaseName and collectionName
    this._repositorySettings = value;
  }
  get repositorySettings() {
    return this._repositorySettings;
  }
}
