import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { ListComponent } from './components/list/list.component';
import { FormComponent } from './components/form/form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormComponent, ListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'frontend';

  ngOnInit(): void {
    initFlowbite();
  }
}
