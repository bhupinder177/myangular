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
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {
  permitExpiryDatePickerValue = new Date().getDate() + "-" + new Date().getMonth()+"-" +new Date().getFullYear();
  hdp = new Date().getDate() + "-" + new Date().getMonth()+"-" +new Date().getFullYear();
  ledp = new Date().getDate() + "-" + new Date().getMonth()+"-" +new Date().getFullYear();
  angForm: FormGroup;
  angForm1: FormGroup;
  loader = 0;
  listing =[];
  viewdata = [];
  p: number = 1;
  totalItem =0;
  start = 1;
  values = {};
  deleteid = '';
  submitted = false;
  id ='';
  showImageUploading : boolean = false;
  showImageUploadingbdcl : boolean = false;
  driverPic = '';
  bdclPic = '';
  showImageUploading1 : boolean = false;
  showImageUploadingbdcl1 : boolean = false;
  driverPic1 = '';
  bdclPic1 = '';
  Url ='';
  @ViewChild('fileInput',{static:false}) fileInput: ElementRef;
  @ViewChild('fileInput1',{static:false}) fileInput1: ElementRef;
  @ViewChild('fileInput2',{static:false}) fileInput2: ElementRef;
  @ViewChild('fileInput3',{static:false}) fileInput3: ElementRef;

  constructor(private router:Router,private fb: FormBuilder,private http: HttpClient,private service: DashboardService,private toastr: ToastrService)
  {
    this.angForm = this.fb.group({
       driverId: ['', [Validators.required] ],
       permitExpiryDate: ['', [Validators.required] ],
       licenceNo: ['', [Validators.required] ],
       licenceExpiryDate: ['', [Validators.required] ],
       driverImage: ['', [Validators.required] ],
       bcdl: ['', [Validators.required] ],
       hiringDate: ['', [Validators.required] ],
       firstName: ['', [Validators.required] ],
       lastName: ['', Validators.required ],
       email: ['', [Validators.email,Validators.required] ],
    });

    this.angForm1 = this.fb.group({
       driverId: ['', [Validators.required] ],
       permitExpiryDate: ['', [Validators.required] ],
       licenceNo: ['', [Validators.required] ],
       licenceExpiryDate: ['', [Validators.required] ],
       driverImage: ['', [Validators.required] ],
       bcdl: ['', [Validators.required] ],
       hiringDate: ['', [Validators.required] ],
       firstName: ['', [Validators.required] ],
       lastName: ['', Validators.required ],
       email: ['', [Validators.email,Validators.required] ],
    });
  }




  ngOnInit()
  {
    this.Url = myGlobals.baseUrl;
    this.getdriver(this.p);
    if (jQuery(window).width() <= 800)
     {
       jQuery('.hamburger hamburger--htla').removeClass('is-active');
       jQuery('html').css("overflow", "auto");
       jQuery('body').removeClass('menu-left-opened');
     }
  }


    getdriver(e)
  {
     this.service.getdriver(e)
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

      this.service.adddriver(value)
         .subscribe(
       (response:any) =>
         {
           if(response.success == "true")
           {
             this.loader = 0;
             this.getdriver(this.p);
             this.toastr.success(response.message);

             jQuery('.img').val('');

            jQuery('#myModal').modal('hide');
            this.angForm = this.fb.group({
               driverId: ['', [Validators.required] ],
               permitExpiryDate: ['', [Validators.required] ],
               licenceNo: ['', [Validators.required] ],
               licenceExpiryDate: ['', [Validators.required] ],
               driverImage: ['', [Validators.required] ],
               bcdl: ['dsad', [Validators.required] ],
               hiringDate: ['', [Validators.required] ],
               firstName: ['', [Validators.required] ],
               lastName: ['', Validators.required ],
               email: ['', [Validators.email,Validators.required] ],
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

    // upload pic
  updateProfileimage()
{

let fi = this.fileInput.nativeElement;
if (fi.files && fi.files[0])
{
 this.showImageUploading	= true;
 let fileToUpload = fi.files[0];

 if (fileToUpload.type.indexOf('image') === -1)
 {
   this.showImageUploading	= false;
 }
  this.service.driverupload(fileToUpload,'client').subscribe(
 (response:any) =>
   {
     if(response.success == "true")
     {
       this.driverPic 	= response.fileName;
       console.log(this.driverPic);
       this.angForm.controls['driverImage'].setValue(response.fileName);
     }
   },
   error =>
    {


   });
}
}
  // upload pic
    // upload pic11111
  updateProfileimage1()
{

let fi = this.fileInput2.nativeElement;
if (fi.files && fi.files[0])
{
 this.showImageUploading	= true;
 let fileToUpload = fi.files[0];

 if (fileToUpload.type.indexOf('image') === -1)
 {
   this.showImageUploading1	= false;
 }
  this.service.driverupload(fileToUpload,'client').subscribe(
 (response:any) =>
   {
     if(response.success == "true")
     {
       this.driverPic1 	= response.fileName;
       this.angForm1.controls['driverImage'].setValue(response.fileName);
     }
   },
   error =>
    {


   });
}
}
  // upload pic

    // upload pic
  bdclProfileimage()
{

let fi = this.fileInput1.nativeElement;
if (fi.files && fi.files[0])
{
 this.showImageUploadingbdcl	= true;
 let fileToUpload = fi.files[0];

 if (fileToUpload.type.indexOf('image') === -1)
 {
   this.showImageUploadingbdcl	= false;
 }
  this.service.bdclupload(fileToUpload,'client').subscribe(
 (response:any) =>
   {
     if(response.success == "true")
     {
       this.bdclPic 	= response.fileName;
       this.angForm.controls['bcdl'].setValue(response.fileName);
     }
   },
   error =>
    {


   });
}
}
  // upload pic

    // upload pic11111111111
  bdclProfileimage1()
{

let fi = this.fileInput3.nativeElement;
if (fi.files && fi.files[0])
{
 this.showImageUploadingbdcl1	= true;
 let fileToUpload = fi.files[0];

 if (fileToUpload.type.indexOf('image') === -1)
 {
   this.showImageUploadingbdcl1	= false;
 }
  this.service.bdclupload(fileToUpload,'client').subscribe(
 (response:any) =>
   {
     if(response.success == "true")
     {
       this.bdclPic1 	= response.fileName;
       this.angForm1.controls['bcdl'].setValue(response.fileName);
     }
   },
   error =>
    {


   });
}
}
  // upload pic  11



      delete (id)
      {
        jQuery("#Delete").modal('show');
        this.id = id;
      }


      deleterecord()
    {
      var value = {};
      value['id'] = this.id;
     this.service.deletedriver(value)
         .subscribe(
        (response:any)=>
         {
           if(response.success == 'true')
           {
             jQuery("#Delete").modal('hide');
             this.toastr.success('Driver Deleted Successfully');
             this.getdriver(this.p);

           }
           else
           {
             jQuery("#Delete").modal('hide');

             this.toastr.error('Employee IS Not Deleted');
          }
        },
         error =>
          {
            this.toastr.error('Inertnal server error');
          });
     }



     // edit
     edit (id)
     {
       var value = {};
       value['id'] = id;
       this.id = id;
       this.service.editdriver(value)
           .subscribe(
          (response:any)=>
           {
             if(response.success == 'true')
             {
               this.driverPic1 = response.result.driver_info.driverImage;
               this.bdclPic1 = response.result.driver_info.bcdl;
               // this.hdp = response.result.driver_info.hiringDate;
               // this.ledp = response.result.driver_info.licenceExpiryDate;
               // this.permitExpiryDatePickerValue = response.result.driver_info.permitExpiryDate;
               this.angForm1.controls['driverId'].setValue(response.result.driver_info.driverId);
               this.angForm1.controls['permitExpiryDate'].setValue(response.result.driver_info.permitExpiryDate);
               this.angForm1.controls['licenceNo'].setValue(response.result.driver_info.licenceNo);
               this.angForm1.controls['licenceExpiryDate'].setValue(response.result.driver_info.licenceExpiryDate);
               this.angForm1.controls['driverImage'].setValue(response.result.driver_info.driverImage);
               this.angForm1.controls['bcdl'].setValue(response.result.driver_info.bcdl);
               this.angForm1.controls['hiringDate'].setValue(response.result.driver_info.hiringDate);
               this.angForm1.controls['firstName'].setValue(response.result.firstName);
               this.angForm1.controls['lastName'].setValue(response.result.lastName);
               this.angForm1.controls['email'].setValue(response.result.email);

               jQuery("#edit").modal('show');

             }
          },
           error =>
            {
              this.toastr.error('Inertnal server error');
            });
     }
     // edit

     // view
     view(id)
     {
       var value = {};
       value['id'] = id;
       this.service.editdriver(value)
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

     // update
     update(value1:any)
     {
       this.submitted = true;

       if(!this.angForm1.valid )
       {
         return false;
       }
       value1['id'] = this.id;
       var date = jQuery('.permit1').val();
       value1['permitExpiryDate'] = date;
       var date1 = jQuery('.licence1').val();
       value1['licenceExpiryDate'] = date1;
       var date2 = jQuery('.hiring1').val();
       value1['hiringDate'] = date2;



       this.service.updatedriver(value1)
          .subscribe(
        (response:any) =>
          {
            if(response.success)
            {
              this.getdriver(this.p);
              this.toastr.success('Driver Updated Successfully');
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
