import { Component, OnInit } from '@angular/core';
import { FormArray , FormControl , FormBuilder, FormGroup , Validators ,AbstractControl , ValidationErrors } from '@angular/forms';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { HttpClient, HttpHeaders }    from '@angular/common/http';
import { DashboardService } from '../../services/dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination';
import * as myGlobals from '../../../shared/globals';

declare var jQuery: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  driver = 0;
  vehicle = 0;
  customer = 0;

  constructor(private router:Router,private fb: FormBuilder,private http: HttpClient,private service: DashboardService,private toastr: ToastrService) { }

  ngOnInit()
  {
     this.getdashboard();
    if (jQuery(window).width() <= 800)
     {
       jQuery('.hamburger hamburger--htla').removeClass('is-active');
       jQuery('html').css("overflow", "auto");
       jQuery('body').removeClass('menu-left-opened');
     }

  }


  getdashboard()
{
   this.service.getdashboard()
     .subscribe(
   (response:any) =>
     {
       if(response.success == "true")
       {
         this.driver = response.driver;
         this.vehicle = response.vehicle;
         this.customer = response.customer;
       }
     },
     error =>
      {

     });
   }

}
