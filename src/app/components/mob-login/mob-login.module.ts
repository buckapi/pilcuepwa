import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobLoginRoutingModule } from './mob-login-routing.module';
import { MobLoginComponent } from './mob-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MobLoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MobLoginRoutingModule
  ]
})
export class MobLoginModule { }
