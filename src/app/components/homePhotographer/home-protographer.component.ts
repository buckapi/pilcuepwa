import { Component, OnInit } from '@angular/core';
import { DataApiService } from '@app/services/data-api.service';
import { Yeoman } from '@app/services/yeoman.service';
import { SwiperOptions } from 'swiper';


@Component({
  selector: 'app-home-protographer',
  templateUrl: './home-protographer.component.html',
  styleUrls: ['./home-protographer.component.css']
})
export class HomeProtographerComponent implements OnInit {
  categories:any;
  config: SwiperOptions = {
    a11y: { enabled: true },
    direction: 'horizontal',
    slidesPerView: 2,
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
  constructor(
    public yeoman: Yeoman,
    public dataApi: DataApiService,
    
  ) { 
    this.loadCategories();
  }
  loadCategories(){
    this.dataApi.getAllCategory().subscribe(response=>{
      this.categories=response;
    });
  }
  ngOnInit(): void {
  }

}
