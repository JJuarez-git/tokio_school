import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {

  courses: string[] = [];
  select: string = '';
  student: string = '';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getCourses().subscribe({
      next: (data) => this.courses = data,
      error: (err) => console.error(err)
    })
  }

  send(student: string, course: string) {
    this.apiService.setStudentCourse(student, Number(course)).subscribe({
      next: (data) => { },
      error: (err) => console.error(err)
    })
  }

  

}
