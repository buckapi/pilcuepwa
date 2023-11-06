import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailRoutingModule } from './detail-routing.module';
import { DetailComponent } from './detail.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';


@NgModule({
  declarations: [
    DetailComponent
  ],
  imports: [
    NgxUsefulSwiperModule,
    CommonModule,
    DetailRoutingModule
  ]
})
export class DetailModule { }
