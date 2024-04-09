import { Component, Input } from '@angular/core';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-toast-info',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule],
  templateUrl: './toast-info.component.html',
  styleUrl: './toast-info.component.css'
})
export class ToastInfoComponent {

  @Input() msg = ''

  constructor() {}

  
}
