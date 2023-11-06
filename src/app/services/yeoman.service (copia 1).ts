import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Yeoman {
  view:any='grid';
  preview:any={};
  user:any;
  all:any=[];
  existencias:any=[];
  existenciasSize:number=0;
    virtualRoute:any="dashboard";
    pop:Boolean=false;
    apiConnected:Boolean=false;
    data:any={};
    products:any={};
    // products:any[]=[];
    currency:number=1;
    config: {
      clientSelected:number;
    } = {clientSelected:-1} ;
    origin: {
      name: string;
      restUrl: string;
      GQLUrl: string;
    } = {
      name: "default",
      restUrl: "https://db.buckapi.us:7777",
      GQLUrl: "<origin GQL url>",
    };
    constructor() {}
}