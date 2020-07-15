import { Router } from '@angular/router';
import { ApicallService } from './apicall.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  httpOptions;

  constructor(private http: HttpClient,
    private apiService: ApicallService,
    private router: Router 
     ) { }

  register(user: any){
    this.httpOptions = {
      headers: new HttpHeaders({
        "Content-Type":"application/json",
        'Access-Control-Allow-Origin': '*',
        Accept: '*'
      })
    };

    this.http
        .post<any>(this.apiService.hostName+`/api/register`, JSON.stringify(user), this.httpOptions
        )
        .subscribe(
          response => {
           console.log("response: " +JSON.stringify(response) );
            alert("Registered Successfully..")
            this.router.navigate(["/success/Success"]);    
          },
          error => {
            alert( 'Something went wrong!');
             return throwError ( 'Something went wrong!' ); 
          }
        );
  }
}
