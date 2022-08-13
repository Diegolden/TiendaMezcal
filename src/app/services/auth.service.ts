import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  URL = 'http://localhost:3000/';

  login(login: any): Observable<Request> {
    return this.http.post<Request>(`${this.URL}usuarios/login`, login
    );
  }

  registro(registro: any): Observable<Request>{
    return this.http.post<Request>(`${this.URL}usuarios`, registro);
  }

  verificarCorreo(login: any): Observable<Request> {
    return this.http.post<Request>(`${this.URL}usuarios/correo`, login
    );
  }

  getMezcalesAll(): Observable<Request> {
    return this.http.get<Request>(`${this.URL}mezcales`
    );
  }

  getMezcalesId(id: any): Observable<Request> {
    return this.http.get<Request>(`${this.URL}mezcales/${id}`
    );
  }

  createMezcalesId(compras: any): Observable<Request> {
    return this.http.post<Request>(`${this.URL}compras`, compras
    );
  }

  createCompras(compras: any): Observable<Request> {
    return this.http.post<Request>(`${this.URL}compras`, compras
    );
  }

  getCompras(id: any): Observable<Request> {
    return this.http.get<Request>(`${this.URL}compras/${id}`
    );
  }

}
