import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlataformaComponent } from './plataforma/plataforma.component';
import { ClientesComponent } from './plataforma/clientes/clientes.component';
import { PedidosComponent } from './plataforma/pedidos/pedidos.component';
import { PedidoComponent } from './plataforma/pedidos/pedido.component';
import { ProductosComponent } from './plataforma/productos/productos.component';
import { ProductoComponent } from './plataforma/productos/producto.component';

import { ProductosService } from './servicios/productos.service';

import {ReactiveFormsModule,FormsModule} from "@angular/forms"
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database'
import { environment } from 'src/environments/environment';



@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    PedidosComponent,
    PedidoComponent,
    PlataformaComponent,
    ProductosComponent,
    ProductoComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule
  ],
  providers: [ProductosService],
  bootstrap: [AppComponent],
  entryComponents:[ProductoComponent]
})
export class AppModule { }
