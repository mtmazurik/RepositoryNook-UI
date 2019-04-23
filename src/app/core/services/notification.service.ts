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
  
  public open(message : string = "Default Message.", severity : string = 'info', durationSeconds: number = 3, action : string = '') {  

    var durationMilliseconds : number = durationSeconds * 1000;
    var backgroundSeverityColor : string;

    switch(severity) {
      case 'info': {
          backgroundSeverityColor = "info-snackbar";
        break;
      }
      case 'warn': {
          backgroundSeverityColor = "warn-snackbar";
        break;
      }
      case 'error': {
          backgroundSeverityColor = "error-snackbar";
        break;
      }
    }
    this.zone.run(() => {
      this.snackBar.open(message, action, { duration: durationMilliseconds, panelClass: backgroundSeverityColor}  )
    })
  }
}
