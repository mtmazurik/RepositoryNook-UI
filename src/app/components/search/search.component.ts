import { Component, OnInit } from '@angular/core';
import { APIRepositoryNookService } from '../../core/services/api-repository-nook.service';
import { ConfigurationService} from '../../core/services/configuration.service';
import { Repository } from '../../core/models/api/repository'
import { ConfigurationModel } from 'src/app/core/models/configuration.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {

  repositorySetting: string;

  constructor(public configSvc: ConfigurationService, public api: APIRepositoryNookService) {
      this.repositorySetting = configSvc.settings.database + '/' + configSvc.settings.collection;
   }

  repositoryItems: Repository[];
  displayColumns = ['_id', 'key', 'data'];

  ngOnInit() {
  }
  onSearchClick() {
      this.api.GetAll()
      .subscribe((returnObjects: Repository[]) => {
        this.repositoryItems = returnObjects;
      });
  }
}
