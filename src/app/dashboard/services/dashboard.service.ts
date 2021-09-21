import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'
// import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
// import 'rxjs/add/operator/catch';
 import { map} from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  constructor(private http: HttpClient) { }

  //base_url:string = 'http://localhost/taxi/public/api/auth/';
   base_url:string = 'https://web.taxioffice.ca/api/auth/';

  logout()
  {
    const httpOptions = {
         headers: new HttpHeaders({
           'Content-Type': 'application/json',
           'X-Requested-With':'XMLHttpRequest',
           'Authorization':'Bearer '+localStorage.getItem('AppToken')
        }),
     };
   return this.http.get(this.base_url+'logout', httpOptions);
  }

  changePassword(data)
  {
    const httpOptions = {
         headers: new HttpHeaders({
           'Content-Type': 'application/json',
           'X-Requested-With':'XMLHttpRequest',
           'Authorization':'Bearer '+localStorage.getItem('AppToken')
        }),
     };
      let body = JSON.stringify(data);
    return this.http.post(this.base_url+'changePassword',body,httpOptions);
  }

  getdriver(data)
    {
      const httpOptions = {
           headers: new HttpHeaders({
             'Content-Type': 'application/json',
             'X-Requested-With':'XMLHttpRequest',
             'Authorization':'Bearer '+localStorage.getItem('AppToken')

          }),
       };
    return this.http.get(this.base_url+'getdriver?page='+data, httpOptions);
    }

     adddriver(data)
    {
      const httpOptions = {
           headers: new HttpHeaders({
             'Content-Type': 'application/json',
             'X-Requested-With':'XMLHttpRequest',
             'Authorization':'Bearer '+localStorage.getItem('AppToken')

          }),
       };
       let body = JSON.stringify(data);

    return this.http.post(this.base_url+'driverSave/',body, httpOptions);
    }

    deletedriver(data)
   {
     const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'X-Requested-With':'XMLHttpRequest',
            'Authorization':'Bearer '+localStorage.getItem('AppToken')

         }),
      };
      let body = JSON.stringify(data);

     return this.http.post(this.base_url+'driverDelete/',body, httpOptions);
   }

    editdriver(data)
   {
     const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'X-Requested-With':'XMLHttpRequest',
            'Authorization':'Bearer '+localStorage.getItem('AppToken')

         }),
      };
      let body = JSON.stringify(data);
   return this.http.post(this.base_url+'driverEdit/',body, httpOptions);
   }

   updatedriver(data)
   {
     const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'X-Requested-With':'XMLHttpRequest',
            'Authorization':'Bearer '+localStorage.getItem('AppToken')

         }),
      };
      let body = JSON.stringify(data);
     return this.http.post(this.base_url+'driverUpdate/',body, httpOptions);
   }

   driverupload(fileToUpload: any , type: any)
	{
		let input 	= new FormData();
		//let headers = new HttpHeaders();
     const headers = new HttpHeaders();
     headers.append('Content-Type','multipart/form-data');
     headers.append('X-Requested-With', 'XMLHttpRequest');
		input.append("file", fileToUpload);
    input.append("type", type);
		return this.http.post(this.base_url+'driverImage/',input,{ headers });
	}

   bdclupload(fileToUpload: any , type: any)
	{
    const headers = new HttpHeaders();
    headers.append('Content-Type','multipart/form-data');
    headers.append('X-Requested-With', 'XMLHttpRequest');
		let input 	= new FormData();
		//let headers = new HttpHeaders();
		input.append("file", fileToUpload);
    input.append("type", type);
		return this.http.post(this.base_url+'bdclImage/',
    input,
     { headers });
	}

  getdashboard()
    {
      const httpOptions = {
           headers: new HttpHeaders({
             'Content-Type': 'application/json',
             'X-Requested-With':'XMLHttpRequest',
             'Authorization':'Bearer '+localStorage.getItem('AppToken')

          }),
       };
    return this.http.get(this.base_url+'getdashboarddata', httpOptions);
    }


    //****************** vehicle services**************************
    getvehicle(data)
      {
        const httpOptions = {
             headers: new HttpHeaders({
               'Content-Type': 'application/json',
               'X-Requested-With':'XMLHttpRequest',
               'Authorization':'Bearer '+localStorage.getItem('AppToken')

            }),
         };
      return this.http.get(this.base_url+'getvehicle?page='+data, httpOptions);
      }

      addvehicle(data)
     {
       const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'X-Requested-With':'XMLHttpRequest',
              'Authorization':'Bearer '+localStorage.getItem('AppToken')

           }),
        };
        let body = JSON.stringify(data);
     return this.http.post(this.base_url+'vehicleSave/',body, httpOptions);
    }


        deletevehicle(data)
       {
         const httpOptions = {
              headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'X-Requested-With':'XMLHttpRequest',
                'Authorization':'Bearer '+localStorage.getItem('AppToken')

             }),
          };
          let body = JSON.stringify(data);

         return this.http.post(this.base_url+'vehicleDelete/',body, httpOptions);
       }

       editvehicle(data)
       {
         const httpOptions = {
              headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'X-Requested-With':'XMLHttpRequest',
                'Authorization':'Bearer '+localStorage.getItem('AppToken')

             }),
          };
          let body = JSON.stringify(data);


       return this.http.post(this.base_url+'vehicleEdit/',body, httpOptions);
       }

       updatevehicle(data)
       {
         const httpOptions = {
              headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'X-Requested-With':'XMLHttpRequest',
                'Authorization':'Bearer '+localStorage.getItem('AppToken')

             }),
          };
          let body = JSON.stringify(data);
          console.log(body);
         return this.http.post(this.base_url+'vehicleUpdate/',body, httpOptions);
       }

    //****************** vehicle services**************************

    //****************** customer services**************************
    getcustomer(data)
      {
        const httpOptions = {
             headers: new HttpHeaders({
               'Content-Type': 'application/json',
               'X-Requested-With':'XMLHttpRequest',
               'Authorization':'Bearer '+localStorage.getItem('AppToken')

            }),
         };
      return this.http.get(this.base_url+'getcustomer?page='+data, httpOptions);
      }


          deletecustomer(data)
         {
           const httpOptions = {
                headers: new HttpHeaders({
                  'Content-Type': 'application/json',
                  'X-Requested-With':'XMLHttpRequest',
                  'Authorization':'Bearer '+localStorage.getItem('AppToken')

               }),
            };
            let body = JSON.stringify(data);

           return this.http.post(this.base_url+'customerDelete/',body, httpOptions);
         }

         editcustomer(data)
        {
          const httpOptions = {
               headers: new HttpHeaders({
                 'Content-Type': 'application/json',
                 'X-Requested-With':'XMLHttpRequest',
                 'Authorization':'Bearer '+localStorage.getItem('AppToken')

              }),
           };
           let body = JSON.stringify(data);
        return this.http.post(this.base_url+'customerEdit/',body, httpOptions);
        }

        addcustomer(data)
       {
         const httpOptions = {
              headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'X-Requested-With':'XMLHttpRequest',
                'Authorization':'Bearer '+localStorage.getItem('AppToken')

             }),
          };
          let body = JSON.stringify(data);

       return this.http.post(this.base_url+'customerSave/',body, httpOptions);
       }

       updatecustomer(data)
      {
        const httpOptions = {
             headers: new HttpHeaders({
               'Content-Type': 'application/json',
               'X-Requested-With':'XMLHttpRequest',
               'Authorization':'Bearer '+localStorage.getItem('AppToken')

            }),
         };
         let body = JSON.stringify(data);

      return this.http.post(this.base_url+'customerUpdate/',body, httpOptions);
      }
      //****************** customer services**************************

}
