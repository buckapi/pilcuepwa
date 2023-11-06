import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeProtographerComponent } from './home-protographer.component';

const routes: Routes = [{ path: '', component: HomeProtographerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeProtographerRoutingModule { }
