import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { C2oOrdersRoutingModule } from './c2o-orders-routing.module';
import { C2oOrdersComponent } from './c2o-orders.component';


@NgModule({
  declarations: [
    C2oOrdersComponent
  ],
  imports: [
    CommonModule,
    C2oOrdersRoutingModule
  ]
})
export class C2oOrdersModule { }
