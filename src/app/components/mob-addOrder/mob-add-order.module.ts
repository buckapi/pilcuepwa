import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobAddOrderRoutingModule } from './mob-add-order-routing.module';
import { MobAddOrderComponent } from './mob-add-order.component';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxUiLoaderModule } from "ngx-ui-loader";

import { HttpClient, HttpClientModule } from '@angular/common/http';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { Yeoman } from '@app/services/yeoman.service';
@NgModule({
  declarations: [
    MobAddOrderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MobAddOrderRoutingModule,
    NgxUiLoaderModule,
    SweetAlert2Module.forRoot()
  ],exports:[
    MobAddOrderComponent
  ]
  ,providers:[
    Yeoman,MobAddOrderComponent
  ]
})
export class MobAddOrderModule { }
