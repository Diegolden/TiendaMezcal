import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  user_id: any;
  mezcal: string[] = [];
  mezcales: any;

  constructor(private CS: CookieService, private AU: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.user_id = this.CS.get('id_usuario');
    if(this.user_id){
      console.log(this.user_id);
    }
    this.getCompras();
  }

  verMas(id: any){
    console.log(id);
    this.router.navigate(['producto/',id]);
  }

  getCompras(){
    this.AU.getCompras(this.user_id).subscribe((data: any) => {
      console.log(data);
      for (const val of data) {
          this.AU.getMezcalesId(val.id_mezcal).subscribe((data: any) => {
            this.mezcal.push(data);
            console.log(this.mezcal);
          });
        }
      });
      this.mezcales = this.mezcal;
  }
}