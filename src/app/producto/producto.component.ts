import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  user_id: any;
  id: any;
  mezcal = {
    id_mezcal: "",
    nombre: "",
    stock: "",
    precio: "",
    img: "",
    descripcion: "",
    medida: {
      id_medida: "",
      ml: ""
    },
    Tipomezcales: {
      id_tipo_mezcal: "",
      nombre: ""
    }
  };
  carrito: any;

  constructor(private CS: CookieService, private AR: ActivatedRoute, private AU: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.id = this.AR.snapshot.params['id'];
    if(this.id){
      this.getMezcalID(this.id);
    }

    this.user_id = this.CS.get('id_usuario');
    if(this.user_id){
      console.log(this.user_id);
    }
  }

  getMezcalID(id: any){
    console.log(id);
    this.AU.getMezcalesId(id).subscribe((data: any) => {
      console.log(data);
      this.mezcal = data;
    });
  }

  agregarCarrito(id: any){
    const ar : string[] = [];
    this.carrito = this.CS.get('id');
    console.log(this.carrito);
    if(this.carrito){
      const variable = this.carrito.toString()+','+id.toString();
      ar.push(variable);
      this.CS.set('id', ar.toString(), 1, '/');
    }else{
      ar.push(id.toString());
      this.CS.set('id', ar.toString(), 1, '/');
    }
  }

  verificar(id: any){
    console.log(id);
    alert('Necesitas iniciar sesión para agregar productos al carrito');
    this.router.navigate(['/login']);
  }
  agregarFavorito(id: any){
    const ar : string[] = [];
    this.carrito = this.CS.get('favoritos');
    console.log(this.carrito);
    if(this.carrito){
      const variable = this.carrito.toString()+','+id.toString();
      ar.push(variable);
      this.CS.set('favoritos', ar.toString(), 1, '/');
    }else{
      ar.push(id.toString());
      this.CS.set('favoritos', ar.toString(), 1, '/');
    }
    alert('Se agrego a favoritos');
    this.router.navigate(['/favoritos']);


  }
  verificar2(id: any){
    console.log(id);
    alert('Necesitas iniciar sesión para agregar productos a tu lista de favoritos');
    this.router.navigate(['/login']);
  }
}
