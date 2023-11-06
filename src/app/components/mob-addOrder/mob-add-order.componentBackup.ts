import { Component, OnInit, AfterViewInit, ViewChild, Input, Output, EventEmitter, ElementRef, OnDestroy, Directive, ChangeDetectorRef } from '@angular/core';
import { Yeoman } from '@services/yeoman.service';
import { HttpClient } from '@angular/common/http';
import { Butler } from '@app/services/butler.service';
import { DataApiService } from '@app/services/data-api.service';
import { SwiperOptions } from 'swiper';
import { Router } from '@angular/router';
import { AuthRESTService } from '@app/services/authREST.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { NewOrderItem } from './types';
import { Subscription, fromEvent, timer } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { filter } from 'rxjs/operators';
import { UploaderCaptions } from 'ngx-awesome-uploader';
import { DemoFilePickerAdapter } from '@app/file-picker.adapter';
import Swal from 'sweetalert2'

import { merge } from 'rxjs';
@Component({
  selector: 'app-mob-add-order',
  templateUrl: './mob-add-order.component.html',
  styleUrls: ['./mob-add-order.component.css']
})
export class MobAddOrderComponent implements AfterViewInit {
  @Input() delay = 0.00002; // Adjust the delay as needed (2 seconds in this case)
  @Output() ngModelChangeDebounced = new EventEmitter();
  @ViewChild('cantidadInput', { static: false }) cantidadInput: ElementRef | undefined;
  currentPage: number = 1;
  isLoading: boolean = false;
  viewSelected: boolean = true;
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
  envioAutomaticoTimeout: any; // Declaración de la propiedad
  showTooltip = false;
  tableData = [['a', 'a', 'a'], ['a', 'a', 'a']];
  selectedRow: number | null = null; // Declaración de selectedRow
  indiceMostrado = 0;
  neworder: { articulo: any; cantidad: number; }[] = [];
  valorInput: string = '';
  totalOrder: number = 0;
  mostrarTabla = false;
  articulo = {
    descuentoPorcentaje: [10, 15, 20]
  };
  constructor(
    // private cdr: ChangeDetectorRef,
    private ngxService: NgxUiLoaderService,
    private el: ElementRef,
    public router: Router,
    public http: HttpClient,
    public _butler: Butler,
    public authRESTService: AuthRESTService,
    public yeoman: Yeoman,
    public dataApiService: DataApiService
  ) {
    console.log("loading recibido: "+this.yeoman.loadingAdd);
    this.yeoman.viewSelected = true;
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
    }
    this.isLoading = true;
    this.currentPage++;
    const url = this.yeoman.dist.url;
    const clcodigo = this.yeoman.client.cliCodigo;
    const page = this.currentPage;
    const pageSize = 25; // Establece el tamaño de página en 25 (o el valor deseado)
    const parametros = `clcodigo=${clcodigo}&page=${page}&pageSize=${pageSize}`; // Incluye pageSize en los parámetros
    const endpoint = 'webapi/articulos/getcatalogo';
    const consultaUrl = `${url}${endpoint}?${parametros}`;
    this.dataApiService.getCatalogo(consultaUrl)
      .pipe(
        catchError(error => {
          // Manejar el error aquí
          return of([]); // Devolver un observable vacío para suprimir el error
        })
      )
      .subscribe(data => {
        if (data.length > 0) {
          // Agrega los nuevos datos a la lista existente
          this.catalogo = [...this.catalogo, ...data];
          // Actualiza el estado de isLoading
          this.isLoading = false;
        }
      });
  }
  load() {

    this.dataApiService.getCategories(this.yeoman.dist.url)
      .pipe(
        catchError(error => {
          // Manejar el error aquí
          return of([]); // Devolver un observable vacío para suprimir el error
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
  select(product: any) {
    this.artSelected = true;
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
    }, 100); // Cambia este valor al tiempo que deseas esperar antes del envío automático (en milisegundos)
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
    const index = this.yeoman.catalogo.indexOf(articulo); // Obtenemos el índice del artículo actual
    const nextIndex = index + 1; // Calculamos el índice del siguiente artículo
    if (nextIndex < this.yeoman.catalogo.length) {
      // Si hay un siguiente artículo, enfoque el siguiente campo de entrada
      const nextInput = document.getElementById(nextInputId);
      if (nextInput) {
        nextInput.focus();
      }
    }
  }
  agregarAOrden(articulo: any, indice: any) {
    // Se busca si el artículo ya existe en la orden
    const existente = this.yeoman.neworder.find(item => item.articulo.arcodigo === articulo.arcodigo);
    if (existente) {
      // Se actualiza la cantidad del artículo existente en la orden
      existente.cantidad = articulo.cantidad;
      // Se verifica si hay descuentos aplicables al artículo
      if (articulo.descuento && articulo.descuento.filter((desc: number) => desc > 0).length > 0) {
        const cantidad = existente.cantidad;
        let descuentoIndex = -1;
        // Se encuentra el índice del descuento aplicado
        for (let i = 0; i < articulo.descuento.length; i++) {
          if (cantidad >= articulo.descuento[i] && articulo.descuento[i] !== 0) {
            descuentoIndex = i;
          } else {
            break;
          }
        }
        // Se calcula el porcentaje de descuento
        let descuentoPorcentaje = 0;
        if (descuentoIndex >= 0) {
          descuentoPorcentaje = articulo.descuentoPorcentaje[descuentoIndex];
        }
        // Se calcula el precio con descuento y se actualiza el catálogo si es necesario
        existente.precioConDescuento = articulo.arprecio * (1 - descuentoPorcentaje / 100);
        const articuloCatalogo = this.yeoman.catalogo.find(item => item.arcodigo === articulo.arcodigo);
        if (articuloCatalogo) {
          articuloCatalogo.precioConDescuento = existente.precioConDescuento;
          articuloCatalogo.descuentoIndex = descuentoIndex;
        }
      }
    } else {
      // Se crea un nuevo elemento si el artículo no existe en la orden
      const nuevoItem: { articulo: any; iva: any; cantidad: number; precioConDescuento: number } = {
        articulo,
        iva: articulo.iva,
        cantidad: articulo.cantidad,
        precioConDescuento: articulo.precioConDescuento || 0,
      };
      // Se asigna un precio con descuento predeterminado si no se proporciona
      if (articulo.precioConDescuento !== undefined) {
        nuevoItem.precioConDescuento = articulo.precioConDescuento;
      } else {
        nuevoItem.precioConDescuento = 0; // Puede cambiarse a cualquier valor predeterminado deseado
      }
      // Se verifica si hay descuentos aplicables al nuevo artículo
      if (articulo.descuento && articulo.descuento.filter((desc: number) => desc > 0).length > 0) {
        const cantidad = articulo.cantidad;
        let descuentoIndex = -1;
        // Se encuentra el índice del descuento aplicado
        for (let i = 0; i < articulo.descuento.length; i++) {
          if (cantidad >= articulo.descuento[i] && articulo.descuento[i] !== 0) {
            descuentoIndex = i;
          } else {
            break;
          }
        }
        // Se calcula el porcentaje de descuento
        let descuentoPorcentaje = 0;
        if (descuentoIndex >= 0) {
          descuentoPorcentaje = articulo.descuentoPorcentaje[descuentoIndex];
        }
        // Se calcula el precio con descuento y se actualiza el catálogo si es necesario
        nuevoItem.precioConDescuento = articulo.arprecio * (1 - descuentoPorcentaje / 100);
        const articuloCatalogo = this.yeoman.catalogo.find(item => item.arcodigo === articulo.arcodigo);
        if (articuloCatalogo) {
          articuloCatalogo.descuentoIndex = descuentoIndex;
        }
      }
      // Se agrega el nuevo artículo a la orden y se realizan cálculos adicionales
      this.yeoman.neworder.push(nuevoItem);
      this.calculateTotal();
      this.yeoman.orderSize = this.yeoman.neworder.length;
      this.catalogo = this.yeoman.catalogo;
      // this.cdr.detectChanges();
    }
    // Se muestra el estado actual de la orden
    console.log('Estado actual del array neworder:', JSON.stringify(this.yeoman.neworder));
  }
  calculateTotal() {
    this.yeoman.totalOrder = 0;
    this.yeoman.totalIVA = 0;
    console.log("tamaño de la orden: " + this.yeoman.neworder.length);
    console.log("orden: " + JSON.stringify(this.yeoman.neworder));
    for (let i = 0; i < this.yeoman.neworder.length; i++) {
      const item = this.yeoman.neworder[i];
      if (item.articulo.precioConDescuento !== undefined) {
        const subtotal = item.articulo.precioConDescuento * item.cantidad;
        this.yeoman.totalOrder += subtotal;
        const iva = (item.articulo.ariva / 100) * subtotal;
        this.yeoman.totalIVA += iva;
      } else if (item.articulo.arprecio !== undefined) {
        const subtotal = item.articulo.arprecio * item.cantidad;
        this.yeoman.totalOrder += subtotal;
        const iva = (item.articulo.ariva / 100) * subtotal;
        this.yeoman.totalIVA += iva;
      }
    }
    console.log("total iva" + this.yeoman.totalIVA);

    console.log("sub-total" + this.yeoman.totalOrder);
    // this.yeoman.viewSelected=true;
  }
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
  ngAfterViewInit(): void { }
  findClient() {
    const idFind = this.authRESTService.getCurrentUser().id;
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
      // const url = this.yeoman.dist.url;
      // const parametros = 'clcodigo=' + this.yeoman.client.cliCodigo;
      // const endpoint = 'webapi/articulos/getcatalogo';
      // const consultaUrl = url + endpoint + '?' + parametros;
      // this.dataApiService.getCatalogo(consultaUrl)
      const url = this.yeoman.dist.url;
      const clcodigo = this.yeoman.client.cliCodigo;
      const page = this.currentPage;
      const pageSize = 25; // Establece el tamaño de página en 25 (o el valor deseado)
      const parametros = `clcodigo=${clcodigo}&page=${page}&pageSize=${pageSize}`; // Incluye pageSize en los parámetros
      const endpoint = 'webapi/articulos/getcatalogo';
      const consultaUrl = `${url}${endpoint}?${parametros}`;
      console.log("valor de catalogoCargado:" + this.yeoman.catalogoCargado);
      if (this.yeoman.catalogoCargado == false) {
        console.log("consultando datos");
        this.dataApiService.getCatalogo(consultaUrl)
          .subscribe(
            data => {
              this.yeoman.loadingAdd=false;
              this.yeoman.catalogo = data;
              this.yeoman.catalogoCargado = true;

              this.loadNextPage();
              this.getDescuentos();
            },
            error => {
              console.error("Error en la solicitud:", error);
            }
          )
          .add(() => {
          });
      }
      else {

      }
      this.calculateTotal();
    });
  }
  getDescuentos() {
    let client = localStorage.getItem('clientFicha');
    if (client !== null) {
      const url = this.yeoman.dist.url;
      let clientString = JSON.parse(client);
      const clconpromocion = clientString.clconpromocion;
      console.log("clconpromocion:" + clconpromocion);
      const parametros = 'clconpromocion=' + clconpromocion;
      const endpoint = 'webapi/descuentos/getpromocionales';
      const consultaUrl = url + endpoint + '?' + parametros;
      this.dataApiService.getDescuento(consultaUrl, parametros).subscribe(reponse => {
        this.yeoman.descuentos = reponse;
        console.log("descuentos: " + JSON.stringify(this.yeoman.descuentos));
        this.yeoman.descuentos.forEach((descuento: any) => {
          const articulo = this.yeoman.catalogo.find((articulo: any) => articulo.arcodigo === descuento.proarticulo);
          if (articulo) {
            articulo.descuento = [descuento.procantidad1, descuento.procantidad2, descuento.procantidad3];
            articulo.descuentoPorcentaje = [descuento.prodescuento1, descuento.prodescuento2, descuento.prodescuento3];
          }
        });
        this.calculateTotal();
      });
    }
  }
}
