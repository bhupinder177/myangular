import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DriverComponent } from './components/driver/driver.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component'; // <-- import the module
import { CustomerComponent } from './components/customer/customer.component'; // <-- import the module

const routes: Routes = [
  { path: 'dashboard', component : DashboardComponent,data: {title: 'Dashboard'}},
  { path: 'driver', component : DriverComponent,data: {title: 'Driver'}},
  { path: 'change-password', component : ChangePasswordComponent,data: {title: 'Change password'}},
  { path: 'vehicle', component : VehicleComponent,data: {title: 'Vehicle'}},
  { path: 'customer', component : CustomerComponent,data: {title: 'customer'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  // RouterModule.forRoot (routes, { useHash:true})

})
export class DashboardRoutingModule { }
