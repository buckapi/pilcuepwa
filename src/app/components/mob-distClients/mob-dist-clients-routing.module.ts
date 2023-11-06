import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobDistClientsComponent } from './mob-dist-clients.component';

const routes: Routes = [{ path: '', component: MobDistClientsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobDistClientsRoutingModule { }
