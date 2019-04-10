import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Config } from './config';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY } from '@angular/cdk/overlay/typings/overlay-directives';

@Component({
    templateUrl: './config.component.html',
    styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {
    configData: Config;

    @Output('snackbarMessage')
    change: EventEmitter<string> = new EventEmitter<string>();

    constructor(private httpClient: HttpClient, private configService: ConfigService){ } // ctor

    ngOnInit(): void {
        this.configData = {
            serverAddress: "http://localhost",
            port: 8902,
            auth0ClientId: "Tl3SnziPkp4qRjRuajZWfrAeMn6Dxwr6",
            auth0ClientSecret: "Ep36WseJFCSnU5IsMdDxJh_JKyhlyKDfw0_epmihC4JroW1SvVtvDa9BHuwDGPMJ",
            auth0Audience: "endpoint-security.containernooks.com"
        };
        // this.configService.getConfigData()
        // .subscribe(data => {
        //     console.log(data);
        // });
    }
    ping() : any {
        this.httpClient.get("http://localhost:8902/admin/ping").subscribe((res)=>{
            this.change.emit(res.toString());
        })
    }
}