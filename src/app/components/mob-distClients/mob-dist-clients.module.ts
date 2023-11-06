import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobDistClientsRoutingModule } from './mob-dist-clients-routing.module';
import { MobDistClientsComponent } from './mob-dist-clients.component';


@NgModule({
  declarations: [
    MobDistClientsComponent
  ],
  imports: [
    CommonModule,
    MobDistClientsRoutingModule
  ]
})
export class MobDistClientsModule { }
