import { Component, OnInit } from '@angular/core';
import { RepositoryNookAPIService } from '../../core/services/repository-nook-api.service';
import { ConfigurationService} from '../../core/services/configuration.service';
import { IRepository } from '../../core/models/api/repository'
import { ConfigurationModel } from 'src/app/core/models/configuration.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {

  repositorySetting: string;

  constructor(public configSvc:ConfigurationService, public api:RepositoryNookAPIService) {
      this.repositorySetting = configSvc.settings.database + "/" + configSvc.settings.collection;
   }

  repositoryItems: IRepository[];

  ngOnInit() {
  }
  onSearchClick() {
    
    this.api.GetAll()
      .subscribe((returnObjects: IRepository[]) => {
        this.repositoryItems = returnObjects;
      });
  }
}
