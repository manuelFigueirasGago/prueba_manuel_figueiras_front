import { Component } from '@angular/core';
import { PruebaService } from 'app/services/prueba.service';
import { ToastInfoComponent } from '../toast-info/toast-info.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [ToastInfoComponent, MatInputModule, MatFormFieldModule, MatButton, FormsModule],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {

  // Zona variables
  x: number = 0
  y: number = 0
  n: number = 0

  resultado: Object | null = null

  errorMsg: string = ''

  constructor(private pruebaService: PruebaService){}

  ngOnInit(): void {
    // Nos subscribimos al evento de cambio de resultado
   this.pruebaService.resultado$.subscribe(res => {
    this.resultado = res
   })
    
  }

  // Función utilizada para enviar la petición GET y recibir el resultado
  onSendGet() {
    this.pruebaService.getPrueba(this.x, this.y, this.n)
  }

  // Función utilizada para enviar la petición POST y recibir el resultado
  onSendPost() {
    let requestBody = {
      x: this.x,
      y: this.y,
      n: this.n
    }
    this.resultado = this.pruebaService.postPrueba(requestBody)
  }

}
