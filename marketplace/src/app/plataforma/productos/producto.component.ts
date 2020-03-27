import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/servicios/productos.service';
import {FormGroup,FormControl,Validators,FormArray,FormBuilder,NgForm} from "@angular/forms";


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styles: []
})
export class ProductoComponent implements OnInit {

  constructor(public proService:ProductosService) {

   }

  ngOnInit() {
    this.proService.getProductos()
  }

  imagenes =[]

  onClear(){
    this.proService.forma.reset();
    this.proService.initializeFormGroup()
  }
  
  onSubmit(){
    if(this.proService.forma.valid){
      this.proService.insertProducto(this.proService.forma.value);
      this.proService.forma.reset();
      this.proService.initializeFormGroup()
    }
  }

  imagens(){
    return this.proService.forma.get(this.imagenes) as FormArray
  }
  agregarImagen() {
    (<FormArray>this.proService.forma.controls["imagenes"]).push(new FormControl(""));
  }
  borrarImagen(i: number) {
    (<FormArray>this.proService.forma.controls["imagenes"]).removeAt(i);
  }

}
