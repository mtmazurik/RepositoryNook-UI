import { Component } from '@angular/core';
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(public snackBar: MatSnackBar) {}
  navItems: any[] = [
    { path: '/home', title: 'Home'},
  ]

  popupItems: any[] = [
    { path: '/config' }
  ]

  events: string[] = [];
  opened: boolean;

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
