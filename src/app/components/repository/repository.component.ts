import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '../../core/services/configuration.service';
import { RepositoryModel } from '../../core/models/repository.model';
import { IDatabase } from 'src/app/core/models/api/database';
import { RepositoryNookAPIService } from 'src/app/core/services/repository-nook-api.service';
import { appInitializerFactory } from '@angular/platform-browser/src/browser/server-transition';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss']
})
export class RepositoryComponent implements OnInit {

  repositoryData: RepositoryModel;
  databases: IDatabase[];

  constructor(public config:ConfigurationService, public api:RepositoryNookAPIService) { 
    this.repositoryData = config.repositorySettings;
  }

  ngOnInit() {
    this.api.GetDatabases()
      .subscribe((databasesData: IDatabase[]) => {
        this.databases = databasesData;
       });
  }

}
