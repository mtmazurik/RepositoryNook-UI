import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigurationModel } from '../../core/models/configuration.model';
import { ConfigurationService } from '../../core/services/configuration.service';
import { APIRepositoryNookService } from 'src/app/core/services/api-repository-nook.service';

@Component({
    templateUrl: './configuration.component.html',
    styleUrls: ['./configuration.component.scss']
})
export class ConfigComponent implements OnInit {

    configuration: ConfigurationModel;

    constructor(public configSvc: ConfigurationService, public repositoryNook: APIRepositoryNookService) { } 

    ngOnInit(): void {
        this.configuration = this.configSvc.settings;
    }

    onPingClick() { 
        this.repositoryNook.Ping();
    }
    onGetVersionClick(){
        this.repositoryNook.GetVersion();
    }

    onChange() {
        this.configSvc.settings = this.configuration;
    }
} 
