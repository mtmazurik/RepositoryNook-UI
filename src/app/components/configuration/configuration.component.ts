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

    configData: ConfigurationModel;

    constructor(private httpClient: HttpClient, public configService: ConfigurationService, public repositoryNook: RepositoryNookAPIService) { } 

    ngOnInit(): void {
        this.configData = this.configService.environmentSettings;
    }

    onPingClick() { 
        this.repositoryNook.Ping();
    }
    onGetVersionClick(){
        this.repositoryNook.GetVersion();
    }

    onChange() {
        this.configService.environmentSettings = this.configData;
    }
} 