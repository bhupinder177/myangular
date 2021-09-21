import { Component, OnInit } from '@angular/core';
import { FormArray , FormControl , FormBuilder, FormGroup , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders }    from '@angular/common/http';
import { DashboardService } from '../../services/dashboard.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router,private fb: FormBuilder,private http: HttpClient,private service: DashboardService,private toastr: ToastrService)
  {
  }

  ngOnInit() {
  }

  logout()
  {
    this.service.logout()
       .subscribe(
     (response:any) =>
       {
         if(response.success == "true")
         {
           this.toastr.clear();
           this.toastr.success(response.message, 'Redirecting...');
          localStorage.setItem('AppToken','');
            setTimeout((router: Router) => {
          this.router.navigate(['/']);
            }, 1000);

         }
         else if(response.success == "false")
         {
           this.toastr.clear();
           this.toastr.success(response.message, 'Redirecting...');
         }
       },
       error =>
        {

       });

  }

}
