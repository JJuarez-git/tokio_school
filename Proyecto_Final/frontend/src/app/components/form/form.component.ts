import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {

  courses: string[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getCourses().subscribe({
      next: (data) => this.courses = data,
      error: (err) => console.error(err)
    })
  }

  

}
