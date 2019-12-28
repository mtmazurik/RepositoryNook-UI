import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { APIRepositoryNookService } from '../../../core/services/api-repository-nook.service';
import { ConfigurationService } from '../../../core/services/configuration.service';
import { ConfigurationModel } from 'src/app/core/models/configuration.model';
import { Repository } from '../../../core/models/api/repository';
import { Router } from '@angular/router'


@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {
  @Output() OnEditInProgressChange = new EventEmitter();

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

  validateEnabled = false;

  constructor(public configSvc:ConfigurationService, public api: APIRepositoryNookService, private router: Router ) { 
    this.settings = this.configSvc.settings;
  }

  
  ngOnInit() {
    this.database = this.settings.database;
    this.collection = this.settings.collection;
  }

  onSaveClick() {
    let repositoryObject = new Repository();
      repositoryObject._id= (this.id === "") ? null : this.id;
      repositoryObject.key = this.key;
      repositoryObject.app = this.app; 
      repositoryObject.repository = this.database;
      repositoryObject.collection = this.collection;
      repositoryObject.validate = (this.validateEnabled) ? true : false;
      repositoryObject.schemaUri = (this.schemaURI) ? this.schemaURI : "";
      repositoryObject.data = this.innerData;

    let returnRepo = this.api.CreateNew(repositoryObject);    // calling with a Promise (instead of observable)
    returnRepo.then( repo => this.id = repo._id);             // update display with inserted guid

  }
  
}
