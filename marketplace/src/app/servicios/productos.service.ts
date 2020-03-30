import { Injectable } from '@angular/core';
import {FormGroup,FormControl,FormBuilder, Validators} from '@angular/forms';
import{AngularFireDatabase,AngularFireList}  from 'angularfire2/database'

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

productos:AngularFireList <any>;

  constructor(private firebase:AngularFireDatabase, 
              public fb:FormBuilder) {}
  forma:FormGroup =this.fb.group({
      $id: [null,],
      accion:[''],
      titulo: [''],
      marca:[''],
      precio: [''],
      pvp: [''],
      categoria: [''],
      caracteristicas:[''],
      origen:[''],
      fecha:[''],
      imagenes: this.fb.array(['']),
      // conta: this.fb.array([
      //   this.addconta()
      // ]),
      // tallas: this.fb.array([
      //     this.crearTalla()
      //   ])  
      // })
   });
   initializeFormGroup(){
     this.forma= this.fb.group({
      $id: '',
      accion: '',
      titulo: '',
      marca: '',
      precio: '',
      pvp:'',
      categoria: '',
      caracteristicas:'',
      origen:'',
      fecha:'',
      imagenes: this.fb.array(['']),
     })
   }
  
  getProductos(){
    this.productos = this.firebase.list('inventario')
    return this.productos.snapshotChanges()
  }
  insertProducto(producto){
    this.productos.push({
      accion: producto.accion,
      titulo: producto.titulo,
      marca: producto.marca,
      precio: producto.precio,
      pvp: producto.pvp,
      categoria: producto.categoria,
      caracteristicas:producto.caracteristicas,
      imagenes:producto.imagenes,
      origen:producto.origen,
      fecha: producto.fecha,
    })
  }
  updateProducto(producto){
    this.productos.update(producto.$id,
      {
        accion: producto.accion,
        titulo: producto.titulo,
        marca: producto.marca,
        precio: producto.precio,
        pvp: producto.pvp,
        categoria: producto.categoria,
        caracteristicas:producto.caracteristicas,
        imagenes:producto.imagenes,
        origen:producto.origen,
        fecha: producto.fecha,
      })
  }
  deleteProducto($id:string){
    this.productos.remove($id)
  }

  cargarProducto(produco){
    
  }

}