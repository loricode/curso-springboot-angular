import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../modelo/producto';
import { environment } from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url:string = environment.baseUrl
  constructor(private http:HttpClient) { }

 public getProductos(){
   return this.http.get<Producto[]>(this.url+'/producto')
 }

 public agregarProducto(obj:Producto){
   return this.http.post<Producto>(this.url+'/producto', obj);
 }

 public eliminarProducto(id:string){
   return this.http.delete(this.url+`/producto/${id}`)
 }

 public getProducto(id:string){
   return this.http.get<Producto>(this.url+`/producto/${id}`)
 }

 public editarProducto(obj:Producto){
   return this.http.put(this.url+'/producto', obj);

 }

}
