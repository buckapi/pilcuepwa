import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { C2oAllRoutingModule } from './c2o-all-routing.module';
import { C2oAllComponent } from './c2o-all.component';

import { NgxUiLoaderModule } from "ngx-ui-loader";
@NgModule({
  declarations: [
    C2oAllComponent
  ],
  imports: [
    CommonModule,
    NgxUiLoaderModule,
    C2oAllRoutingModule
  ]
})
export class C2oAllModule { }
