import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnChanges {

  @Input() courses: string[] = [];
  @Input() students: string[] = [];
  onRadioAll = output();
  
  radio: string = 'all';
  select: string = '';

  constructor(private apiService: ApiService) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (this.radio === 'course' && this.select && changes['students']) {
      this.handleSelect(this.select);
    }
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

  handleRadioAll() {
    this.select = '';
    this.onRadioAll.emit();
  }

  handleRadioCourse() {
    this.students = [];
  }



}
