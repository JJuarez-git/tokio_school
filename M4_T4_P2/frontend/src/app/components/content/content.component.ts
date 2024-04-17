import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { ApiService } from '../../services/api.service';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CardComponent, MessageComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent implements OnInit {

  messages: any[] = []

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getMessages();
  }

  onSubmit() {
    this.getMessages();
  }

  getMessages() {
    this.api.getMessages().subscribe({
      next: (data) => this.messages = data
    })
  }

}
