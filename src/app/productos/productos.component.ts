import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  user_id: any;
  mezcales: any;

  constructor(private CS: CookieService, private AU: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.user_id = this.CS.get('id_usuario');
    if(this.user_id){
      console.log(this.user_id);
    }
    this.getMezcales();
  }

  verMas(id: any){
    console.log(id);
    this.router.navigate(['producto/',id]);
  }

  getMezcales(){
    this.AU.getMezcalesAll().subscribe((data: any) => {
      console.log(data);
      this.mezcales = data;
    });
  }

}
