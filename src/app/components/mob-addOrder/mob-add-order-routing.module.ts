import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobAddOrderComponent } from './mob-add-order.component';

const routes: Routes = [{ path: '', component: MobAddOrderComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobAddOrderRoutingModule { }
