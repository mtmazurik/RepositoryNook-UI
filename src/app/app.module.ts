import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; // CUSTOM_ELEMENTS_SCHEMA allows the templateUrl to work
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatFormFieldModule, MatInputModule, MatSnackBarModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { ConfigComponent } from './components/configuration/configuration.component';
import { HomeComponent } from './components/home/home.component';
import { RepositoryComponent } from './components/repository/repository.component';
import { AuthenticationService } from './core/services/authentication.service';
import { ConfigurationService } from './core/services/configuration.service';
import { RepositoryNookAPIService } from './core/services/repository-nook-api.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConfigComponent,
    RepositoryComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatSelectModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // CUSTOM_ELEMENTS_SCHEMA allows the templateUrl to work
  providers: [
    AuthenticationService,
    ConfigurationService,
    RepositoryNookAPIService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
