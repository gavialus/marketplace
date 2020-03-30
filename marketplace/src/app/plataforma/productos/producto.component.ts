import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/servicios/productos.service';
import {FormGroup,FormControl,Validators,FormArray,FormBuilder,NgForm} from "@angular/forms";


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styles: []
})
export class ProductoComponent implements OnInit {

  constructor(public proService:ProductosService,
              private fb:FormBuilder) {
   this.proService.initializeFormGroup()
   console.log(proService.forma)


   }

  ngOnInit() {
    this.proService.getProductos()
  }
  
  get imagens(){
    return this.proService.forma.get('imagenes') as FormArray
  }

  onClear(){
    this.proService.forma.reset();
    this.proService.initializeFormGroup()
  }
  
  onSubmit(){
    if(this.proService.forma.valid){
      console.log(this.proService.forma)

      //this.proService.insertProducto(this.proService.forma.value);
      // this.proService.forma.reset();
      // this.proService.initializeFormGroup()
    }
  }


  agregarImagen() {
    // (<FormArray>this.proService.forma.controls["imagenes"]).push(new FormControl(""));
    this.imagens.push(this.fb.control(''))
    
  }
  borrarImagen(i: number) {
    (<FormArray>this.proService.forma.controls["imagenes"]).removeAt(i);
  }

}
