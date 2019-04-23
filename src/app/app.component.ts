import { Component, OnInit } from '@angular/core';

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


  constructor() {
  }

  ngOnInit() {
    }
}
