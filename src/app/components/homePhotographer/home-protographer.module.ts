import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeProtographerRoutingModule } from './home-protographer-routing.module';
import { HomeProtographerComponent } from './home-protographer.component';


@NgModule({
  declarations: [
    HomeProtographerComponent
  ],
  imports: [
    CommonModule,
    HomeProtographerRoutingModule
  ]
})
export class HomeProtographerModule { }
