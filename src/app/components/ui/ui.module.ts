import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { C2oHeaderComponent } from './c2oHeader/c2o-header.component';
import { C2oSearchComponent } from './c2oSearch/c2o-search.component';
import { C2oCategoriesComponent } from './c2oCategories/c2o-categories.component';
import { C2oNavComponent } from './c2oNav/c2o-nav.component';
import { RouterModule } from '@angular/router';
import { Yeoman } from '@app/services/yeoman.service';

import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    C2oHeaderComponent,
    C2oSearchComponent,
    C2oCategoriesComponent,
    C2oNavComponent,
 
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    C2oHeaderComponent,C2oSearchComponent,C2oCategoriesComponent,C2oNavComponent
  ],
  providers:[
    Yeoman
  ]
})
export class UiModule { }
