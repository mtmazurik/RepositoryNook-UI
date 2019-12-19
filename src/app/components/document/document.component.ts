import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '../../core/services/configuration.service';
import { ConfigurationModel } from 'src/app/core/models/configuration.model';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {

  editInProgress : boolean;
  settings: ConfigurationModel;

  _id: string;
  key: string;
  app: string;
  database: string;
  collection: string;
  validate: string;
  schemaURI: string;
  innerData: string;

  constructor(public configSvc:ConfigurationService) { 
    this.settings = this.configSvc.settings;
  }


  ngOnInit() {
    this.database = this.settings.database;
    this.collection = this.settings.collection;
  }

  onSaveClick() {
    this.editInProgress = false;
  }
  
}
