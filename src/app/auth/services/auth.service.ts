import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';


// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Requested-With':'XMLHttpRequest'
 }),
};

@Injectable({
  providedIn: 'root'
})

export class authServices {

  constructor(private http: HttpClient) { }

   base_url:string = 'https://web.taxioffice.ca/api/auth/';
   //base_url:string = 'http://127.0.0.1:8000/api/auth/';

   login(data)
    {
    let body = JSON.stringify(data);
    return this.http.post(this.base_url+'adminlogin',body, httpOptions);
    }

     forgotpassword(data)
    {
    let body = JSON.stringify(data);
    return this.http.post(this.base_url+'forgetPassword',body, httpOptions);
    }

    register(data)
   {
   let body = JSON.stringify(data);
   return this.http.post(this.base_url+'register',body, httpOptions);
   }

}
