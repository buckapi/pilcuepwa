import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { ScriptService } from '@app/services/script.service';
import { Yeoman } from '@app/services/yeoman.service';
import { Router } from '@angular/router';
import { AuthRESTService } from '@app/services/authREST.service';
import { ExistenciaService } from '@app/services/existencia-service.service';
import { DataApiService } from '@app/services/data-api.service';
import { HttpClient } from '@angular/common/http';
import { tap, count, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as $ from 'jquery';
import { Butler } from '@app/services/butler.service';
declare const XM_Popup: any;
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { merge } from 'rxjs';
// import { switchMap } from 'rxjs/operators';
import { switchMap, mergeMap } from 'rxjs/operators';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale'; 
import { States } from '@app/services/states.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  distName: string = '';
  @ViewChild('mainWrapper', { static: true }) mainWrapper!: ElementRef;
  countDev: number = 0;
  currentUser: any;
  clientDetail: { clrepresentante: any }[] = [];
  existencias: any[] = [];
  all: any[] = [];
  existenciasSize: number = 0;
  dists: any;
  allSize: number = 0;
  artSizes: any[][] = [];
  catSizes: any[][] = [];
  cliSizes: any[][] = [];
  sizes: any[][] = [];
  developerMode: boolean = false;
  combinedData: any[] = [];
  totalArticulos: { [distId: string]: number } = {};
  totalCategorias: { [distId: string]: number } = {};
  totalClientes: { [distId: string]: number } = {};
  clientesSize: number = 0;
  ordersSize = 0;
  constructor(
    public states:States,
    public existenciaService: ExistenciaService,
    public router: Router,
    public http: HttpClient,
    public authRESTService: AuthRESTService,
    public script: ScriptService,
    public yeoman: Yeoman,
    public _butler: Butler,
    public dataApiService: DataApiService
  ) {
    this.yeoman.type = localStorage.getItem('type');
    this.countDev = 0;
    // $('#main-wrapper').removeClass(" menu-toggle");
    if (this.yeoman.type === "admin") {
      this.loadDists();
    }
    if (this.yeoman.type === "dist") {
      this.findDist();
    }
    if (this.yeoman.type === "client") {
      this.states.showAddButton=true;
      console.log("entro");
      this.findClient();
    }
    const userStr: any = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(userStr);
    // this.obtenerExistencias();
    if (!this.authRESTService.getCurrentUser()) {
      // this.router.navigate(['/login'])
    }
  }
  config: SwiperOptions = {
    a11y: { enabled: true },
    direction: 'horizontal',
    slidesPerView: 4,
    keyboard: true,
    mousewheel: false,
    scrollbar: false,
    pagination: true,
    spaceBetween: 5,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
  };
  calcularTotales(): void {
    for (const dist of this.dists) {
      this.dataApiService.getArticulos(dist.url)
        .pipe(
          catchError(error => {
            // Manejar el error aquí
            return of([]); // Devolver un observable vacío para suprimir el error
          })
        )
        .subscribe(articulos => {
          this.totalArticulos[dist.id] = articulos.length;
        });

      this.dataApiService.getCategories(dist.url)
        .pipe(
          catchError(error => {
            // Manejar el error aquí
            return of([]); // Devolver un observable vacío para suprimir el error
          })
        )
        .subscribe(categorias => {
          this.totalCategorias[dist.id] = categorias.length;
        });

      this.dataApiService.getClientes(dist.url)
        .pipe(
          catchError(error => {
            // Manejar el error aquí
            return of([]); // Devolver un observable vacío para suprimir el error
          })
        )
        .subscribe(clientes => {
          this.totalClientes[dist.id] = clientes.length;
        });
    }
  }
  
  public goToAddOrder() {
    this.router.navigate(['/addOrder']);
  }
  formatDateRelative(createdAt: string): string {
    const date = new Date(createdAt);
    return formatDistanceToNow(date, { addSuffix: true, locale: es }); // Usa la localización en español
  }
  deleteAllRecords() {
    // Realiza la consulta de orders y luego borra los registros uno por unonn
    this.dataApiService.getAllOrders()
      .pipe(
        switchMap((orders) => {
          // Verifica si `orders` es un array, si no lo es, crea un array vacío
          if (!Array.isArray(orders)) {
            orders = [];
          }
  
          // Mapea los registros de orders a observables de borrado
          const deleteObservables: Observable<void>[] = (orders as any[]).map((order: any) => {
            return this.dataApiService.deleteOrder(order.id);
          });
  
          // Usa merge para ejecutar los observables de borrado en paralelo
          return merge(...deleteObservables);
        })
      )
      .subscribe(() => {
        console.log('Registros borrados exitosamente');
      });
  }
  deleteAllClients() {
    // Realiza la consulta de clientes y luego borra los registros uno por uno
    this.dataApiService.getClients()
      .pipe(
        switchMap((clients) => {
          // Verifica si `clients` es un array, si no lo es, crea un array vacío
          if (!Array.isArray(clients)) {
            clients = [];
          }
  
          // Mapea los registros de clients a observables de borrado
          const deleteObservables: Observable<void>[] = (clients as any[]).map((client: any) => {
            return this.dataApiService.deleteClient(client.id);
          });
  
          // Usa merge para ejecutar los observables de borrado en paralelo
          return merge(...deleteObservables);
        })
      )
      .subscribe(() => {
        console.log('Clientes borrados exitosamente');
      });
  }

  obtenerArticulos(url:any){
    this.dataApiService.getArticulos(url).subscribe(articulos => {
      this.yeoman.existenciasSize = articulos.length;
    });
  }
  setPreviewOrder(i:any){
    this.yeoman.previewOrder=this.yeoman.myOrders[i]
    this.router.navigate(['/mobOrderDetail']);
  }
  findDist() {
    if (this.yeoman.user.user !== undefined) {
      this.dataApiService.getDistBy('d' + localStorage.getItem('userId')).subscribe((res: any) => {
        // console.log("dist: " + JSON.stringify(res));
        this.yeoman.dist = res[0];
        localStorage.setItem('dist', JSON.stringify(res[0]));
        let distString = localStorage.getItem('dist');
        if (distString !== null) {
          let dist = JSON.parse(distString);
          console.log('url: ' + dist.url);
          // this.obtenerExistencias();
         this.obtenerArticulos(dist.url);
          this.dataApiService.getClientes(dist.url).subscribe(response => {
            this.yeoman.clientes = response;
            // console.log('total clientes:' + this.yeoman.clientes.length);
            this.clientesSize = this.yeoman.clientes.length;
            this.getOrdersByDist();
          });
        }
      });
    }
  }


  getOrdersByClient() {
    let clientString = localStorage.getItem('clientCard');
    if (clientString !== null) {
      let client = JSON.parse(clientString);
    this.dataApiService.getOrdersByClient(client.idUser).subscribe(response => {
      const tempOrders = response; this.yeoman.myOrders = tempOrders;
      this.yeoman.myOrders = this.yeoman.myOrders.reverse();

      this.ordersSize = this.yeoman.myOrders.length;
    })
  }
  }
  getOrdersByDist() {
    let distString = localStorage.getItem('dist');

    if (distString !== null) {
      let dist = JSON.parse(distString);
      console.log('id: ' + dist.id);
      this.dataApiService.getOrdersByDist('d' + dist.id).subscribe(response => {
        const tempOrders = response; this.yeoman.myOrders = tempOrders;
        this.yeoman.myOrders = this.yeoman.myOrders.reverse();
        this.ordersSize = this.yeoman.myOrders.length;
        this.findDist2(this.yeoman.idDist);

      })
    }
  }
  obtenerFichaCliente() {
    let clientFichaString = localStorage.getItem('clientFicha');

    if (clientFichaString !== null) {
      let clienteFicha = JSON.parse(clientFichaString);
      this.yeoman.clientFicha = clienteFicha;
      console.log('representante y nombre: ' + clienteFicha.clrepresentante + ' - ' + clienteFicha.clnombre);

    }
  }

  getClientDetail(url: any, cliCodigo: any) {
    this.dataApiService.getCliente(url, cliCodigo).subscribe((res: any) => {
      this.clientDetail = res[0];

      localStorage.setItem('clientFicha', JSON.stringify(res));
      this.obtenerFichaCliente();
    });
  }

  esAdmin(): boolean {
    return this.currentUser && this.currentUser.type === 'admin';
  }
  esClient(): boolean {
    return this.currentUser && this.currentUser.type === 'client';
  }
  esDist(): boolean {
    return this.currentUser && this.currentUser.type === 'dist';
  }
  loadSizes() {
    for (let i = 0; i < this.dists.length; i++) {
      this.totalArt(i).subscribe(count => {
        this.sizes[0][i] = count;
      });
      this.totalCat(i).subscribe(count => {
        this.sizes[1][i] = count;
      });
      this.totalCli(i).subscribe(count => {
        this.sizes[2][i] = count;
      });
    }
  }
  setDeveloperMode() {
    if (this.countDev > 5 && !this.developerMode) {
      this.developerMode = !this.developerMode;
    } else {
      this.countDev++;
    }
  }
  totalArt(i: any): Observable<number> {
    if (this.combinedData && Array.isArray(this.combinedData) && this.combinedData[i] && this.combinedData[i].url) {
      return this.http.get<any[]>(this.combinedData[i].url).pipe(
        tap(response => console.log('Respuesta de la solicitud:', response)),
        map(response => response.length)
      );
    } else {
      // console.error('No se puede obtener el valor de totalArt.');
      return new Observable<number>(); // Retorna un observable vacío en caso de error
    }
  }
  totalCat(i: any): Observable<number> {
    if (this.combinedData && Array.isArray(this.combinedData) && this.combinedData[i] && this.combinedData[i].url) {
      return this.http.get<any[]>(this.combinedData[i].url).pipe(
        tap(response => console.log('Respuesta de la solicitud:', response)),
        map(response => response.length)
      );
    } else {
      // console.error('No se puede obtener el valor de totalCat.');
      return new Observable<number>(); // Retorna un observable vacío en caso de error
    }
  }
  totalCli(i: any): Observable<number> {
    if (this.combinedData && Array.isArray(this.combinedData) && this.combinedData[i] && this.combinedData[i].url) {
      return this.http.get<any[]>(this.combinedData[i].url).pipe(
        tap(response => console.log('Respuesta de la solicitud:', response)),
        map(response => response.length)
      );
    } else {
      // console.error('No se puede obtener el valor de totalCli.');
      return new Observable<number>(); // Retorna un observable vacío en caso de error
    }
  }
  // obtenerExistencias() {
  //   const familia = "%5Bobject+Object%5D";
  //   if(this.yeoman.dist!==undefined){

    
  //   const url = this.yeoman.dist.url;
  //   this.existenciaService.getAllExistencias().subscribe(
  //     (data) => {
  //       this.existencias = data;
  //       this.yeoman.existencias = null;
  //       this.yeoman.existencias = this.existencias;
  //       this.yeoman.existenciasSize = this.existencias.length;
  //     },
  //     (error) => {
  //       console.error('Error al obtener existencias:', error);
  //     }
  //   );
  // }
  // }
  loadDists() {
    this.dataApiService.getAllDists().subscribe(response => {
      this.dists = response;
      this.calcularTotales();
      this.loadSizes();
    });
  }
  setPreview(i: any) {
    this.yeoman.preview = this.yeoman.all[i];
    this.yeoman.previewType = "dist";
    this.yeoman.indexPreviewDist = i;
    this.router.navigate(['c2oDetail']);
  }
  ngOnInit(): void {
  }
  findClient() {
    const idFind = this.authRESTService.getCurrentUser().id;
    if (idFind !== undefined) {
      this.dataApiService.getClientBy(idFind).subscribe((res: any) => {
        localStorage.setItem('clientCard', JSON.stringify(res[0]));
        
        console.log("cliente: " + JSON.stringify(res));

        this.getOrdersByClient();
        let distString = localStorage.getItem('clientCard');
        if (distString !== null) {
          let clientCard = JSON.parse(distString);
          const idClient = clientCard.idUser;
          const idDist = clientCard.ref;
          this.yeoman.idClient = idClient;
          this.yeoman.client = clientCard;
          this.yeoman.clientEmail = clientCard.email;
          this.yeoman.idDist = idDist;
          this.findDist2(clientCard.ref);
        }
      });
    }
  }
  findDist2(ref: any) {
    this.dataApiService.getDistByIdDist(ref).subscribe((res: any) => {
      console.log("dist: " + JSON.stringify(res));
      this.yeoman.dist = res[0];

      if (res[0] !== undefined) {
        
        this.distName = res[0].email;
        const url = this.yeoman.dist.url;
        let distString = localStorage.getItem('clientCard');
        if (distString !== null) {
          let clientCard = JSON.parse(distString);
          const cliCodigo = clientCard.cliCodigo;
          this.getClientDetail(url, clientCard.cliCodigo);
        }
        if (this.yeoman.client !== undefined) {
          let distString = localStorage.getItem('dist');
          if (distString !== null) {
            let dist = JSON.parse(distString);
            const parametros = 'clcodigo=' + this.yeoman.client.cliCodigo;
            const endpoint = 'webapi/articulos/getcatalogo';
            const consultaUrl = dist.url + endpoint + '?' + parametros;
            this.dataApiService.getCatalogo(consultaUrl)
              .subscribe(data => {
                this.yeoman.catalogo = data;
                // console.log(data); 
              });
            this.http.get<any[]>(consultaUrl)
              .subscribe(data => {
                // console.log(data); 
              });
          }
        }
      }
    });
  }
}
