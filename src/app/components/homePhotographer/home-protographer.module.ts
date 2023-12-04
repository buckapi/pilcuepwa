import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeProtographerRoutingModule } from './home-protographer-routing.module';
import { HomeProtographerComponent } from './home-protographer.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';


@NgModule({
  declarations: [
    HomeProtographerComponent,
  ],
  imports: [
    CommonModule,
    HomeProtographerRoutingModule,
    NgxUsefulSwiperModule
  ]
})
export class HomeProtographerModule { }
