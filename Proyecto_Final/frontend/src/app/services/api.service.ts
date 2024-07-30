import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API_URL = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  getCourses() {
    return this.http.get<string[]>(`${this.API_URL}/courses`);
  }
}
