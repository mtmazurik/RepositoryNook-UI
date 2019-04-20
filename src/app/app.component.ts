import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from "@angular/material";
import { AuthenticationService } from './core/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  navItems: any[] = [
    { path: '/home', title: ''},
    { path: '/repository', title: 'Repository'},
  ]

  moreEllipsisItems: any[] = [
    { path: '/config' }
  ]

  events: string[] = [];
  opened: boolean;


  constructor(public auth: AuthenticationService) {
  }

  ngOnInit() {
    if (!this.auth.isAuthenticated()){
      this.auth.renewTokens();
    }
  }
}
