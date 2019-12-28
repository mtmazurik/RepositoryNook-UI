import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  navItems: any[] = [
    { path: '/repository', title: 'Repository'},
    { path: '/documents', title: 'Documents'}
  ]

  moreEllipsisItems: any[] = [
    { path: '/config' },
    { path: '/help' }
  ]

  events: string[] = [];
  opened: boolean;

  constructor() {
  }

  ngOnInit() {
  }
}
