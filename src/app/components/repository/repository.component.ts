import { Component, OnInit } from '@angular/core';
import { APIRepositoryNookService } from 'src/app/core/services/api-repository-nook.service';
import { ConfigurationService } from '../../core/services/configuration.service';
import { ConfigurationModel } from 'src/app/core/models/configuration.model';
import { Database } from 'src/app/core/models/api/database';
import { Collection } from 'src/app/core/models/api/collection';


@Component({
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss']
})
export class RepositoryComponent implements OnInit {

  databases: Database[];
  collections: Collection[];
  settings: ConfigurationModel;

  constructor( public configSvc:ConfigurationService, public api:APIRepositoryNookService) { 
  }

  ngOnInit() {
    
    this.settings = this.configSvc.settings;

    this.api.GetDatabases().subscribe(
          (returnDatabases: Database[]) => { this.databases = returnDatabases; }
        );
    
    this.api.GetCollections().subscribe(
          (collections: Collection[]) => { this.collections = collections; }
        );
  }

  onChangeDatabaseSelection() {
    
    this.configSvc.settings = this.settings;
    this.collections = null;

    this.api.GetCollections().subscribe(
          (collections: Collection[]) => { this.collections = collections; }
        );
  }
}
