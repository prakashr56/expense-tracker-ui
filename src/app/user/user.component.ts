import { Users } from './../users';
import { ApicallService } from './../service/apicall.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from "@angular/common/http";
import { from, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: Users[];

  user: any = {};
  httpOptions;
  constructor(private htttp: HttpClient, private apiService: ApicallService, private router: Router) { }

  ngOnInit() {
    
    this.getUserList();
  }

  logout(){
    this.router.navigate(["/login"]);
  }

  addExpense(){
    this.router.navigate(["/expense"]);
  }

  getUserList(){
    this.apiService.getUsers().subscribe((data:any) => {
      console.log("data2: " + data);
      this.users = JSON.parse(data);
    });
  }

  createUser(){
    //this.apiService.createUsers(this.user).subscribe((res)=>{});
    this.httpOptions = {
      headers: new HttpHeaders({
        "Content-Type":"application/json",
        'Access-Control-Allow-Origin': '*',
        Accept: '*'
      })
    };
      
      this.htttp
        .post<any>(`https://prakashr-expense-tracker-api.herokuapp.com/api/save`, JSON.stringify(this.user), this.httpOptions
        )
        .subscribe(
          response => {
           console.log("response: " + response);
          //  return JSON.parse(JSON.stringify(response));
          },
          error => {
            // return throwError ( 'Something went wrong!' );
            console.log( 'Something went wrong!' );
            
          },
          () => {}
        );
  }
}
