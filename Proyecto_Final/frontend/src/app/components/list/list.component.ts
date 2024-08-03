import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  students: string[] = ["Jose", "Marta", "Luis", "Natalia"];

  avatarURL(name: string) {
    return `https://api.multiavatar.com/${name}.svg`;
  }

}
