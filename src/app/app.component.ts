import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { ScriptService } from '@app/services/script.service';
import { ScriptStore } from '@app/services/script.store';
import { SwiperOptions } from 'swiper';
import { Butler } from '@services/butler.service';
import { Yeoman } from './services/yeoman.service';
import { HttpClient } from '@angular/common/http';
import { DataApiService } from './services/data-api.service';
import { DemoFilePickerAdapter } from './file-picker.adapter';
import { UploaderCaptions } from 'ngx-awesome-uploader';
import Swal from 'sweetalert2'
import { CATEGORIES } from '@app/services/categories.service';
import { Router } from '@angular/router';
import { AuthRESTService } from './services/authREST.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { slideInAnimation } from './animations';
import { RouterOutlet } from '@angular/router';
// import { NgxUiLoaderService } from 'ngx-ui-loader';
declare const XM_Popup: any;
interface RouteAnimationData {
  animation: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  // getAnimationData(outlet: RouterOutlet): any {
  //   const data = outlet && outlet.activatedRouteData;
  //   if (data && 'animation' in data) {
  //     return data as RouteAnimationData;
  //   }
  //   return null; // Otra acción si no se encuentra el dato de animación
  // }
  @ViewChild('deleteSwal')
  categories: any;
  // public readonly deleteSwal!: SwalComponent;
  popup: any;
  popupStyle = {
    position: 'absolute',
    left: '50%',
    zIndex: '100001',
    opacity: '0',
    visibility: 'hidden',
    transform: 'translate(0px, -40px)',
    transition: 'transform 0.3s ease-in-out 0s, opacity 0.3s ease-in-out 0s, visibility 0.3s ease-in-out 0s',
    top: '0px',
    marginLeft: '-492px'
  };

  public captions: UploaderCaptions = {
    dropzone: {
      title: 'Imágenes del producto',
      or: '.',
      browse: 'Cargar',
    },
    cropper: {
      crop: 'Cortar',
      cancel: 'Cancelar',
    },
    previewCard: {
      remove: 'Borrar',
      uploadError: 'error',
    },
  };
  data = {
    images: [] as string[], 
    name: '',
    description: '',
    price: null,
    stock: 0,
    ref: '',
    idBranch: ''
  };
  runButtonClicked() {
    this.popupStyle.opacity = '1';
    this.popupStyle.visibility = 'hidden';
  }
 
  products$: any = {};
  title = 'vk';
  adapter = new DemoFilePickerAdapter(this.http, this._butler);
  constructor(
    public authRESTService: AuthRESTService,
    private http: HttpClient,
    public router: Router,
    // private ngxService: NgxUiLoaderService,
    public _butler: Butler,
    public yeoman: Yeoman,
    public dataApiService: DataApiService,
    public script: ScriptService
  ) {
    // this.script.load( 'main')
    this.script.load( 'script')
    this._butler.data = this.data;
    this.script.load(
      'jquery',
      'plugins',
      'script'
          )
          .then(data => {
            // this.yeoman.isLoaded=true;
          })
          .catch(error => console.log(error)); 
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
  getProducts() {
    this.dataApiService.getAllProducts().subscribe(response => {
      // this.ngxService.stop("loader-01");
      this.yeoman.products = response;
      this.yeoman.products.reverse();

    });
  }
  onLogOut() {
    this.authRESTService.logoutUser();
    this.yeoman.reset();
    this.router.navigate(['/login']);
  }

  onSubmit() {
    this.data.ref = (Math.floor(Math.random() * 10000000000000)).toString();
    this.data.images = this._butler.carImages;
    this.dataApiService.saveProduct(this.data).subscribe(response => {
      console.log(response);
      this._butler.carImages = [];
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
      this.getProducts();
    });
    // Aquí puedes enviar los datos al servidor o realizar las acciones necesarias
    console.log(this.data);
  }
  connectFlag() {
    this.yeoman.apiConnected = !this.yeoman.apiConnected;
  }
  ngAfterViewInit(): void { }
}
