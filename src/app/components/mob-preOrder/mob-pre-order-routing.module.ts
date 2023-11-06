import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobPreOrderComponent } from './mob-pre-order.component';

const routes: Routes = [{ path: '', component: MobPreOrderComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobPreOrderRoutingModule { }
