import { Injectable } from '@angular/core';
import {FormGroup,FormControl,FormBuilder,FormArray, Validators} from '@angular/forms';
import{AngularFireDatabase,AngularFireList}  from 'angularfire2/database';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

productos:AngularFireList <any>;
imaArray:[]

  constructor(private firebase:AngularFireDatabase, 
              public fb:FormBuilder,
              ) {}
  forma:FormGroup =this.fb.group({
      $key: null,
      accion:[''],
      titulo: ['',Validators.required],
      marca:[''],
      precio: [''],
     // pvp: [''],
      categoria: [''],
      cantidad: [''],
      origen:[],
      caracteristicas:[''],
     // origen:[''],
      //fecha:[''],
      imagenes: this.fb.array([''],[Validators.required])
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
      $key: null,
      accion:[''],
      titulo: ['',Validators.required],
      marca:[''],
      precio: [''],
     // pvp: [''],
      categoria: [''],
      cantidad: [''],
      origen:[],
      caracteristicas:[''],
     // origen:[''],
      //fecha:[''],
      imagenes: this.fb.array(['']),
      // conta: this.fb.array([
      //   this.addconta()
      // ]),
  
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
      //  pvp: producto.pvp,
      categoria: producto.categoria,
      cantidad: producto.cantidad,
      caracteristicas:producto.caracteristicas,
      origen:producto.origen,
      imagenes:producto.imagenes,
      //origen:producto.origen,
      //fecha: producto.fecha,
    })
    console.log(producto)
  }
  updateProducto(producto){
    this.productos.update(producto.$key,
      {
        accion: producto.accion,
        titulo: producto.titulo,
        marca: producto.marca,
        precio: producto.precio,
        // pvp: producto.pvp,
        categoria: producto.categoria,
        cantidad: producto.cantidad,
        caracteristicas:producto.caracteristicas,
        imagenes:producto.imagenes,
        origen:producto.origen,
      })
    }
    deleteProducto($key:string){
       this.productos.remove($key)
      console.log($key)
    }
  
    cargarProducto(producto){
      //llega el producto desde el component a traves del elemento row
      console.log(producto.imagenes) 
      //se carga la data de row al formulario
      this.forma.patchValue(producto)
      //creamos una constante donde observamos que solamente carga el primer valor del array
      const pictures = this.forma.get("imagenes") as FormArray
      console.log(pictures.value)
    //eliminamos la data de la constante
    while (pictures.length) {
      pictures.removeAt(0);
    }
      producto.imagenes.forEach(cadaImagen=>
        pictures.push(new FormControl(cadaImagen)))
        
        this.imaArray= producto.imagenes
        console.log(this.imaArray)
      }

      

}
    

