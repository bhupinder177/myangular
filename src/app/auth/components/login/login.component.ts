import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders }    from '@angular/common/http';
import { authServices } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  angForm: FormGroup;
  submitted = false;
    loader = 0;

  constructor(private router:Router,private fb: FormBuilder,private http: HttpClient,private service: authServices,private toastr: ToastrService)
  {
    this.angForm = this.fb.group({
        email: ['', [Validators.email,Validators.required] ],
        password: ['', Validators.required ],
        type: ['1']
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
  //  this.toastr.info('loading', 'info');
    this.loader = 1;

   this.service.login(this.angForm.value)
      .subscribe(
    (response:any) =>
      {
        this.loader = 0;
        if(response.success == "true")
        {
          this.toastr.clear();
          this.toastr.success(response.message, 'Redirecting...');

         //localStorage.setItem('AppId',response.data.userId);
         localStorage.setItem('AppToken',response.access_token);
         localStorage.setItem('AppId',response.id);

           setTimeout((router: Router) => {
         this.router.navigate(['dashboard']);
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
         this.toastr.error('Server Errors',"Error");

      });
    }
}
