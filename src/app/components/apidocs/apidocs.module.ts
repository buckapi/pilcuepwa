import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApidocsRoutingModule } from './apidocs-routing.module';
import { ApidocsComponent } from './apidocs.component';
import { ExistenciaService } from '@app/services/existencia-service.service';
import { Yeoman } from '@app/services/yeoman.service';
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [
    ApidocsComponent
  ],
  imports: [
    NgxUiLoaderModule,
    CommonModule,

    NgxPaginationModule,
    ApidocsRoutingModule
  ],
  exports: [
    ApidocsComponent,
  ]
  ,
  providers:[
    ExistenciaService,Yeoman
  ]
})
export class ApidocsModule { }
