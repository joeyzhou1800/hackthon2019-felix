import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

// Usage:
//    service.get(url, options, server) -> Observable
//    service.post(url, options, server) -> Observable
@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(public http: HttpClient) {}

  get(url: string,
      options = {headers : {'Content-Type': 'application/json'}},
      server = environment.serverUrl) {
    return this.http.get(server + url, options as any);
  }

  post(url: string, data: any,
      options = {headers : {'Content-Type': 'application/json'}},
      server = environment.serverUrl) {
    return this.http.post(server + url, data, options);
  }
}
