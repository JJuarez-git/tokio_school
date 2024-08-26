import { Component, Input, OnInit, output } from '@angular/core';
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
  onSendComplete = output();

  form = new FormGroup({
    course: new FormControl('', { nonNullable: true }),
    student: new FormControl('', { nonNullable: true })
  });

  loading: boolean = false;
  response: boolean = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void { }

  handleClick() {
    const { course, student } = this.form.value;
    if (course && student) {
      this.send(course, student);
    }
  }

  send(course: string, student: string) {
    this.loading = true;
    this.response = false;
    this.apiService.setStudentCourse(student, Number(course)).subscribe({
      next: (data) => {
        this.loading = false;
        this.response = true;
        this.form.reset();
        this.onSendComplete.emit();
      },
      error: (err) => {
        this.loading = false;
        this.response = false;
        console.error(err);
      }
    })
  }

  

}
