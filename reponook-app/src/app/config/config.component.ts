import { Component, OnInit } from '@angular/core';
import { Config } from './config';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY } from '@angular/cdk/overlay/typings/overlay-directives';

@Component({
    templateUrl: './config.component.html',
    styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {
    configData: Config;

    constructor(private configService: ConfigService){

    }

    ngOnInit(): void {
        this.configData = {
            serverAddress: "http://www.google.com",
            port: 8902,
            auth0ClientId: "Tl3SnziPkp4qRjRuajZWfrAeMn6Dxwr6",
            auth0Client2Id: "Ep36WseJFCSnU5IsMdDxJh_JKyhlyKDfw0_epmihC4JroW1SvVtvDa9BHuwDGPMJ",
            auth0Audience: "enpoint-security.containernooks.com"
        };
        // this.configService.getConfigData()
        // .subscribe(data => {
        //     console.log(data);
        // });
    }
}