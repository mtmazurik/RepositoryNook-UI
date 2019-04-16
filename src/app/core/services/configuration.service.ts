import { Injectable } from '@angular/core';
import { ConfigurationModel } from './configuration.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  private _settings: ConfigurationModel;

  constructor()
  {
    this._settings = {
      serviceAddress: environment.serviceAddress,
      servicePort: environment.servicePort,
      auth0ClientId: environment.auth0ClientId,
      auth0ClientSecret: environment.auth0ClientSecret,
      auth0Audience: environment.auth0Audience,
      auth0GrantType: environment.auth0GrantType 
    };
  }

  get settings(): ConfigurationModel {  // public property
    return this._settings;
  }
  set settings( value ) {
    this._settings = value;
  }

}
