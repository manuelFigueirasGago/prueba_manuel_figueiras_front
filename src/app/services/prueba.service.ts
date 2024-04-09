import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import { pruebaRequest } from 'app/model/pruebaRequest';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
  
})
export class PruebaService {

  constructor(private httpClient: HttpClient, private snackbar: MatSnackBar) { }

  private resultado = new BehaviorSubject<Object | null>(null)
  public resultado$ = this.resultado.asObservable()

  // Get resultado
  getResultado() {
    return this.resultado;
  }

  // Credenciales (mocked)
  username = 'user'
  password = '123'
  credentials = btoa(this.username + ':' + this.password)

  headersAux = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + this.credentials
  })

  // Obtención resultado prueba métdodo GET
  async getPrueba(x: number, y: number, n: number) {
    let params = ''

    if (x || x === 0) {
      params += 'x=' + x
    }
    
    if (y || y === 0) {
      params.length > 0 ? params += '&y=' + y : params += 'y=' + y
      
    }

    if (n || n === 0) {
      params.length > 0 ? params += '&n=' + n :  params += 'n=' + n
      
    }

    this.httpClient.get(`${environment.baseUrl}/operativa?${params}`, {headers: this.headersAux, observe: 'response'}).subscribe(res => {
      this.resultado.next(res ? res.body : null)
    },
    (error: any) => {
      this.resultado.next(null)
      if (error.status === 401 || error.status === 403) {
        this.snackbar.open('Cliente no autorizado a hacer peticiones al API','Cerrar', {duration: 3000})
      } else {
        this.snackbar.open(error.error.message,'Cerrar', {duration: 3000})
      }
    })
  }

  // Obtención resultado prueba métdodo POST
  postPrueba(pruebaRequest: pruebaRequest): any {
    this.httpClient.post(environment.baseUrl + '/operativa', pruebaRequest, {headers: this.headersAux, observe: 'response'}).subscribe(res => {
      this.resultado.next(res ? res.body : null)
    },
    (error: any) => {
      this.resultado.next(null)
      if (error.status === 401 || error.status === 403) {
        this.snackbar.open('Cliente no autorizado a hacer peticiones al API','Cerrar', {duration: 3000})
      } else {
        this.snackbar.open(error.error.message, 'Cerrar', {duration: 3000})
      }
    })
  }

}
