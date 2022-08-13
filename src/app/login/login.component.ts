import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  emailCheck= '^[a-z0-9._*+-]+@[a-z0-9.-]+\\.[a-z]{2,5}$';

  emailReq(){
    return this.miFormulario.controls['correo']?.errors?.['required'] &&
           this.miFormulario.controls['correo']?.touched;
  }
  
  emailPattern(){
    return this.miFormulario.controls['correo']?.errors?.['pattern'] &&
           this.miFormulario.controls['correo']?.touched;
  }
  
    miFormulario: FormGroup = this.fb.group({
      correo: ['',[Validators.required]],
      password: ['',[Validators.required, Validators.minLength(8)]]
    });
  
    constructor(private fb: FormBuilder, private CS: CookieService, private router: Router, private AS: AuthService){ }
  
    ngOnInit(): void {
  
      this.miFormulario.setValue({
        correo: '',
        password: '',
      });
  
      if(this.CS.get('access_token')){
        this.router.navigate(['/welcome']);
      } 
    }
  
    campoValido(campo: string){
      return this.miFormulario.controls[campo].errors 
            && this.miFormulario.controls[campo].touched;
  
    }
  
    save(){
      console.log(this.miFormulario.value);
      this.AS.login(this.miFormulario.value).subscribe((data: any) =>{
        if(data){
          console.log(data);
          this.CS.set('access_token', 'RKS234KRF', 1, '/');
          this.CS.set('id_usuario', data.id_usuario, 1, '/');
          this.CS.set('usuario', data.usuario, 1, '/');
          this.CS.set('correo', data.correo, 1, '/');
          this.CS.set('nombre', data.nombre, 1, '/');
          this.CS.set('a_p', data.a_p, 1, '/');
          this.CS.set('a_m', data.a_m, 1, '/');

          this.router.navigate(['/main']);
        }else{
          alert('Correo o Contraseña incorrecta');
        }
      });
    }
  

}
