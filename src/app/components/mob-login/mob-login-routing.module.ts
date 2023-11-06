import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobLoginComponent } from './mob-login.component';

const routes: Routes = [{ path: '', component: MobLoginComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobLoginRoutingModule { }
