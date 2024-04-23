import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {

  @Output() onSubmit = new EventEmitter();

  accounts: string[] = [];
  tx: string = '';

  form = new FormGroup({
    sender: new FormControl(''),
    name: new FormControl(''),
    content: new FormControl(''),
  });

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getAccounts().subscribe({
      next: (data) => this.accounts = data
    })
  }

  submit() {
    this.api.postMessage(this.form.value).subscribe({
      next: (data) => {
        this.tx = data.tx;
        this.form.reset();
        this.onSubmit.emit();
      },
      error: (err) => console.error(err)
    });
  }

}
