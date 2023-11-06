import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobHomeRoutingModule } from './mob-home-routing.module';
import { MobHomeComponent } from './mob-home.component';
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { Yeoman } from '@app/services/yeoman.service';

@NgModule({
  declarations: [
    MobHomeComponent
  ],
  imports: [
    CommonModule,
    NgxUiLoaderModule,
    MobHomeRoutingModule
  ],
  exports:[
    MobHomeComponent
  ]
  ,providers:[
    Yeoman,MobHomeComponent
  ]
})
export class MobHomeModule { }
