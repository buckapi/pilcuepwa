import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobOrdersRoutingModule } from './mob-orders-routing.module';
import { MobOrdersComponent } from './mob-orders.component';


@NgModule({
  declarations: [
    MobOrdersComponent
  ],
  imports: [
    CommonModule,
    MobOrdersRoutingModule
  ]
})
export class MobOrdersModule { }
