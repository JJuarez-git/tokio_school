import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_URL = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  getMessages() {
    return this.http.get<any[]>(this.API_URL + '/messages');
  }

  getAccounts() {
    return this.http.get<any[]>(this.API_URL + '/accounts');
  }

  postMessage(body: any) {
    return this.http.post<any>(this.API_URL + '/message', body);
  }
}
