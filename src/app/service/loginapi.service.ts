import { Users } from './../users';
import { ApicallService } from './apicall.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginapiService {

  httpOptions;
  userId: number;

  constructor(private http: HttpClient,
    private router: Router,
    private apiService: ApicallService
    ) { }

  loginUser(user: Users){

    this.httpOptions = {
      headers: new HttpHeaders({
        "Content-Type":"application/json",
        'Access-Control-Allow-Origin': '*',
        Accept: '*'
      })
    };
      
      this.http
        .post<any>(this.apiService.hostName+`/login/loginUser`, user, this.httpOptions
        )
        .subscribe(
          response => {
           
            // alert( 'Registered successfully!' + response);

            this.userId =  Object.values(response)[0];
            
            this.router.navigate(["/user/"+this.userId+"/expense"]); 
                 
          },
          error => {
            alert( 'Something went wrong!');
            console.log( 'Something went wrong!' );                        
          }
        );
  }
}
