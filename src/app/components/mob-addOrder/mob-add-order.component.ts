import { Component,  AfterViewInit, ViewChild,  Input, Output, EventEmitter, ElementRef,  ChangeDetectorRef, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Yeoman } from '@services/yeoman.service';
import { HttpClient } from '@angular/common/http';
import { Butler } from '@app/services/butler.service';
import { DataApiService } from '@app/services/data-api.service';
import { SwiperOptions } from 'swiper';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { AuthRESTService } from '@app/services/authREST.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Order } from '@app/services/order.service';
@Component({
  selector: 'app-mob-add-order',
  templateUrl: './mob-add-order.component.html',
  styleUrls: ['./mob-add-order.component.css']
})
export class MobAddOrderComponent implements AfterViewInit, OnInit {

  @Input() delay = 2000;
  @Output() ngModelChangeDebounced = new EventEmitter();
  @ViewChild('cantidadInput', { static: false }) cantidadInput: ElementRef | undefined;
  viewSelected: boolean = true;
  isLoading: boolean = false;
  combinedData: any[] = [];
  articulos: any = [];
  catalogo: any = [];
  categorias: any[] = [];
  clientes: any[] = [];
  clients: any = [];
  dists: any;
  sizes: any = [[], [], []];
  totalArticulos: { [distId: string]: number } = {};
  totalCategorias: { [distId: string]: number } = {};
  totalClientes: { [distId: string]: number } = {};
  p: number = 1;
  page: number = 1;
  count: number = 0;
  itemsPP: number = 1000;
  options: number[] = [200, 500, 1000];
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];
  p2: number = 1;
  page2: number = 1;
  count2: number = 0;
  itemsPP2: number = 10;
  options2: number[] = [10, 50, 100];
  tableSize2: number = 7;
  tableSizes2: any = [3, 6, 9, 12];
  artSelected: boolean = false;
  cliSelected: boolean = false;
  selected: any = {
    arnombre: '',
    arprecio: 0,
    arcodigo: 0
  };
  config: SwiperOptions = {
    a11y: { enabled: true },
    direction: 'horizontal',
    slidesPerView: 3,
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
  showDiscount=false;
  showISelecte=0;
  envioAutomaticoTimeout: any;
  showTooltip = false;
  tableData = [['a', 'a', 'a'], ['a', 'a', 'a']];
  selectedRow: number | null = null;
  indiceMostrado = 0;
  neworder: { articulo: any; cantidad: number; }[] = [];
  valorInput: string = '';
  totalOrder: number = 0;
  mostrarTabla = false;
  articulo = {
    descuentoPorcentaje: [10, 15, 20]
  };
  constructor(
    public cdr: ChangeDetectorRef,
    public ngxService: NgxUiLoaderService,
    public el: ElementRef,
    public router: Router,
    public http: HttpClient,
    public _butler: Butler,
    public authRESTService: AuthRESTService,
    public yeoman: Yeoman,
    public orderIn:Order,
    public dataApiService: DataApiService
  ) {
    this.yeoman.viewSelected = true;
    console.log("cat" + JSON.stringify(this.yeoman.catalogo));
    console.log("view " + this.yeoman.viewSelected);
    // $('#main-wrapper').addClass("show menu-toggle");
    // this.ngxService.start("loader-02");
    this.findClient();
  }
  public  goPre(){
    this.orderIn.neworder=this.yeoman.neworder;
    this.router.navigate(['/mobPreOrder'])
  }
  ngOnInit(): void {
    
  }
  showDisc(i:any){
    this.showDiscount=true;
    this.showISelecte=i;
  }
  onScroll() {
    const container = document.querySelector('div'); // Reemplaza 'div' con el selector de tu elemento de desplazamiento
    if (container) {
      const scrollHeight = container.scrollHeight;
      const scrollTop = container.scrollTop;
      const clientHeight = container.clientHeight;

      // Verifica si el usuario se desplaza cerca del final (por ejemplo, a 100 píxeles del final)
      if (scrollHeight - scrollTop - clientHeight < 100) {
        this.loadNextPage();
      }
    }
  }
    loadNextPage() {
    if (this.isLoading) {
      return;
    }}
  load() {
    this.dataApiService.getCategories(this.yeoman.dist.url)
      .pipe(
        catchError(error => {
          return of([]);
        })
      )
      .subscribe(categorias => {
        this.yeoman.categories = categorias;
        this.totalCategorias[this.yeoman.dist.id] = categorias.length;
      });
  }
  changeView() {
    this.viewSelected = !this.viewSelected;
  }
  changeItemsPerPage(value: number): void {
    this.itemsPP = value;
  }
  select(product: any,i:any) {
    this.artSelected = true;
    this.showISelecte=i;
    this.selected = product;
  }
  isCantidadUndefinedInCatalogo(i: number): boolean {
    const item = this.catalogo[i];
    return typeof item !== 'undefined' && typeof item.cantidad !== 'number';
  }
  isNewOrderQuantityUndefined(index: number): boolean {
    return typeof this.neworder[index]?.cantidad === 'undefined';
  }
  onInputChange(articulo: any, i: any) {
    clearTimeout(this.envioAutomaticoTimeout);
    this.envioAutomaticoTimeout = setTimeout(() => {
      this.agregarAOrden(articulo, i)
    }, 100);
  }
  setArticulo(articulo: any) {
    this.yeoman.previewArticulo = articulo;
  }
  focusNext(event: KeyboardEvent) {
    event.preventDefault();
    const target = event.target as EventTarget | null;
    if (target instanceof HTMLInputElement) {
      const closestTr = target.closest('tr');
      if (closestTr) {
        const inputs = closestTr.querySelectorAll('input');
        const currentIndex = Array.from(inputs).indexOf(target);
        if (currentIndex !== -1 && currentIndex < inputs.length - 1) {
          const nextInput = inputs[currentIndex + 1];
          if (nextInput && nextInput instanceof HTMLInputElement) {
            nextInput.focus();
          }
        }
      }
    }
  }
  ver(i: any, articulo: any) {
    this.yeoman.previewArticulo = articulo;
    this.indiceMostrado = i;
    this.mostrarTabla = true;
  }
  focusNextInput(articulo: any, nextInputId: any) {
    const index = this.yeoman.catalogo.indexOf(articulo);
    const nextIndex = index + 1;
    if (nextIndex < this.yeoman.catalogo.length) {
      const nextInput = document.getElementById(nextInputId);
      if (nextInput) {
        nextInput.focus();
      }
    }
  }
  agregarAOrden(articulo: any, indice: any) {
    // Busca si el artículo ya existe en el pedido actual
    const existente = this.yeoman.neworder.find(item => item.articulo.arcodigo === articulo.arcodigo);
    // Verifica si hay descuentos promocionales en el artículo
    if (articulo.descuentoPromocional && articulo.descuentoPromocional.filter((desc: number) => desc > 0).length > 0) {
      const cantidad = articulo.cantidad;
      let descuentoIndex = -1;
      // Calcula el índice de descuento basado en la cantidad
      for (let i = 0; i < articulo.descuentoPromocional.length; i++) {
        if (cantidad >= articulo.descuentoPromocional[i] && articulo.descuentoPromocional[i] !== 0) {
          descuentoIndex = i;
        } else {
          break;
        }
      }  
      let descuentoPorcentaje = 0;
      if (descuentoIndex >= 0) {
        descuentoPorcentaje = articulo.descuentoPorcentaje[descuentoIndex];
      }  
      // Calcula el precio con descuento
      const descuentoTotal = descuentoPorcentaje + articulo.ardescuento;
      articulo.precioConDescuento = articulo.arprecio * (1 - descuentoTotal / 100);
      articulo.descuentoIndex = descuentoIndex;
    } else {
      // Si no hay descuentos promocionales, verifica el descuento por cantidad
      if (articulo.ardescuento > 0) {
        const descuentoTotal = articulo.ardescuento;
        articulo.precioConDescuento = articulo.arprecio * (1 - descuentoTotal / 100);
        articulo.descuentoIndex = -1;
      }
    }  
    // Actualiza un artículo existente en el pedido
    if (existente) {
      existente.cantidad = articulo.cantidad;
      existente.precioConDescuento = articulo.precioConDescuento;
        // Actualiza el artículo en el catálogo si existe
      const articuloCatalogo = this.yeoman.catalogo.find(item => item.arcodigo === articulo.arcodigo);
      if (articuloCatalogo) {
        articuloCatalogo.precioConDescuento = articulo.precioConDescuento;
        articuloCatalogo.descuentoIndex = articulo.descuentoIndex;
      }
    } else {
      // Agrega un nuevo artículo al pedido
      const nuevoItem: { articulo: any; iva: any; cantidad: number; precioConDescuento: number, descuentoIndex: number } = {
        articulo,
        iva: articulo.iva,
        cantidad: articulo.cantidad,
        precioConDescuento: articulo.precioConDescuento,
        descuentoIndex: articulo.descuentoIndex,
      };
      this.yeoman.neworder.push(nuevoItem);
    
      this.yeoman.orderSize = this.yeoman.neworder.length;
      this.catalogo = this.yeoman.catalogo;
      this.cdr.detectChanges();
    }
    this.calculateTotal();
    console.log('Estado actual del array neworder:', JSON.stringify(this.yeoman.neworder));
  }  

  calculateTotal() {
  this.yeoman.totalOrder = 0; // Reinicia el total del pedido
  this.yeoman.totalIVA = 0; // Reinicia el total del IVA
  this.yeoman.totalDescuento = 0; // Inicializa el total de descuentos
  // Itera a través de los elementos del pedido
  let i=0;
  for (const item of this.yeoman.neworder) {
   if (item.articulo.arnombre){
    // Calcula el subtotal basado en el precio con descuento si está disponible, de lo contrario, usa el precio original.
    const subtotal = (item.precioConDescuento ?? item.articulo.arprecio) * item.cantidad;
    console.log("indice: ["+i +"] sub-total:"+subtotal);
    this.yeoman.totalOrder += subtotal; // Agrega el subtotal al total del pedido
    this.yeoman.totalIVA += (item.articulo.ariva / 100) * subtotal; // Agrega el IVA al total de IVA
    // Calcula y suma el descuento al total de descuentos si el precio original está definido.
    this.yeoman.totalDescuento += (item.articulo.arprecio * item.cantidad - subtotal) || 0;
    i++;
  }}
  console.log("TOTAL: "+this.yeoman.totalOrder);

  console.log("TOTAL IVA: "+this.yeoman.totalIVA);

  console.log("TOTAL Descuento: "+this.yeoman.totalDescuento);
}
  // calculateTotal() {
  //   this.yeoman.totalOrder = 0; // Reinicia el total del pedido
  //   this.yeoman.totalIVA = 0; // Reinicia el total del IVA
  //   this.yeoman.totalDescuento = 0; // Inicializa el total de descuentos  
  //   for (let i = 0; i < this.yeoman.neworder.length; i++) {
  //     const item = this.yeoman.neworder[i];
  //     if (item.articulo.precioConDescuento !== undefined) {
  //       const subtotal = item.articulo.precioConDescuento * item.cantidad;
  //       this.yeoman.totalOrder += subtotal; // Agrega el subtotal al total del pedido
  //       const iva = (item.articulo.ariva / 100) * subtotal;
  //       this.yeoman.totalIVA += iva; // Agrega el IVA al total de IVA
  //       // Calcula y suma el descuento al total de descuentos
  //       const precioOriginal = item.articulo.arprecio * item.cantidad;
  //       const descuento = precioOriginal - subtotal;
  //       this.yeoman.totalDescuento += descuento;
  //     } else if (item.articulo.arprecio !== undefined) {
  //       const subtotal = item.articulo.arprecio * item.cantidad;
  //       this.yeoman.totalOrder += subtotal; // Agrega el subtotal al total del pedido
  //       const iva = (item.articulo.ariva / 100) * subtotal;
  //       this.yeoman.totalIVA += iva; // Agrega el IVA al total de IVA
  //     }
  //   }
  //   console.log("Total de la orden: " + this.yeoman.totalOrder);
  //   console.log("Total de IVA: " + this.yeoman.totalIVA);
  //   console.log("Total de descuento: " + this.yeoman.totalDescuento); // Muestra el total de descuentos en la consola
  // }
  tablaHTML = this.generateTableHTML(this.articulo.descuentoPorcentaje);
  generateTableHTML(data: number[]): string {
    console.log("entramos!!1");
    let tableHTML = '<table>';
    tableHTML += '<tr><th>Porcentaje</th></tr>';
    data.forEach((percentage) => {
      tableHTML += `<tr><td>${percentage}%</td></tr>`;
    });
    tableHTML += '</table>';
    return tableHTML;
  }
  public setLoading(){
    this.yeoman.loadingAdd=false;
    this.yeoman.catalogoCargado=true;   
    this.cdr.detectChanges();
    console.log("valores: lA - cC : [" + this.yeoman.loadingAdd + "] [" + this.yeoman.catalogoCargado + "]")

     this.router.navigate(['../']);
  }
  ngAfterViewInit(): void {
    const tabKeyPress$ = fromEvent<KeyboardEvent>(this.el.nativeElement, 'keydown')
      .pipe(
        filter(event => event.key === 'Tab')
      );
    tabKeyPress$.subscribe(() => {
      const articulo = {
        arcodigo: '-',
        cantidad: 1
      };
      this.agregarAOrden(articulo, 0);
    });
  }
  findClient() {
    const idFind = this.authRESTService.getCurrentUser();
    if (idFind !== undefined) {
      let distString = localStorage.getItem('clientCard');
      if (distString !== null) {
        let clientCard = JSON.parse(distString);
        const idClient = clientCard.idUser;
        const idDist = clientCard.ref;
        this.yeoman.idClient = idClient;
        this.yeoman.client = clientCard;
        this.yeoman.clientEmail = clientCard.email;
        this.yeoman.idDist = idDist;
        this.findDist(clientCard.ref);
      }
    }
  }
  findDist(ref: any) {
    this.dataApiService.getDistByIdDist(ref).subscribe((res: any) => {
      console.log("dist: " + JSON.stringify(res));
      this.yeoman.dist = res[0];
      const url = this.yeoman.dist.url;
      const parametros = 'clcodigo=' + this.yeoman.client.cliCodigo;
      const endpoint = 'webapi/articulos/getcatalogo';
      const consultaUrl = url + endpoint + '?' + parametros;
      this.dataApiService.getCatalogo(consultaUrl)
        .subscribe(
          data => {
            if (!this.yeoman.catalogoCargado) {
              this.yeoman.catalogo = data;
              this.imageVinculation();
              this.yeoman.catalogoCargado = true;
            }
            this.load();
            this.getDescuentos();
          },
          error => {
            console.error("Error en la solicitud:", error);
          }
        )
        .add(() => {
          this.ngxService.stop("loader-02");
        });
      this.calculateTotal();
    });
  }
  imageVinculation() {
    if (this.yeoman.catalogo) {
      this.yeoman.catalogo.forEach((articulo) => {
        if (articulo.arimagen !== null) {
          articulo.arimagen = this.yeoman.imagesUrl + articulo.arimagen;
        }
      });
    }
  }
  getDescuentos() {
    let client = localStorage.getItem('clientFicha');
    if (client !== null) {
      const url = this.yeoman.dist.url;
      let clientString = JSON.parse(client);
      const prolistaprecio = clientString.cllistaprecio;
      console.log("prolistaprecio:" + prolistaprecio);
      const parametros = 'prolistaprecio=' + prolistaprecio;
      const endpoint = 'webapi/descuentos/getpromocionales';
      const consultaUrl = url + endpoint + '?' + parametros;
      this.dataApiService.getDescuento(consultaUrl, parametros).subscribe(reponse => {
        this.yeoman.descuentos = reponse;
        console.log("descuentos: " + JSON.stringify(this.yeoman.descuentos));
        this.yeoman.descuentos.forEach((descuento: any) => {
          const articulo = this.yeoman.catalogo.find((articulo: any) => articulo.arcodigo === descuento.proarticulo);
          if (articulo) {
            articulo.descuentoPromocional = [descuento.procantidad1, descuento.procantidad2, descuento.procantidad3];
            articulo.descuentoPorcentaje = [descuento.prodescuento1, descuento.prodescuento2, descuento.prodescuento3];
          }
        });
        this.calculateTotal();
      });
    }
  }
}