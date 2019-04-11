import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from './config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class ConfigService {
  constructor(private http: HttpClient) {
  }

//   getConfigData(): Observable<Config> {
//       return this.http.get<Config>('config/config.json');
//   }
}