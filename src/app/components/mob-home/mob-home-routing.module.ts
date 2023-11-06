import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobHomeComponent } from './mob-home.component';

const routes: Routes = [{ path: '', component: MobHomeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobHomeRoutingModule { }
