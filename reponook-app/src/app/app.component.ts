import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  navItems: any[] = [
    { path: '/home', title: 'Home'},
  ]

  popupItems: any[] = [
    { path: '/config' }
  ]

  events: string[] = [];
  opened: boolean;
}
