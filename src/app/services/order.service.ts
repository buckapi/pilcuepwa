import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class Order {
 
  
    neworder: { articulo: any; iva:any,cantidad: number;precioConDescuento:number ,descuentoIndex:number}[] = [];
   
 
}
