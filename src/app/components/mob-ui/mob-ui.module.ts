import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Yeoman } from '@app/services/yeoman.service';
import { FormsModule } from '@angular/forms';
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { ReactiveFormsModule } from '@angular/forms';
import { MenubarComponent } from './menubaar/menubar/menubar.component';
import { MobHomeComponent } from '../mob-home/mob-home.component';
import { MobHomeModule } from '../mob-home/mob-home.module';
import { MobAddOrderModule } from '../mob-addOrder/mob-add-order.module';
@NgModule({
  declarations: [
    MenubarComponent
  ],
  imports: [
    MobAddOrderModule,
    MobHomeModule,
    CommonModule,
    NgxUiLoaderModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    MenubarComponent
  ],
  providers:[
    Yeoman,MobAddOrderModule
  ]
})
export class MobUiModule { }
