import { Component, OnInit } from '@angular/core';
import { AbstractControl,FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders }    from '@angular/common/http';
import { authServices } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

declare var jQuery: any;

function passwordMatcher( c : AbstractControl )
{

	  return c.get('userPassword').value === c.get('confirmuserPassword').value
	 	? null : { 'nomatch' : true };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

      angForm: FormGroup;
      submitted = false;
      matched = false;
  constructor(private router:Router,private fb: FormBuilder,private http: HttpClient,private service: authServices,private toastr: ToastrService)
  {
    this.angForm = this.fb.group({
        userEmail: ['', [Validators.email,Validators.required] ],
        userName: ['', Validators.required ],
        fullName: ['', Validators.required ],
        account : this.fb.group({
  				userPassword : ['',[Validators.required]],
  				confirmuserPassword : ['',[Validators.required]],
  			},
  			{validator:passwordMatcher})
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
    this.toastr.info('loading', 'info');

   this.service.register(this.angForm.value)
      .subscribe(
    (response:any) =>
      {
        if(response.success)
        {
					 this.submitted = false;
          this.toastr.clear();
          this.toastr.success(response.message, 'Redirecting...');
           setTimeout((router: Router) => {
         this.router.navigate(['login']);
           }, 1000);

        }
        else if(response.error)
        {
         this.toastr.clear();

          this.toastr.error(response.message, 'Error');

        }
      },
      error =>
       {
         this.toastr.clear();
         this.toastr.error('Invalide Email & Password');

      });
    }

}
