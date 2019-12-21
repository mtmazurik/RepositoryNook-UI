import { Component, OnInit } from '@angular/core';
import { APIRepositoryNookService } from '../../core/services/api-repository-nook.service';
import { ConfigurationService } from '../../core/services/configuration.service';
import { ConfigurationModel } from 'src/app/core/models/configuration.model';
import { Repository } from '../../core/models/api/repository';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {


  settings: ConfigurationModel;

  id: string;
  key: string;
  app: string;
  database: string;
  collection: string;
  validate: string;
  schemaURI: string;
  innerData: string;

  returnRepositoryObject: Repository;

  constructor(public configSvc:ConfigurationService, public api: APIRepositoryNookService ) { 
    this.settings = this.configSvc.settings;
  }


  ngOnInit() {
    this.database = this.settings.database;
    this.collection = this.settings.collection;
  }

  onSaveClick() {
    let repositoryObject = new Repository();
      repositoryObject._id=this.id;
      repositoryObject.key = this.key;
      repositoryObject.app = this.app; 
      repositoryObject.repository = this.database;
      repositoryObject.collection = this.collection;
      repositoryObject.validate = this.validate.match(/^(true|yes|t|y|1)$/i) ? true : false;
      repositoryObject.schemaUri = this.schemaURI;
      repositoryObject.data = this.innerData;

    let returnRepo = this.api.CreateNew(repositoryObject);    // calling with a Promise (instead of observable)
    returnRepo.then( repo => this.id = repo._id);             // update display with inserted guid
  }
  
}
