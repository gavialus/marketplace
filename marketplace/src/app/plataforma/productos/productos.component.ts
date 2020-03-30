import { Component, OnInit,ViewChild } from '@angular/core';
import { ProductosService } from 'src/app/servicios/productos.service';
import {MatTableDataSource,MatSort,MatPaginator} from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ProductoComponent } from './producto.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styles: []
})
export class ProductosComponent implements OnInit {

  constructor(public prodServ:ProductosService,
              public dialog:MatDialog) { }

  listaProductos:MatTableDataSource<any>;
  displayedColums: string[]= ['Titulo','Caracteristicas','Marca','Precio','Categoria','Imagenes', 'accions' ];
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
    this.prodServ.getProductos()
                .subscribe(list=>{
                  let array=list.map(item=>{
                    return{
                      $id: item.key,
                      ...item.payload.val()
                    }
                  })
                  this.listaProductos= new MatTableDataSource(array)
                  this.listaProductos.sort = this.sort;
                  this.listaProductos.paginator = this.paginator;
                })
  }
  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }
  applyFilter() {
    this.listaProductos.filter = this.searchKey.trim().toLowerCase();
  }
  onCreate() {
    // this.prodServ.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '100%';
    dialogConfig.height = '100%';
    this.dialog.open(ProductoComponent, dialogConfig);
  }
  onEdit(row){
    this.prodServ.cargarProducto(row)

  }

}
