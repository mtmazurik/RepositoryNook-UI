import { Component } from '@angular/core';
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  navItems: any[] = [
    { path: '/home', title: ''},
    { path: '/repository', title: 'Repository'},
  ]

  popupItems: any[] = [
    { path: '/config' }
  ]

  events: string[] = [];
  opened: boolean;

}
