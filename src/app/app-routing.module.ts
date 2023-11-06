import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
{ path:'', redirectTo: '/homePhotographer', pathMatch:'full'},
  { path: 'home', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) },
  
  { path: 'c2oAll', loadChildren: () => import('./components/c2oAll/c2o-all.module').then(m => m.C2oAllModule) },
  
  { path: 'c2oOrders', loadChildren: () => import('./components/c2oOrders/c2o-orders.module').then(m => m.C2oOrdersModule) },
  
{ path: 'apidocs', loadChildren: () => import('./components/apidocs/apidocs.module').then(m => m.ApidocsModule) },
  
{ path: 'login', loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule) },
  
{ path: 'detail', loadChildren: () => import('./components/detail/detail.module').then(m => m.DetailModule) },
  
{ path: 'orders', loadChildren: () => import('./components/orders/orders.module').then(m => m.OrdersModule) },
  
{ path: 'mobHome', loadChildren: () => import('./components/mob-home/mob-home.module').then(m => m.MobHomeModule) },
  
{ path: 'mobOrders', loadChildren: () => import('./components/mob-orders/mob-orders.module').then(m => m.MobOrdersModule) },
  
{ path: 'mobLogin', loadChildren: () => import('./components/mob-login/mob-login.module').then(m => m.MobLoginModule) },
  
{ path: 'mobAddOrder', loadChildren: () => import('./components/mob-addOrder/mob-add-order.module').then(m => m.MobAddOrderModule) },
  
{ path: 'mobPreOrder', loadChildren: () => import('./components/mob-preOrder/mob-pre-order.module').then(m => m.MobPreOrderModule) },
  
{ path: 'mobOrderDetail', loadChildren: () => import('./components/mob-orderDetail/mob-order-detail.module').then(m => m.MobOrderDetailModule) },
  
{ path: 'mobDistClients', loadChildren: () => import('./components/mob-distClients/mob-dist-clients.module').then(m => m.MobDistClientsModule) },
  
{ path: 'homePhotographer', loadChildren: () => import('./components/homePhotographer/home-protographer.module').then(m => m.HomeProtographerModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
