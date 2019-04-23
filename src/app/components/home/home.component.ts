import { Component } from '@angular/core';
import { AuthenticationService } from '../../core/services/authentication.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    constructor(public authSvc:AuthenticationService, public notify:NotificationService)
    {
        this.authSvc.refreshToken();
    }
    ngOnInit(): void {
    }
}