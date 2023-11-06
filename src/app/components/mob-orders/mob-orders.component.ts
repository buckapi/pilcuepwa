import { ChangeDetectorRef, Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { DataApiService } from '@app/services/data-api.service';
import { Yeoman } from '@app/services/yeoman.service';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-mob-orders',
  templateUrl: './mob-orders.component.html',
  styleUrls: ['./mob-orders.component.css']
})
export class MobOrdersComponent implements OnInit {
  visibles = false;
  
  constructor(
    public yeoman: Yeoman,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    public router: Router,
    public dataApiService: DataApiService
  ) {
    this.yeoman.viewer='new';
    this.yeoman.type = localStorage.getItem('type');
    if (this.yeoman.type == 'dist') {
      this.getOrdersByDist();
    }
    if (this.yeoman.type == 'client') {
      this.getOrdersByClient();
    }
  }
  ngOnInit(): void {
  }
  formatDateRelative(createdAt: string): string {
    const date = new Date(createdAt);
    return formatDistanceToNow(date, { addSuffix: true, locale: es }); // Usa la localización en español
  }
  getOrdersByClient() {
    let clientString = localStorage.getItem('clientCard');
    if (clientString !== null) {
      let clientCard = JSON.parse(clientString);
      this.dataApiService.getOrdersByClient(clientCard.idUser).subscribe(response => {
        this.yeoman.myOrders = response;
        this.yeoman.myOrders = this.yeoman.myOrders.reverse();
        this.classifyOrders();
      })
    }
  }
  changeStatusRQ(i: any) {
    this.visibles = true;

  }
  setProcesandoFromNew(i: any) {
    let order = this.yeoman.ordersNew[i];
    let orderID = order.id;

    console.log("order Id a procesar: " + orderID);
    order.status = 'procesando';
    this.dataApiService.orderUpdate(order, order.id).subscribe(response => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Estado de la orden actualizado a EN PROCESO',
        showConfirmButton: false,
        timer: 1500
      })

      this.visibles = false;
      this.getOrdersByDist();
    });
  }
  setTerminadaFromNew(i: any) {
    let order = this.yeoman.ordersNew[i];
    let orderID = order.id;
    console.log("order Id a terminar: " + orderID);
    order.status = 'terminada';
    this.dataApiService.orderUpdate(order, order.id).subscribe(response => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Estado de la orden actualizado a TERMINADA',
        showConfirmButton: false,
        timer: 1500
      })
      this.visibles = false;
      this.getOrdersByDist()
    });
    // Manejar la respuesta si es necesario

  }
  setTerminadaFromProcessing(i: any) {
    let order = this.yeoman.ordersProcessing[i];
    let orderID = order.id;
    console.log("order Id a terminar: " + orderID);
    order.status = 'terminada';
    this.dataApiService.orderUpdate(order, order.id).subscribe(response => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Estado de la orden actualizado a TERMINADA',
        showConfirmButton: false,
        timer: 1500
      })
      this.visibles = false;
      this.getOrdersByDist()
    });
    // Manejar la respuesta si es necesario

  }
  setPreviewNew(i: any) {
    this.yeoman.previewOrder ={};
    this.yeoman.previewOrder = this.yeoman.ordersNew[i]
    this.router.navigate(['/mobOrderDetail']);
  }
  setPreviewPro(i: any) {
    this.yeoman.previewOrder ={};
    this.yeoman.previewOrder = this.yeoman.ordersProcessing[i]
    this.router.navigate(['/mobOrderDetail']);
  }
  setPreviewFin(i: any) {
    this.yeoman.previewOrder ={};
    this.yeoman.previewOrder = this.yeoman.ordersFinished[i]
    this.router.navigate(['/mobOrderDetail']);
  }
  getOrdersByDist() {
    this.yeoman.myOrders = [];

    let distString = localStorage.getItem('dist');
    if (distString !== null) {
      let dist = JSON.parse(distString);
      console.log('url: ' + dist.url);

      this.dataApiService.getOrdersByDist('d' + dist.id).subscribe(response => {
        this.yeoman.myOrders = response;
        this.yeoman.myOrders = this.yeoman.myOrders.reverse();
        this.classifyOrders();
      })
    }

  }
  setViewer(view:any){
    this.yeoman.viewer=view;
  }
  classifyOrders() {
    // Inicializa los arrays para cada estado
    this.yeoman.ordersNew = [];
    this.yeoman.ordersProcessing = [];
    this.yeoman.ordersFinished = [];

    // Recorre el array this.this.yeoman.myOrders
    for (const order of this.yeoman.myOrders) {
      // Clasifica los pedidos según su estado
      if (order.status === 'nueva') {
        this.yeoman.ordersNew.push(order);
      } else if (order.status === 'procesando') {
        this.yeoman.ordersProcessing.push(order);
      } else if (order.status === 'terminada') {
        this.yeoman.ordersFinished.push(order);
      }
    }
  }
}
