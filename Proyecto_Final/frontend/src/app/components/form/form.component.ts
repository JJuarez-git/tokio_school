import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {

  @Input() courses: string[] = [];
  @Input() students: string[] = [];

  form = new FormGroup({
    course: new FormControl(''),
    student: new FormControl('')
  });

  loading: boolean = false;
  response: boolean = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void { }

  send(student: string, course: string) {
    this.loading = true;
    this.response = false;
    this.apiService.setStudentCourse(student, Number(course)).subscribe({
      next: (data) => {
        this.loading = false;
        this.response = true;
      },
      error: (err) => {
        this.loading = false;
        this.response = false;
        console.error(err);
      }
    })
  }

  

}
