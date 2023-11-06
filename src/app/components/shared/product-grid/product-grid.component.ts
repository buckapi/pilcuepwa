import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ScriptService } from '@app/services/script.service';
import { ScriptStore } from '@app/services/script.store';
import { SwiperOptions } from 'swiper';
import { Butler } from '@services/butler.service';
import { Yeoman } from '@app/services/yeoman.service';
import { HttpClient } from '@angular/common/http';
import { DataApiService } from '@services/data-api.service';
import { CATEGORIES } from '@app/services/categories.service';
import Swal from 'sweetalert2'
import { DemoFilePickerAdapter } from '../../../file-picker.adapter';
import { UploaderCaptions } from 'ngx-awesome-uploader';
@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css']
})
export class ProductGridComponent implements AfterViewInit {
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
  categories: { name: string, idCategory: string }[] = [];
  @ViewChild('input1') input1!: ElementRef;
  @ViewChild('input2') input2!: ElementRef;

  @ViewChild('deleteSwal')
  showDetail = false;
  p: number = 1;
  page: number = 1;
  count: number = 0;
  itemsPP: number = 8;
  options: number[] = [8, 16, 32];
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];
  opcionesSelect: any[] = [];
  cards$: any = [];
  cars$: any = [];
  editing = false;
  products:any=[];
  products$: any = {};
  title = 'vk';
  constructor(

    private http: HttpClient,

    // private formBuilder: FormBuilder,
    //   private ngxService: NgxUiLoaderService,
    public _butler: Butler,
    public yeoman:Yeoman,
    public dataApiService: DataApiService,
    public script: ScriptService
  ) {
    this.categories = CATEGORIES;
    this.input1 = new ElementRef(null);
    this.input2 = new ElementRef(null);
    this.dataApiService.getAllProducts().subscribe(response => {
      // this.ngxService.stop("loader-01");
      // this.products$ = response
      this.yeoman.products=response;
      this.yeoman.products.reverse();
    });
    this.script.load(

      'bundle'
    )
      .then(data => {
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
  open() {
    // Swal.fire({
    //   title: 'Submit your Github username',
    //   input: 'text',
    //   inputAttributes: {
    //     autocapitalize: 'off'
    //   },
    //   showCancelButton: true,
    //   confirmButtonText: 'Look up',
    //   showLoaderOnConfirm: true,
    //   preConfirm: (login) => {
    //     return fetch(`//api.github.com/users/${login}`)
    //       .then(response => {
    //         if (!response.ok) {
    //           throw new Error(response.statusText)
    //         }
    //         return response.json()
    //       })
    //       .catch(error => {
    //         Swal.showValidationMessage(
    //           `Request failed: ${error}`
    //         )
    //       })
    //   },
    //   allowOutsideClick: () => !Swal.isLoading()
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     Swal.fire({
    //       title: `${result.value.login}'s avatar`,
    //       imageUrl: result.value.avatar_url
    //     })
    //   }
    // })

// Cajas capturadoras ini
    // Swal.fire({
    //   title: 'Custom width, padding, color, background.',
    //   width: 600,
    //   html: `
    //     '<input id="swal-input1" class="swal2-input" #input1>' +
    //     '<input id="swal-input2" class="swal2-input" #input2>',
    //   `,
    //   padding: '3em',
    //   color: '#716add',
    //   background: '#fff url(/images/trees.png)',
    //   backdrop: `
    //     rgba(0,0,123,0.4)
    //     url("/images/nyan-cat.gif")
    //     left top
    //     no-repeat
    //   `,
    //   preConfirm: () => {
    //     const formValues = [
    //       this.input1.nativeElement.value,
    //       this.input2.nativeElement.value
    //     ];

    //     if (formValues) {
    //       Swal.fire(JSON.stringify(formValues));
    //     }
    //   }
    // });
// Cajas capturadoras fin
Swal.fire({
  position: 'center',
  icon: 'success',
  title: 'Your work has been saved',
  showConfirmButton: false,
  timer: 1500
})

  }
  async mostrarSweetAlert() {
    const { value: formValues } = await Swal.fire({
      title: 'Multiple inputs',
      width: 600,
      html:
        '<div><ngx-awesome-uploader [adapter]="adapter" [captions]="captions"></ngx-awesome-uploader></div>' +

        '<ngx-awesome-uploader [adapter]="adapter" [captions]="captions"></ngx-awesome-uploader>' +
        '  <div class="form-row"><div class="form-item"> <div class="form-input small"><label for="event-name">Nombre del producto</label><input id="swal-input1" class="swal2-input"></div></div></div>' +
        '    <div class="form-row"><div class="form-item"> <div class="form-input small"><label for="event-description">Descripción </label><textarea id="swal-input2" class="swal2-input"  aria-label="Type your message here"></textarea></div></div></div>' +
        '<select id="swal-select" class="form-select">' +
        this.generarOpcionesSelectHTML() +
        '</select>',

      focusConfirm: false,
      preConfirm: () => {
        return [
          (<HTMLInputElement>document.getElementById('swal-input1')).value,
          (<HTMLInputElement>document.getElementById('swal-input2')).value,
          (<HTMLSelectElement>document.getElementById('swal-select')).value,
          // (<HTMLSelectElement>document.getElementById('textarea')).value
        ];
      }
    });
    if (formValues) {
      this._butler.data = JSON.stringify(formValues);
      console.log(this._butler.data);
      Swal.fire(JSON.stringify(formValues));
    }
  }
  generarOpcionesSelectHTML(): string {
    let opcionesHTML = '';

    this.categories.forEach(opcion => {
      opcionesHTML += `<option value="${opcion.idCategory}">${opcion.name}</option>`;
    });
    return opcionesHTML;
  }
  changeItemsPerPage(value: number): void {
    this.itemsPP = value;
  }
  ngAfterViewInit(): void { this.showDetail=false;}
}