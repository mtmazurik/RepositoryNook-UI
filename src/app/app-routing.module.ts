import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigComponent } from './components/configuration/configuration.component';
import { HomeComponent } from './components/home/home.component';
import { RepositoryComponent } from './components/repository/repository.component';
import { SearchComponent } from './components/search/search.component';
import { DocumentComponent } from './components/document/document.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent },
  { path: 'config', component: ConfigComponent },
  { path: 'repository', component: RepositoryComponent },
  { path: 'search', component: SearchComponent },
  { path: 'document', component: DocumentComponent },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
