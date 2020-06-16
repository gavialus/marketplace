import { Injectable } from '@angular/core';
import {FormGroup,FormControl,FormBuilder,FormArray, Validators} from '@angular/forms';
import{AngularFireDatabase,AngularFireList}  from 'angularfire2/database';

import * as Filesaver from "file-saver";
import * as XLSX from "xlsx";

const EXCEL_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const EXCEL_EXT = ".xlsx";


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
      'Action(SiteID=Spain|Country=ES|Currency=EUR|Version=745)': ['add'],
      ItemID:[''],
      CustomLabel: [''],
      Category:['',Validators.required],
      StoreCategory:[''],
      Title:['',Validators.required],
      ConditionID:['1000',Validators.required],
      Marca:['',Validators.required],
      MPN:['No aplicable',Validators.required],
      Product:['No aplicable',Validators.required],
      EAN:[''],
      PicURL:this.fb.array([''],[Validators.required]),
      Description:['',Validators.required],
      Format:['Fixed Price',Validators.required],
      Duration:['GTC',Validators.required],
      StartPrice:['',Validators.required],
      Quantity:['',Validators.required],
      Location:['33865',Validators.required],
      ShippingProfileName:['Fija:Correos: carta(Gratis),3 días laborables',Validators.required],
      ReturnProfileName:['Devoluciones aceptadas,Comprador,14 días#0',Validators.required],
      PaymentProfileName:['PayPal:Pago inmediato',Validators.required],
      Relationship:[''],
      RelationshipDetails:['']
   });
   initializeFormGroup(){
     this.forma= this.fb.group({
      $key: null,
      'Action(SiteID=Spain|Country=ES|Currency=EUR|Version=745)': 'add',
      ItemID:'',
      CustomLabel: '',
      Category:'',
      StoreCategory:'',
      Title:['',Validators.required],
      ConditionID:'1000',
      Marca:'',
      MPN:'No aplicable',
      Product:'No aplicable',
      EAN:'',
      PicURL: this.fb.array(['']),
      Description:'',
      Format:'Fixed Price',
      Duration:'GTC',
      StartPrice:'',
      Quantity:'',
      Location: '33865',
      ShippingProfileName:'Fija:Correos: carta(Gratis),3 días laborables',
      ReturnProfileName: 'Devoluciones aceptadas,Comprador,14 días#0',
      PaymentProfileName:'PayPal:Pago inmediato',
      Relationship:'',
      RelationshipDetails:''
    })
  }

  getProductos(){
    this.productos = this.firebase.list('inventario')
    return this.productos.snapshotChanges()
  }
  
  insertProducto(producto){
    this.productos.push({
      'Action(SiteID=Spain|Country=ES|Currency=EUR|Version=745)': 'add',
      ItemID:producto.ItemID,
      CustomLabel:producto.CustomLabel,
      Category:producto.Category,
      StoreCategory:producto.StoreCategory,
      Title: producto.Title,
      ConditionID:producto.ConditionID,
      Marca:producto.Marca,
      MPN:producto.MPN,
      Product:producto.Product,
      EAN:producto.EAN,
      PicURL:producto.PicURL,
      Description:producto.Description,
      Format:producto.Format,
      Duration:producto.Duration,
      StartPrice:producto.StartPrice,
      Quantity:producto.Quantity,
      Location: producto.Location,
      ShippingProfileName:producto.ShippingProfileName,
      ReturnProfileName: producto.ReturnProfileName,
      PaymentProfileName:producto.PaymentProfileName,
      Relationship:producto.Relationship,
      RelationshipDetails:producto.Relationship
    })
    console.log(producto)
  }
  updateProducto(producto){
    this.productos.update(producto.$key,
      {
        'Action(SiteID=Spain|Country=ES|Currency=EUR|Version=745)': 'add',
        ItemID:'',
        CustomLabel: '',
        Category:producto.Category,
        StoreCategory:'',
        Title: producto.Title,
        ConditionID:'nuevo',
        Marca:producto.Marca,
        MPN:'',
        Product:'',
        EAN:'',
        PicURL:producto.PicURL,
        Description:producto.Description,
        Format:'',
        Duration:'',
        StartPrice:'',
        Quantity:producto.Quantity,
        Location: '',
        ShippingProfileName:'',
        ReturnProfileName: '',
        PaymentProfileName:'',
        Relationship:'',
        RelationshipDetails:''
      })
    }
    deleteProducto($key:string){
       this.productos.remove($key)
      console.log($key)
    }
  
    cargarProducto(producto){
      //llega el producto desde el component a traves del elemento row
      console.log(producto.PicURL) 
      //se carga la data de row al formulario
      this.forma.patchValue(producto)
      //creamos una constante donde observamos que solamente carga el primer valor del array
      const pictures = this.forma.get("PicURL") as FormArray
      console.log(pictures.value)
    //eliminamos la data de la constante
    while (pictures.length) {
      pictures.removeAt(0);
    }
      producto.PicURL.forEach(cadaImagen=>
        //console.log(cadaImagen)
        pictures.push(new FormControl(cadaImagen))
        )
        
        this.imaArray= producto.PicURL
        console.log(this.imaArray)
      }



 // FILE SAVER EXCEL
 exportToExcel(json: any[], excelFileName: string) {
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
  const workbook: XLSX.WorkBook = {
    Sheets: { data: worksheet },
    SheetNames: ["data"]
  };
  const excelBuffer: any = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array"
  });
  //llamar al método buffer y filename
  this.saveAsExcel(excelBuffer, excelFileName);
}

private saveAsExcel(buffer: any, filename: string) {
  const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
  Filesaver.saveAs(data, filename) +
    "_export" +
    new Date().getTime() +
    EXCEL_EXT;
}
      

}
    

