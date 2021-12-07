import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
     loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
     loadChildren: () => import('./dashboard/dashboard.module').then(d => d.DashboardModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ })],
  exports: [RouterModule],
  // useHash:true
  // RouterModule.forRoot (routes, { useHash:true})

})
export class AppRoutingModule { }
