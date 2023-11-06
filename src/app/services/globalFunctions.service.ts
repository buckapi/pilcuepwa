import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders }  from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Butler } from "@services/butler.service";
import { Yeoman } from './yeoman.service';
import { DataApiService } from './data-api.service';
import { CLIENTS } from './clients.service';
import { AuthRESTService } from '@services/authREST.service';
@Injectable({
    providedIn: 'root'
  })
  export class GlobalFunctions {
  clients:any;
    constructor(
        public butler:Butler,
        public yeoman:Yeoman,
        public dataApiService:DataApiService
    ) { this.clients=CLIENTS }

    setClient(i:any){
        this.yeoman.origin.restUrl=this.clients[i].RestUrl; //el mayordomo es informado de la nueva url REST 
        this.dataApiService.getAllProducts().subscribe(response => {
          this.yeoman.products=response;
          this.yeoman.products.reverse();
          this.yeoman.config.clientSelected=i;
          this.butler.virtualRoute="overview";
        });
    }
   
  }