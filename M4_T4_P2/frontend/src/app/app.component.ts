import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { ContentComponent } from './components/content/content.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ContentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'DeSoc';

  ngOnInit(): void {
    initFlowbite();
  }
}
