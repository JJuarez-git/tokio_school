import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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

  @Input() courses: string[] = [];
  @Input() students: string[] = [];
  
  radio: string = 'all';
  select: string = '';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void { }

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
