import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

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
      nombre: ['',[Validators.required]],
      a_p: ['',[Validators.required]],
      a_m: ['',[Validators.required]],
      usuario: ['',[Validators.required]],
      correo: ['',[Validators.required]],
      password: ['',[Validators.required, Validators.minLength(8)]]
    });
  
    constructor(private fb: FormBuilder, private CS: CookieService, private router: Router, private AS: AuthService){ }
  
    ngOnInit(): void {
  
      this.miFormulario.setValue({
        nombre: '',
        a_p: '',
        a_m: '',
        usuario: '',
        correo: '',
        password: '',
      });
    }
  
    campoValido(campo: string){
      return this.miFormulario.controls[campo].errors 
            && this.miFormulario.controls[campo].touched;
  
    }
  
    save(){
      console.log(this.miFormulario.value);
      this.AS.verificarCorreo(this.miFormulario.value).subscribe((data: any) =>{
        console.log(data);
        if(!data){
          this.AS.registro(this.miFormulario.value).subscribe((data: any) =>{
            console.log(data);
              this.router.navigate(['/login']);
          });
        }else{
          alert('Correo ya existente');
        }
      });
    }
  }