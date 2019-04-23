import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigurationModel } from '../../core/models/configuration.model';
import { ConfigurationService } from '../../core/services/configuration.service';
import { RepositoryNookAPIService } from 'src/app/core/services/repository-nook-api.service';

@Component({
    templateUrl: './configuration.component.html',
    styleUrls: ['./configuration.component.scss']
})
export class ConfigComponent implements OnInit {

    settings: ConfigurationModel;

    constructor(public configSvc: ConfigurationService, public repositoryNook: RepositoryNookAPIService) { } 

    ngOnInit(): void {
        this.settings = this.configSvc.settings;
    }

    onPingClick() { 
        this.repositoryNook.Ping();
    }
    onGetVersionClick(){
        this.repositoryNook.GetVersion();
    }

    onChange() {
        this.configSvc.settings = this.settings;
    }
} 