import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { ListComponent } from './components/list/list.component';
import { FormComponent } from './components/form/form.component';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormComponent, ListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  students: string[] = [];
  courses: string[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    initFlowbite();
    this.getCourses();
    this.getStudents();
  }

  getCourses() {
    this.apiService.getCourses().subscribe({
      next: (data) => this.courses = data,
      error: (err) => console.error(err)
    });
  }

  getStudents() {
    this.apiService.getStudents().subscribe({
      next: (data) => this.students = data,
      error: (err) => console.error(err)
    });
  }
}
