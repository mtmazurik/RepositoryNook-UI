import { Component, OnInit } from '@angular/core';
import { RepositoryNookAPIService } from 'src/app/core/services/repository-nook-api.service';
import { ConfigurationService } from '../../core/services/configuration.service';
import { ConfigurationModel } from 'src/app/core/models/configuration.model';
import { NotificationService } from '../../core/services/notification.service';
import { IDatabase } from 'src/app/core/models/api/database';
import { ICollection } from 'src/app/core/models/api/collection';
import { AuthenticationService } from '../../core/services/authentication.service';

@Component({
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss']
})
export class RepositoryComponent implements OnInit {

  databases: IDatabase[];
  collections: ICollection[];
  settings: ConfigurationModel;

  constructor(public configSvc:ConfigurationService, public api:RepositoryNookAPIService, public notify:NotificationService, public authSvc: AuthenticationService) { 
  }

  ngOnInit() {
    this.settings = this.configSvc.settings;
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
    this.configSvc.settings = this.settings;
    this.collections = null;
    this.api.GetCollections()
      .subscribe((collections: ICollection[]) => {
        this.collections = collections;
      });
  }
}
