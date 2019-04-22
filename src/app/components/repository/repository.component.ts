import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '../../core/services/configuration.service';
import { RepositoryModel } from '../../core/models/repository.model';
import { RepositoryNookAPIService } from 'src/app/core/services/repository-nook-api.service';
import { IDatabase } from 'src/app/core/models/api/database';
import { ICollection } from 'src/app/core/models/api/collection';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss']
})
export class RepositoryComponent implements OnInit {

  repositorySettings: RepositoryModel;
  databases: IDatabase[];
  collections: ICollection[];

  constructor(public configSvc:ConfigurationService, public api:RepositoryNookAPIService) { 
  }

  ngOnInit() {
    this.repositorySettings = this.configSvc.repositorySettings;

    this.api.GetDatabases()
      .subscribe((returnDatabases: IDatabase[]) => {
        this.databases = returnDatabases;
       });

    this.api.GetCollections()
      .subscribe((collections: ICollection[]) => {
        this.collections = collections;
       });
  }
  onChangeDatabaseSelection() {
    this.configSvc.repositorySettings = this.repositorySettings;
    this.collections = null;
    this.api.GetCollections()
      .subscribe((collections: ICollection[]) => {
        this.collections = collections;
      });
  }
}
