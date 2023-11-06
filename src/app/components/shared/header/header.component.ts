import { Component, OnInit } from '@angular/core';
import { Butler } from '@app/services/butler.service';
import { CLIENTS } from '@app/services/clients.service';
import { Yeoman } from '@app/services/yeoman.service';
import { DataApiService } from '@app/services/data-api.service';
import { GlobalFunctions } from '@app/services/globalFunctions.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
clients:any;
  constructor( public yeoman:Yeoman,  public dataApiService : DataApiService, public _butler:Butler,public globalFunctions:GlobalFunctions) { 
 this.clients=CLIENTS
  }
  setRoute(route:any){
    this._butler.virtualRoute=route;
  }
  setClient(i:any){
    //llama a la funcion setClient del servicio GlobalFunctions
    this.globalFunctions.setClient(i);
    };
     
  ngOnInit(): void {
  }

}
