import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { DriverComponent } from './components/driver/driver.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { CustomerComponent } from './components/customer/customer.component'; // <-- import the module

@NgModule({
  declarations: [DashboardComponent, HeaderComponent, SidebarComponent, ChangePasswordComponent, DriverComponent, VehicleComponent, CustomerComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule
  ]
})
export class DashboardModule { }
