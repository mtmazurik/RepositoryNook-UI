import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Injectable({  providedIn: 'root' })
export class NotificationService {

  public subject_notification: Subject<string> = new Subject();

  constructor(
    public snackBar: MatSnackBar,
    private zone: NgZone    
  ) { }
  
  public open(message : string = "Default Message.", action : string = 'Dismiss', duration = 20000) {
    this.zone.run(() => {
      this.snackBar.open(message, action, { duration, panelClass : 'glam-snackbar' }  )
    })
  }
}
