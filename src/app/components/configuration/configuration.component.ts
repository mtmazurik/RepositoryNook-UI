import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, config } from 'rxjs';
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY } from '@angular/cdk/overlay/typings/overlay-directives';
import { rendererTypeName } from '@angular/compiler';
import { NotificationService } from '../../core/services/notification.service';
import { AuthenticationService } from '../../core/services/authentication.service';
import { environment } from '../../../environments/environment';
import { ConfigurationModel } from '../../core/services/configuration.model';
import { ConfigurationService } from '../../core/services/configuration.service';

@Component({
    templateUrl: './configuration.component.html',
    styleUrls: ['./configuration.component.scss']
})
export class ConfigComponent implements OnInit {

    configData: ConfigurationModel;

    constructor(private httpClient: HttpClient, public auth:AuthenticationService, private notify: NotificationService, private configService: ConfigurationService)
    { 
    } 

    ngOnInit(): void {
        this.configData = this.configService.settings;
    }

    ping() { // button: ping (not authenticated)

        let uri:string = this.configData.serviceAddress + ':' + this.configData.servicePort + '/admin/ping';   
        this.httpClient
            .get(uri, {responseType: "text"})
            .subscribe( 
                respBody => this.notify.open(respBody, 'info', 3),
                error => this.notify.open('GET Ping error. Check REST URI and port number and retry.', 'error')
            );
    }
    getVersion() { // button: GET Version (authenticated)
        let uri:string = this.configData.serviceAddress + ':' + this.configData.servicePort + '/admin/version';   
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
    saveConfig() {
        this.configService.settings = this.configData;
    }
} 