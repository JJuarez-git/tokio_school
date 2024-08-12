import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  students: string[] = [];
  courses: string[] = [];
  radio: string = 'all';
  select: string = '';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getCourses().subscribe({
      next: (data) => this.courses = data,
      error: (err) => console.error(err)
    })

    this.apiService.getStudents().subscribe({
      next: (data) => this.students = data,
      error: (err) => console.error(err)
    })
  }

  avatarURL(name: string) {
    return `https://api.multiavatar.com/${name}.svg`;
  }

  handleSelect(value: string) {
    this.apiService.getCourseStudents(Number(value)).subscribe({
      next: (data) => this.students = data,
      error: (err) => console.error(err)
    });
  }

}
