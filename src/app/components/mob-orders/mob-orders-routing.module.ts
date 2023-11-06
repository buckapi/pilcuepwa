import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobOrdersComponent } from './mob-orders.component';

const routes: Routes = [{ path: '', component: MobOrdersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobOrdersRoutingModule { }
