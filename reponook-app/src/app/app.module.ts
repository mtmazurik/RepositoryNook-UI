import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; // CUSTOM_ELEMENTS_SCHEMA allows the templateUrl to work
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatFormFieldModule, MatInputModule, MatSnackBarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { ConfigComponent } from './config/config.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConfigComponent
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
    MatSnackBarModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // CUSTOM_ELEMENTS_SCHEMA allows the templateUrl to work
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
