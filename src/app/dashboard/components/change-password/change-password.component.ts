import { Component, OnInit } from '@angular/core';
import { AbstractControl,FormArray , FormControl , FormBuilder, FormGroup , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders }    from '@angular/common/http';
import { DashboardService } from '../../services/dashboard.service';
import { ToastrService } from 'ngx-toastr';


declare var jQuery: any;

function passwordMatcher( c : AbstractControl )
{
	return c.get('password').value === c.get('password_confirmation').value
		? null : { 'nomatch' : true };
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  angForm: FormGroup;
  submitted = false;
  matched = false;
  constructor(private router:Router,private fb: FormBuilder,private http: HttpClient,private service: DashboardService,private toastr: ToastrService)
  {
    this.angForm = this.fb.group({
        account : this.fb.group({
  				password : ['',[Validators.required]],
  				password_confirmation : ['',[Validators.required]],
  			},
  			{validator:passwordMatcher})
        });
   }

  ngOnInit() {
  }

  formSubmit(value:any)
 {
    value['id'] = localStorage.getItem("AppId");
    this.submitted = true;
    if( !this.angForm.valid )
    {
      return false;
    }

   this.toastr.info('loading', 'info');
   this.service.changePassword(value)
      .subscribe(
    (response:any) =>
      {
        if(response.success == "true")
        {
           this.toastr.clear();
           this.toastr.success('Password Changed Successfully', 'Redirecting...');
           this.angForm = this.fb.group({
             account : this.fb.group({
               password : ['',[Validators.required]],
               password_confirmation : ['',[Validators.required]],
             },
             {validator:passwordMatcher})
             });
           this.submitted = false;
           this.matched = false;


        }
        else if(response.success == "true")
        {
          this.toastr.clear();

           this.toastr.error('Password is not Changed', 'Error');

        }
      },
      error =>
       {
         this.toastr.clear();
         this.toastr.error('Server error');

      });
    }

}
