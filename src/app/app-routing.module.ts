import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigComponent } from './components/configuration/configuration.component';
import { HomeComponent } from './components/home/home.component';
import { RepositoryComponent } from './components/repository/repository.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { DocumentComponent } from './components/subcomponents/document/document.component';
import { SearchComponent } from './components/subcomponents/search/search.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent },
  { path: 'config', component: ConfigComponent },
  { path: 'repository', component: RepositoryComponent },
  { path: 'documents', 
    component: DocumentsComponent,
    children: [
      { path: 'search', component: SearchComponent },
      { path: 'document', component: DocumentComponent }
    ] },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
/* export const routingComponents = [ HomeComponent,    // this was in a video, I haven't used this routingComponents array, as of yet
                                   ConfigComponent,
                                   RepositoryComponent,
                                   DocumentsComponent,
                                   SearchComponent,
                                   DocumentComponent] */
