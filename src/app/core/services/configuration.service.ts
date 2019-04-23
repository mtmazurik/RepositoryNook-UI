import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ConfigurationModel } from '../models/configuration.model';

@Injectable({
  providedIn: 'root'  //makes it a singleton service
})
//
// ConfigurationService - for reading in environment and reading/saving run-time config settings
//
export class ConfigurationService {

  private _configurationSettings: ConfigurationModel;
  private _isLoaded = false;

  constructor(){    
    this.loadSettings();
  }
  set settings( value ) { 
    this._configurationSettings = value;
  }
  get settings() {
    return this._configurationSettings;
  }
  public loadSettings()
  {
    this._configurationSettings = {  // assign initial config settings from environments/environment.ts file
      serviceAddress: environment.serviceAddress,
      servicePort: environment.servicePort,
      auth0ClientId: environment.auth0ClientId,
      auth0ClientSecret: environment.auth0ClientSecret,
      auth0Audience: environment.auth0Audience,
      auth0GrantType: environment.auth0GrantType,
      database: environment.database, 
      collection: environment.collection
    };
  }
}
