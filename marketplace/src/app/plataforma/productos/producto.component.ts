import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/servicios/productos.service';
import {FormGroup,FormControl,Validators,FormArray,FormBuilder,NgForm} from "@angular/forms";
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';
import { MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styles: []
})
export class ProductoComponent implements OnInit {

  constructor(public proService:ProductosService,
              private fb:FormBuilder,
              private notiSer:NotificacionesService,
              public dialogRef:MatDialogRef<ProductoComponent>) {
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
    this.proService.imaArray = []
  }
  
  onSubmit(){
    if(this.proService.forma.valid){
      if(!this.proService.forma.get('$key').value)
       this.proService.insertProducto(this.proService.forma.value);
      else
      this.proService.updateProducto(this.proService.forma.value)
      this.proService.forma.reset();
      this.proService.initializeFormGroup()
      this.notiSer.success('Enviado correctamente')
    }
  }
  onClose(){
    // this.proService.forma.reset();
    // this.proService.initializeFormGroup()
    this.dialogRef.close();
  }
  agregarImagen() {
    // (<FormArray>this.proService.forma.controls["imagenes"]).push(new FormControl(""));
    this.imagens.push(this.fb.control(''))  
  }
  borrarImagen(i: number) {
    (<FormArray>this.proService.forma.controls["imagenes"]).removeAt(i);
  }
}
