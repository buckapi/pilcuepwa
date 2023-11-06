import { Component ,AfterViewInit} from '@angular/core';
import { ScriptService } from '@app/services/script.service';
import { ScriptStore } from '@app/services/script.store';
import { SwiperOptions } from 'swiper';
import { Butler } from '@services/butler.service';
import { HttpClient } from  '@angular/common/http';
import { DataApiService } from '@services/data-api.service';
@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.css']
})
export class SwiperComponent implements AfterViewInit  {
  products$:any={};
  title = 'vk';
  constructor(
    private http: HttpClient,
 
   // private formBuilder: FormBuilder,
 //   private ngxService: NgxUiLoaderService,
    public _butler:Butler,
    public dataApiService: DataApiService,
    public script:ScriptService
  ){
this.dataApiService.getAllProducts().subscribe(response => {
    // this.ngxService.stop("loader-01");
  this.products$ = response
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
  ngAfterViewInit(): void {}
}