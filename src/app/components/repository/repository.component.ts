import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '../../core/services/configuration.service';
import { RepositoryModel } from '../../core/models/repository.model';
import { RepositoryNookAPIService } from 'src/app/core/services/repository-nook-api.service';
import { appInitializerFactory } from '@angular/platform-browser/src/browser/server-transition';
import { IDatabase } from 'src/app/core/models/api/database';
import { ICollection } from 'src/app/core/models/api/collection';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss']
})
export class RepositoryComponent implements OnInit {

  _config: ConfigurationService;
  repositorySettings: RepositoryModel;
  databases: IDatabase[];
  collections: ICollection[];

  constructor(public config:ConfigurationService, public api:RepositoryNookAPIService) { 
    this._config = config;
  }

  ngOnInit() {
    this.repositorySettings = this._config.repositorySettings;

    this.api.GetDatabases()
      .subscribe((returnDatabases: IDatabase[]) => {
        this.databases = returnDatabases;
       });

    this.api.GetCollections()
      .subscribe((collections: ICollection[]) => {
        this.collections = collections;
       });

  }
  onChange() {
    this._config.repositorySettings = this.repositorySettings;
  }
}
