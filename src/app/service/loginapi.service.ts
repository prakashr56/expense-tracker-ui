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
    private router: Router
    ) { }

  loginUser(user: any){

    this.httpOptions = {
      headers: new HttpHeaders({
        "Content-Type":"application/json",
        'Access-Control-Allow-Origin': '*',
        Accept: '*'
      })
    };
      
      this.http
        .post<any>(`https://prakashr-expense-tracker-api.herokuapp.com/login/loginUser`, JSON.stringify(user), this.httpOptions
        )
        .subscribe(
          response => {
           
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
