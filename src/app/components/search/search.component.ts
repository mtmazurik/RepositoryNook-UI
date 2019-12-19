import { Component, OnInit, Input } from '@angular/core';
import { APIRepositoryNookService } from '../../core/services/api-repository-nook.service';
import { ConfigurationService} from '../../core/services/configuration.service';
import { Repository } from '../../core/models/api/repository'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  repositorySetting: string;      // display the db\collection being referenced
  filter: string;                 // did the user type in a filter (either a key (name:value) or a tag (name:value) )
  repositoryItems: Repository[];  // returned Repo items

  displayColumns = ['_id', 'key', 'data']; // column headings

  constructor(public configSvc: ConfigurationService, public api: APIRepositoryNookService) {
      this.repositorySetting = configSvc.settings.database + '/' + configSvc.settings.collection;
   }

  ngOnInit() {
  }

  onSearchClick() {
      this.api.GetAll()
      .subscribe((returnObjects: Repository[]) => {
        this.repositoryItems = returnObjects;
      });
  }
}
