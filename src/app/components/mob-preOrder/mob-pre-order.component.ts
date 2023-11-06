import { Component, OnInit, Renderer2, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRESTService } from '@app/services/authREST.service';
import { DataApiService } from '@app/services/data-api.service';
import { Order } from '@app/services/order.service';
import { Yeoman } from '@services/yeoman.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-mob-pre-order',
  templateUrl: './mob-pre-order.component.html',
  styleUrls: ['./mob-pre-order.component.css']
})
export class MobPreOrderComponent implements OnInit {
  order: any = { idClient: '', idDist: '', order: [], total: '', totalArticulos: '' };
  calling = true;
  constructor(
    public authRESTService: AuthRESTService,
    public router: Router,
    public renderer: Renderer2,
    public dataApiService: DataApiService,
    public yeoman: Yeoman, 
    public orderIn:Order,
    public cdr: ChangeDetectorRef
  ) {
   
    this.yeoman.neworder=this.orderIn.neworder;
    if(this.yeoman.neworder.length<1){this.router.navigate(['mobAddOrder']); }
    // if (this.yeoman.neworder.length < 1) { 
    //   //  this.router.navigate(['mobAddOrder']); 
    // };
    this.checkUser();
    this.calculateTotal();
  }
  checkUser() {

    const idFind = this.authRESTService.getCurrentUser().id;
    if (idFind !== undefined) {
      this.dataApiService.getClientBy(idFind).subscribe((res: any) => {
        console.log("cliente: " + JSON.stringify(res));
        const idClient = res[0].idUser;
        const idDist = res[0].idDist;
        this.setIdClient(idClient, idDist);
      });
    }
  }
  setIdClient(idClient: any, idDist: any) {
    this.yeoman.idClient = idClient;
    this.yeoman.idDist = idDist;
    console.log("id client y dist respectivamente: " + this.yeoman.idClient + " " + this.yeoman.idDist);
  }
  calculateTotal() {
    if (this.yeoman.neworder.length < 1) {
      //  this.router.navigate(['mobAddOrder']);
      return; // Salir de la función si no hay productos en la orden
    }
    this.yeoman.totalOrder = 0;
    this.yeoman.totalDescuento = 0;
    this.yeoman.totalIVA = 0; // Inicializar el total de IVA
    for (let i = 0; i < this.yeoman.neworder.length; i++) {
      const item = this.yeoman.neworder[i];
      if (item.precioConDescuento !== undefined && item.precioConDescuento !== 0) {
        const subtotal = item.precioConDescuento * item.cantidad;
        this.yeoman.totalOrder += subtotal;
        const descuento = (item.articulo.arprecio - item.precioConDescuento) * item.cantidad;
        this.yeoman.totalDescuento += descuento;
        const iva = (item.articulo.ariva / 100) * subtotal;
        this.yeoman.totalIVA += iva;
      } else if (item.articulo.arprecio !== undefined) {
        const subtotal = item.articulo.arprecio * item.cantidad;
        this.yeoman.totalOrder += subtotal;
        const iva = (item.articulo.ariva / 100) * subtotal;
        this.yeoman.totalIVA += iva;
      }
    }
  }
  removeIVA(i: any) {
    this.yeoman.totalIVA = this.yeoman.totalIVA - (((this.yeoman.neworder[i].articulo.ariva / 100) * this.yeoman.neworder[i].articulo.arprecio) * (this.yeoman.neworder[i].cantidad));
    this.calculateTotal();
  }

  
  procesar() {
    this.order.idClient = this.yeoman.idClient;
    this.order.idDist = this.yeoman.idDist;
    this.order.order = this.yeoman.neworder;
    this.order.status = 'nueva';
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    const randomDigits = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    this.order.ref = randomLetter + randomDigits;
    this.order.clientEmail = this.yeoman.clientEmail;
    this.order.totalIVA= this.yeoman.totalIVA;
    this.order.totalDescuento= this.yeoman. totalDescuento;
    this.order.total = this.yeoman.totalOrder;
    this.order.totalArticulos = this.yeoman.neworder.length - 1;
    this.dataApiService.saveOrder(this.order).subscribe(response => {
      console.log(response);
      this.yeoman.neworder = [];
      this.yeoman.catalogoCargado = false;
      this.yeoman.totalIVA=0;
      this.yeoman.totalOrder = 0;
      this.yeoman.orderSize = 0;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Orden enviada',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(['']);
    }
    );
  }
  outOfNewOrder(i: any) {
    this.yeoman.neworder.splice(i, 1);
  if(this.yeoman.neworder.length<2){ ;};
    this.calculateTotal();
  }
  plus(i: any) {
    const item = this.yeoman.neworder[i];
    if (item) {
      item.cantidad++;
      this.applyDiscount(item);
       this.calculateTotal();
    }
  }
  minus(i: any) {
    const item = this.yeoman.neworder[i];
    if (item && item.cantidad > 1) {
      item.cantidad--;
      this.applyDiscount(item);
      // Restar el monto por IVA del producto que se eliminó
      const ivaToRemove = (item.articulo.ariva / 100) * (item.articulo.arprecio * item.cantidad);
      this.yeoman.totalIVA -= ivaToRemove;
      this.calculateTotal();
    }
  }
  applyDiscount(item: any) {  
    const cantidad = item.cantidad;
    if (item.articulo.descuento) {
      let descuentoIndex = -1;
      // Encontrar el índice del descuento aplicado
      for (let i = 0; i < item.articulo.descuento.length; i++) {
        if ((cantidad >= item.articulo.descuento[i]) && (item.articulo.descuento[i] !==0)) {
          descuentoIndex = i;
        } else {
          break;
        }
      }  this.order.totalIVA= this.yeoman.totalIVA;
      if (descuentoIndex >= 0) {
        // Calcular el porcentaje de descuento y actualizar el precio con descuento
        const descuentoPorcentaje = item.articulo.descuentoPorcentaje[descuentoIndex];
        item.precioConDescuento = item.articulo.arprecio * (1 - descuentoPorcentaje / 100);
      } else {
        // No hay descuento, mantener el precio original
        item.precioConDescuento = item.articulo.arprecio;
      }
  
      item.articulo.descuentoIndex = descuentoIndex;
    } else {
      // No hay descuento, mantener el precio original
      item.precioConDescuento = item.articulo.arprecio;
      item.descuentoIndex = -1;
    }
    const indice = item.index;
    console.log("ITEMEMEME:" + JSON.stringify(item));
    // Actualizar la orden y recalcular el total
    let order = this.yeoman.neworder;
    this.yeoman.neworder = [];
    this.yeoman.neworder = order;
    // this.cdr.detectChanges();
    this.calculateTotal();
  }
  ngOnInit(): void {
  }

}
