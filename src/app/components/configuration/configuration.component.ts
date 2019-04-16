import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ConfigurationModel } from './configuration.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY } from '@angular/cdk/overlay/typings/overlay-directives';
import { rendererTypeName } from '@angular/compiler';
import { NotificationService } from '../../core/services/notification.service';
import { AuthenticationService } from '../../core/services/authentication.service'

@Component({
    templateUrl: './configuration.component.html',
    styleUrls: ['./configuration.component.scss']
})
export class ConfigComponent implements OnInit {
    configData: ConfigurationModel;

    constructor(private httpClient: HttpClient, public auth:AuthenticationService, private notify: NotificationService) { } // ctor

    ngOnInit(): void {
        this.configData = {
            serverAddress: "http://localhost",
            port: 8902,
            auth0ClientId: "Tl3SnziPkp4qRjRuajZWfrAeMn6Dxwr6",
            auth0ClientSecret: "Ep36WseJFCSnU5IsMdDxJh_JKyhlyKDfw0_epmihC4JroW1SvVtvDa9BHuwDGPMJ",
            auth0Audience: "endpoint-security.containernooks.com"
        };
    }

    ping() : any { // button: ping (not authenticated)
        let uri:string = this.configData.serverAddress + ':' + this.configData.port + '/admin/ping';   
        this.httpClient
            .get(uri, {responseType: "text"})
            .subscribe( 
                respBody => this.notify.open(respBody, 'info', 3),
                error => this.notify.open('GET Ping error. Check REST URI and port number and retry.', 'error')
            );
    }
    getVersion() : any { // button: GET Version (authenticated)
        let uri:string = this.configData.serverAddress + ':' + this.configData.port + '/admin/version';   
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
} 