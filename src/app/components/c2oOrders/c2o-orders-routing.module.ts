import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { C2oOrdersComponent } from './c2o-orders.component';

const routes: Routes = [{ path: '', component: C2oOrdersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class C2oOrdersRoutingModule { }
