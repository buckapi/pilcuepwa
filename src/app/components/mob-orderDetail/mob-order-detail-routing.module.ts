import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobOrderDetailComponent } from './mob-order-detail.component';

const routes: Routes = [{ path: '', component: MobOrderDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobOrderDetailRoutingModule { }
