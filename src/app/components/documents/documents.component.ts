import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {


  currentNavButton: string;

  constructor(private route:ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.OnDocumentsNavClick('search'); // start with search screen showing
  }

  OnDocumentsNavClick(navRoute: string) {
    switch( navRoute ) {
      case "new":
        this.router.navigate(['document'], {relativeTo: this.route});
        this.currentNavButton = "new";
        break;
      case "search":
        this.router.navigate(['search'], {relativeTo: this.route});
        this.currentNavButton = "search";
        break;
      case "edit":
        this.router.navigate(['document'], {relativeTo: this.route});
        this.currentNavButton = "edit";
        break;
    }
  }
}
