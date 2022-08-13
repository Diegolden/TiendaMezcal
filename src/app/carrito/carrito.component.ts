import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  carrito: any;
  car: any;
  ids: any;
  data: any;
  mezcal: string[] = [];
  ar: string[] = [];
  precioTotal = 0;
  variable: any;
  arr: string[] = [];
  compras = {
    id_usuario: '',
    id_mezcal: ''
  };
  boton = false;

  constructor(private CS: CookieService, private AU: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.obtener();
  }

  obtener() {
    this.carrito = this.CS.get('id');
    for (const val of this.carrito) {
      if (val == ',') {

      } else {
        this.ar.push(val);
        this.getMezcalID(val);
      }
    }
    this.data = this.mezcal;
  }

  getMezcalID(id: any) {
    console.log(id);
    this.AU.getMezcalesId(id).subscribe((data: any) => {
      if (data) {
        this.mezcal.push(data);
        this.precioTotal = this.precioTotal + data.precio;
        console.log(this.mezcal);
        this.boton = true;
      } else {
        this.boton = false;
      }
    });
  }

  eliminar(id: any) {
    this.ar = [];
    this.arr = [];
    this.mezcal = [];
    this.carrito = [];
    this.data = [];
    this.precioTotal = 0;
    this.carrito = this.CS.get('id');

    for (const val of this.carrito) {
      if (val == id) {
        id = "finish";
      } else if (val == ',') {

      } else {
        this.ar.push(val);
        this.getMezcalID(val);
        this.arr.push(val);
      }
    }
    this.CS.set('id', this.arr.toString(), 1, '/');
    this.data = this.mezcal;
  }

  comprar() {
    this.carrito = this.CS.get('id');
    if (this.carrito) {

      this.compras.id_usuario = this.CS.get('id_usuario');
      for (const val of this.carrito) {
        if (val == ',') { } else {
          this.compras.id_mezcal = val;
          this.AU.createMezcalesId(this.compras).subscribe((data: any) => {
            if (data) {
              console.log(data);
            }
          });
        }
      }
      alert('Comprado');
      this.CS.delete('id');
      this.router.navigate(['/compras']);
    } else {
      alert('Elige al menos un producto');
    }
  }

}
