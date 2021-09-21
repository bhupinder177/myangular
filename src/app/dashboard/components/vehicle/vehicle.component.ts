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
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  taxiInspectionExpiryDatePickerValue = new Date().getDate() + "-" + new Date().getMonth()+"-" +new Date().getFullYear();
  taxiInspectionExpiryDatePickerValue1 = '';
  angForm: FormGroup;
  angForm1: FormGroup;
  loader = 0;
  listing =[];
  p: number = 1;
  totalItem =0;
  start = 1;
  id ='';
  submitted = false;

  constructor(private router:Router,private fb: FormBuilder,private http: HttpClient,private service: DashboardService,private toastr: ToastrService)
  {
    this.angForm = this.fb.group({
       taxiNumber: ['', [Validators.required] ],
       taxiType: ['', [Validators.required] ],
       taxiSeat: ['', [Validators.required] ],
       taxiInspectionExpiryDate: ['', [Validators.required] ],
    });

    this.angForm1 = this.fb.group({
       taxiNumber: ['', [Validators.required] ],
       taxiType: ['', [Validators.required] ],
       taxiSeat: ['', [Validators.required] ],
       taxiInspectionExpiryDate: ['', [Validators.required] ],
    });

  }

  ngOnInit()
  {
    this.getvehicle(this.p);
    if (jQuery(window).width() <= 800)
     {
       jQuery('.hamburger hamburger--htla').removeClass('is-active');
       jQuery('html').css("overflow", "auto");
       jQuery('body').removeClass('menu-left-opened');
     }

  }


  getvehicle(e)
{
   this.service.getvehicle(e)
     .subscribe(
   (response:any) =>
     {
       if(response.success == "true")
       {

         this.listing = response.result.data;
         this.totalItem = response.result.total;
         this.start = response.result.from;
       }
       else if(response.success == "false")
       {
         this.listing =[];
       }
     },
     error =>
      {

     });
     return e;
   }


   openaddmodal()
   {
     jQuery("#myModal").modal('show');
   }

   formSubmit(value: any)
  {

    this.submitted = true;
    if( !this.angForm.valid )
    {
      return false;
    }

    this.loader = 1;

    this.service.addvehicle(value)
       .subscribe(
     (response:any) =>
       {
         if(response.success == "true")
         {
           this.loader = 0;
           this.getvehicle(this.p);
           this.toastr.success(response.message);


          jQuery('#myModal').modal('hide');
          this.taxiInspectionExpiryDatePickerValue = new Date().getDate() + "-" + new Date().getMonth()+"-" +new Date().getFullYear();

          this.angForm = this.fb.group({
             taxiNumber: ['', [Validators.required] ],
             taxiType: ['', [Validators.required] ],
             taxiSeat: ['', [Validators.required] ],
             taxiInspectionExpiryDate: [this.taxiInspectionExpiryDatePickerValue, [Validators.required] ],
          });
          this.submitted = false;
          this.taxiInspectionExpiryDatePickerValue = new Date().getDate() + "-" + new Date().getMonth()+"-" +new Date().getFullYear();

         }
         else if(response.success == "false")
         {
           this.loader = 0;

           this.toastr.error(response.message);

         }
       },
       error =>
        {
          this.loader = 0;

          this.toastr.error("internal Server Error");


       });

  }

  delete (id)
  {
    jQuery("#Delete").modal('show');
    this.id = id;
  }


  deleterecord()
{
  var value = {};
  value['id'] = this.id;
 this.service.deletevehicle(value)
     .subscribe(
    (response:any)=>
     {
       if(response.success == 'true')
       {
         jQuery("#Delete").modal('hide');
         this.toastr.success('Vehicle Deleted Successfully');
         this.getvehicle(this.p);

       }
       else
       {
         jQuery("#Delete").modal('hide');

         this.toastr.error('Vehicle IS Not Delete');
      }
    },
     error =>
      {
        this.toastr.error('Inertnal server error');
      });
 }


 edit (id)
 {
   var value1 = {};
   value1['id'] = id;
   this.id = id;
   console.log(value1);
   this.service.editvehicle(value1)
       .subscribe(
      (response:any)=>
       {
         if(response.success == 'true')
         {
           this.taxiInspectionExpiryDatePickerValue = response.result.taxiInspectionExpiryDate;
           this.angForm1.controls['taxiNumber'].setValue(response.result.taxiNumber);
           this.angForm1.controls['taxiType'].setValue(response.result.taxiType);
           this.angForm1.controls['taxiSeat'].setValue(response.result.taxiSeat);
           this.angForm1.controls['taxiInspectionExpiryDate'].setValue(response.result.taxiInspectionExpiryDate);

           jQuery("#edit").modal('show');

         }
      },
       error =>
        {
          this.toastr.error('Inertnal server error');
        });
 }
 // edit

 // update
 update(value1:any)
 {
   this.submitted = true;
   var date = jQuery('.expired1').val();
   value1['taxiInspectionExpiryDate'] = date;

   if(!this.angForm1.valid )
   {
     return false;
   }
   value1['id'] = this.id;


   this.service.updatevehicle(value1)
      .subscribe(
    (response:any) =>
      {
        if(response.success)
        {
          this.getvehicle(this.p);
          this.toastr.success('Vehicle Updated Successfully');
         jQuery('#edit').modal('hide');

         this.submitted = false;

        }
        else if(response.error)
        {
          alert("Error");
        }
      },
      error =>
       {

      });

 }
 // update


}
