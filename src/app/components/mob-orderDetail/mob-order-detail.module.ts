import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobOrderDetailRoutingModule } from './mob-order-detail-routing.module';
import { MobOrderDetailComponent } from './mob-order-detail.component';


@NgModule({
  declarations: [
    MobOrderDetailComponent
  ],
  imports: [
    CommonModule,
    MobOrderDetailRoutingModule
  ]
})
export class MobOrderDetailModule { }
