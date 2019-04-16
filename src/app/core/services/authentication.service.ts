import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from "rxjs"
import { NotificationService } from './notification.service';

interface Auth0ResponseModel {
  access_token: string;
  expires_in: string;
  token_type: string;
}

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class AuthenticationService {

  private _accessToken: string;
  private _expiresAt: number;

  userProfile: any;

  constructor(public router: Router, private http: HttpClient, public notify: NotificationService) {
    this._accessToken = '';
    this._expiresAt = 0;
  }

  get accessToken(): string { // public property
    return this._accessToken;
  }
  private auth0Response : Auth0ResponseModel = null;
  public renewTokens(): void {
      let uri:string = 'https://cloudcomputingassociates.auth0.com/oauth/token';   
      this.http
          .post(uri, {"client_id":"TI3SnziPkp4qRjRuajZWfrAeMn6Dxwr6","client_secret":"Ep36WseJFCSnU5IsMdDxJh_JKyhIyKDfw0_epmihC4JroW1SvVtvDa9BHuwDGPMJ","audience":"endpoint-security.containernooks.com","grant_type":"client_credentials"},
                { responseType: "json" })
          .subscribe( ( resp : Auth0ResponseModel) => { 
                        this.auth0Response = resp;
                        this.setAccessToken(this.auth0Response.access_token);
                      },
                      error => this.notify.open("error")
                    ) 
      var date = new Date();
      this._expiresAt = date.setDate(date.getDate() + 1); // value always returned of 86400 == 24 hours == 1 day
  }
  private setAccessToken(accessToken:string)
  {
    this._accessToken = accessToken;
  }
  public isAuthenticated(): boolean {
    var date = new Date();
    return date.getDate() < this._expiresAt;
  }

}

