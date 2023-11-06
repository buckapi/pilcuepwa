import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApidocsComponent } from './apidocs.component';

const routes: Routes = [{ path: '', component: ApidocsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApidocsRoutingModule { }
