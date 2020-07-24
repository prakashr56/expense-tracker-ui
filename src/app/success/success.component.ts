import { catchError, map } from 'rxjs/operators';
import { ApicallService } from './../service/apicall.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  response: string;
  httpOptions;

  constructor(private activatedRoute: ActivatedRoute,
   private httpClient: HttpClient,
   private apiService: ApicallService) { }

  ngOnInit() {

   this.response = this.activatedRoute.snapshot.paramMap.get("response");

    if(!this.response.includes("Account Verified") && !this.response.includes("Something Wrong") && !this.response.includes("Success")){
      this.confirmToken();
    }

  }

  confirmToken(){  
      
     this.httpOptions = {
      headers: new HttpHeaders({
        "Content-Type":"application/json",
        'Access-Control-Allow-Origin': '*',
        Accept: '*'
      })
    };  
      
    this.httpClient
      .post<any>(this.apiService.hostName+`/api/confirm-account?token=`+this.response, this.httpOptions
      )
      .subscribe(
        data => {
          this.response = data.response;    
        },
        error => {
          alert('Something went wrong!' );
          console.log( 'Something went wrong!' );
        }
      );
  }

}
