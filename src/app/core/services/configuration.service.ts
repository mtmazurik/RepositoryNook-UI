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
      serviceAddress: "http://reponook-svc.cloudcomputingassociates.net",
      servicePort: 80,
      auth0ClientId: "Tl3SnziPkp4qRjRuajZWfrAeMn6Dxwr6",
      auth0ClientSecret: "Ep36WseJFCSnU5IsMdDxJh_JKyhlyKDfw0_epmihC4JroW1SvVtvDa9BHuwDGPMJ",
      auth0Audience: "endpoint-security.containernooks.com",
      auth0GrantType: "client_credentials",
      database: "public", 
      collection: "testdata"
    };
  }
}