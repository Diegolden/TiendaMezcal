import { ContactoComponent } from './contacto/contacto.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CarritoComponent } from './carrito/carrito.component';
import { ProductosComponent } from './productos/productos.component';
import { ProductoComponent } from './producto/producto.component';
import { InicioComponent } from './inicio/inicio.component';
import { RegistroComponent } from './registro/registro.component';
import { MainComponent } from './main/main.component';
import { TokenGuard } from './guards/token.guard';
import { ComprasComponent } from './compras/compras.component';
import { FavoritosComponent } from './favoritos/favoritos.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'carrito', component: CarritoComponent, canActivate: [TokenGuard] },
    { path: 'productos', component: ProductosComponent },
    { path: 'producto/:id', component: ProductoComponent },
    { path: 'inicio', component: InicioComponent },
    { path: 'favoritos', component: FavoritosComponent},
    { path: 'registro', component: RegistroComponent },
    { path: 'contacto', component: ContactoComponent },
    { path: 'compras', component:ComprasComponent, canActivate: [TokenGuard] },
    { path: 'main', component: MainComponent, canActivate: [TokenGuard] },
    { path: '**', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
