import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders }    from '@angular/common/http';
import { authServices } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
// import { NgxSpinnerService } from "ngx-spinner";



@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  angForm: FormGroup;
  submitted = false;
  loader = 0;

  constructor(private router:Router,private fb: FormBuilder,private http: HttpClient,private service: authServices,private toastr: ToastrService) {
    this.angForm = this.fb.group({
        email: ['', [Validators.email,Validators.required] ]
      });
  }

  ngOnInit() {
  }


    formSubmit()
    {
      this.submitted = true;

      if(!this.angForm.valid)
      {
        return false;
      }

    // this.Spinner.show();
    this.loader = 1;

     this.service.forgotpassword(this.angForm.value)
        .subscribe(
      (response:any) =>
        {
          this.loader = 0; 
          // this.Spinner.hide();
          if(response.success == "true")
          {
            this.toastr.clear();
            this.toastr.success(response.message, 'Redirecting...');

           //localStorage.setItem('AppId',response.data.userId);
           localStorage.setItem('AppToken',response.access_token);

             setTimeout((router: Router) => {
           this.router.navigate(['/']);
             }, 1000);

          }
          else if(response.success == "false")
          {
            this.toastr.clear();
            this.toastr.error(response.message, 'Error');

          }
        },
        error =>
         {
           this.toastr.clear();
           this.toastr.error('Invalid Email and Password',"Error");

        });
      }

}
