import { Component, OnInit,Renderer2,ViewChild ,ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { DataApiService } from '@app/services/data-api.service';
import { Yeoman } from '@app/services/yeoman.service';
import * as $ from 'jquery';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale'; 
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  @ViewChild('mainWrapper', { static: true }) mainWrapper!: ElementRef;
  constructor(
    public yeoman:Yeoman,
    private renderer: Renderer2,
    public router:Router,
    public dataApiService:DataApiService
  ) {
    // this.getOrdersByClient();
    $('#main-wrapper').removeClass(" menu-toggle");
    if (this.yeoman.type=='dist'){
      this.getOrdersByDist();
    }
    if (this.yeoman.type=='client'){
      this.getOrdersByClient();
    }
   }
  //  formatDateRelative(date: Date): string {
  //   return formatDistanceToNow(date, { addSuffix: true });
  // }
  formatDateRelative(createdAt: string): string {
    const date = new Date(createdAt);
    return formatDistanceToNow(date, { addSuffix: true, locale: es }); // Usa la localización en español
  }
  ngOnInit(): void {
  }
  getOrdersByClient(){
    this.dataApiService.getOrdersByClient(this.yeoman.idClient).subscribe(response=>{
      this.yeoman.myOrders = response;
      this.yeoman.myOrders = this.yeoman.myOrders.reverse();
    })
  }
setPreview(i:any){
  this.yeoman.previewOrder=this.yeoman.myOrders[i]
  this.router.navigate(['/orderDetail']);
}
  getOrdersByDist(){

      let distString = localStorage.getItem('dist');
        if (distString !== null) {
          let dist = JSON.parse(distString);
          console.log('url: ' + dist.url);

    this.dataApiService.getOrdersByDist('d'+dist.id).subscribe(response=>{
      this.yeoman.myOrders = response;
      this.yeoman.myOrders = this.yeoman.myOrders.reverse();
    })
  }
  
  }

}
