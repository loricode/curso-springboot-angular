import { Component, OnInit } from '@angular/core';
import { Producto } from '../modelo/producto';
import { ProductoService } from '../servicio/producto.service'
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  productos:Producto[] = []; 
  id=''
  productoForm = new FormGroup({
    nombre: new FormControl(''),
    precio: new FormControl('')
  })

  constructor(private servicio:ProductoService) { }

  ngOnInit(): void {
    this.getProductos();
  }
 
  private getProductos():void{
    this.servicio.getProductos().subscribe(res =>{
        this.productos = res
    }, error=>{
       console.log(error)
    })
  }

  public agregarProducto():void{
    this.servicio.agregarProducto(this.productoForm.value)
    .subscribe(res => {
       this.productos.push(res)
       this.productoForm.reset('')
    }, error => {
      console.log(error)
    })
  }

  public eliminarProducto(id:string):void {
    if(window.confirm("seguro que quiere eliminar")){
      this.servicio.eliminarProducto(id).subscribe(() => {
        this.getProductos()
     }, error => {
       console.log(error)
     } )
    }
    
  } 

public getProducto(id:string){
 this.servicio.getProducto(id).subscribe(res =>{
   const {id, nombre, precio } = res 
    this.id = id
    this.productoForm.setValue({nombre, precio})
    
 }, error =>{
   console.log(error)
 })
}

public editarProducto(){
  let obj =  this.productoForm.value
  obj.id = this.id
  this.servicio.editarProducto(obj).subscribe(() => {
      this.getProductos()
      this.productoForm.reset('')
  }, error =>{
    console.log(error)
  })
}

}
