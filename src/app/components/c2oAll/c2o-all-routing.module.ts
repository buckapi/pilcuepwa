import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { C2oAllComponent } from './c2o-all.component';

const routes: Routes = [{ path: '', component: C2oAllComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class C2oAllRoutingModule { }
