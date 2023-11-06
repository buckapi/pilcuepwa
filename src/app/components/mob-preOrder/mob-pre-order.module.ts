import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobPreOrderRoutingModule } from './mob-pre-order-routing.module';
import { MobPreOrderComponent } from './mob-pre-order.component';
import { Yeoman } from '@services/yeoman.service';

@NgModule({
  declarations: [
    MobPreOrderComponent
  ],
  imports: [
    CommonModule,
    MobPreOrderRoutingModule
  ],
  providers:[
    Yeoman
  ]
})
export class MobPreOrderModule { }
