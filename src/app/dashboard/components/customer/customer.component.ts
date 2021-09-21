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
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  angForm: FormGroup;
  angForm1: FormGroup;
  loader = 0;
  listing =[];
  viewdata =[];
  p: number = 1;
  totalItem =0;
  start = 1;
  id ='';
  submitted = false;
  constructor(private router:Router,private fb: FormBuilder,private http: HttpClient,private service: DashboardService,private toastr: ToastrService)
  {

    this.angForm = this.fb.group({
       accountName: ['', [Validators.required] ],
       accountNumber: ['', [Validators.required] ],
       contactName: ['', [Validators.required] ],
       referenceNumber: ['', [Validators.required] ],
       email: ['', [Validators.email,Validators.required] ],
       fax: ['', [Validators.required] ],
       phone: ['', [Validators.required] ],
       address: ['', [Validators.required] ],
       billingType: ['', Validators.required ],
    });

    this.angForm1 = this.fb.group({
       accountName: ['', [Validators.required] ],
       accountNumber: ['', [Validators.required] ],
       contactName: ['', [Validators.required] ],
       referenceNumber: ['', [Validators.required] ],
       email: ['', [Validators.email,Validators.required] ],
       fax: ['', [Validators.required] ],
       phone: ['', [Validators.required] ],
       address: ['', [Validators.required] ],
       billingType: ['', Validators.required ],
    });



  }

  ngOnInit()
  {
    this.getcustomer(this.p);

  }




    getcustomer(e)
  {
     this.service.getcustomer(e)
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

      this.service.addcustomer(value)
         .subscribe(
       (response:any) =>
         {
           if(response.success == "true")
           {
             this.loader = 0;
             this.getcustomer(this.p);
             this.toastr.success(response.message);

            jQuery('#myModal').modal('hide');
            this.angForm = this.fb.group({
               accountName: ['', [Validators.required] ],
               accountNumber: ['', [Validators.required] ],
               contactName: ['', [Validators.required] ],
               referenceNumber: ['', [Validators.required] ],
               email: ['', [Validators.email,Validators.required] ],
               fax: ['', [Validators.required] ],
               phone: ['', [Validators.required] ],
               address: ['', [Validators.required] ],
               billingType: ['', Validators.required ],
            });
            this.submitted = false;

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
     console.log(value);
    this.service.deletecustomer(value)
        .subscribe(
       (response:any)=>
        {
          if(response.success == 'true')
          {
            jQuery("#Delete").modal('hide');
            this.toastr.success('Customer Deleted Successfully');
            this.getcustomer(this.p);

          }
          else
          {
            jQuery("#Delete").modal('hide');

            this.toastr.error('Customer IS Not Delete');
         }
       },
        error =>
         {
           this.toastr.error('Inertnal server error');
         });
    }




    // view
    view(id)
    {
      var value = {};
      value['id'] = id;
      this.service.editcustomer(value)
          .subscribe(
         (response:any)=>
          {
            if(response.success == 'true')
            {
              this.viewdata = response.result;
              jQuery("#view").modal('show');

            }
         },
          error =>
           {
           });
    }
    // view



         // edit
         edit (id)
         {
           var value = {};
           value['id'] = id;
           this.id = id;
           this.service.editcustomer(value)
               .subscribe(
              (response:any)=>
               {
                 if(response.success == 'true')
                 {
                   this.angForm1.controls['accountName'].setValue(response.result.accountName);
                   this.angForm1.controls['accountNumber'].setValue(response.result.accountNumber);
                   this.angForm1.controls['referenceNumber'].setValue(response.result.referenceNumber);
                   this.angForm1.controls['contactName'].setValue(response.result.contactName);
                   this.angForm1.controls['email'].setValue(response.result.email);
                   this.angForm1.controls['phone'].setValue(response.result.phone);
                   this.angForm1.controls['fax'].setValue(response.result.fax);
                   this.angForm1.controls['address'].setValue(response.result.address);
                   this.angForm1.controls['billingType'].setValue(response.result.billingType);

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
           console.log('ddddddd');
           console.log(value1);
           if(!this.angForm1.valid )
           {
             return false;
           }
           value1['id'] = this.id;


           this.service.updatecustomer(value1)
              .subscribe(
            (response:any) =>
              {
                if(response.success)
                {
                  this.getcustomer(this.p);
                  this.toastr.success('Customer Updated Successfully');
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
