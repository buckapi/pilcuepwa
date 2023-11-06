import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class Yeoman {
  imagesUrl="https://www.click2order.app/img-API/server/local-storage/tixsImages/"
  loadingAdd:boolean=true;
  viewer = 'new';
  distName="";
  totalDescuento:any=0;
  totalIVA:any=0;
  viewSelected:boolean=true;
  apiConnected:Boolean=false;
  view:any='grid';
  preview:any={};
  idClient:any;
  notifications:any[][]=[];
  myOrders:any;
  idDist:any;
  dist:any;
  user:any;
  client:any;
  clientEmail:any;
  cliSelected:any={"name":""};
  all:any=[];
  previewArticulo:any={"arnombre":""};
  clientFicha:any={"clrepresentante":""};
   catalogo:any[]=[];
  // catalogo: Articulo[][] = [];
  ordersNew:any[]=[];
  descuentos:any[]=[];
  categories:any[]=[];
  ordersProcessing:any[]=[];
  ordersFinished:any[]=[];
  articulos:any[][]=[];
totalOrder:any=0;
  orderSize=0;
  
  neworder: { articulo: any; iva:any,cantidad: number;precioConDescuento:number ,descuentoIndex:number}[] = [];
 
  // previewOrder: { articulo: any; order:any; cantidad: number ;clientEmail:any }[] = [];
  previewOrder: any;

  // articulos: Articulo[][] = [];
  clientes:any;
  clients:any;
  existencias:any=[];
  existenciasSize:number=0;
  previewType:any='';
    virtualRoute:any="dashboard";
    pop:Boolean=false;

    indexPreviewDist:number=0;
    indexPreviewCli:number=0;
    data:any={};
    type:any;
    catalogoCargado:boolean=false;
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
      restUrl: "https://db.click2order.app:7777",
      GQLUrl: "<origin GQL url>",
    };
    constructor() {}
    reset(): void {
      this.preview = {};
      this.idClient = null;
      this.notifications = [];
      this.myOrders = null;
      this.idDist = null;
      this.dist = null;
      this.user = null;
      this.client = null;
      this.clientEmail = null;
      this.cliSelected = { "name": "" };
      this.all = [];
      this.previewArticulo = { "arnombre": "" };
      this.clientFicha = { "clrepresentante": "" };
      this.catalogo = [];
      this.totalOrder = 0;
      this.orderSize = 0;
      this.neworder = [];
      this.previewOrder = null;
      this.clientes = null;
      this.clients = null;
      this.existencias = [];
      this.existenciasSize = 0;
      this.previewType = '';
      this.virtualRoute = "dashboard";
      this.pop = false;
      this.indexPreviewDist = 0;
      this.indexPreviewCli = 0;
      this.data = {};
      this.type = null;
      this.products = {};
      this.currency = 1;
      this.config.clientSelected = -1;
      this.origin = {
        name: "default",
        restUrl: "https://db.click2order.app:7777",
        GQLUrl: "<origin GQL url>",
      };
    }
}
// interface Articulo {
//   articulo:any;
//   arnombre: string; // Puedes ajustar el tipo según tus necesidades
//   cantidad: number;
// }