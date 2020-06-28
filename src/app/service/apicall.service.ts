import { Users } from './../users';
import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { HttpHeaders, HttpClient } from "@angular/common/http";

import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { error } from 'util';
import { Expense } from '../model/expense';

@Injectable({
  providedIn: 'root'
})
export class ApicallService {

  constructor( private httpClient: HttpClient) { }
  getUsers() {
    return this.httpClient.get(`http://localhost:8080/api/userList`).
        pipe(
           map((data: Users[]) => {
             console.log("data "+ JSON.stringify(data));
             
             return JSON.stringify(data);
           }), catchError( error => {
             return throwError( 'Something went wrong!' );
           })
        )
    }

     

    createUsers(user: Users[]){
      return this.httpClient.post(`http://localhost:8080/api/save`, user)
      .pipe(map((data: any) => {
        return JSON.parse(JSON.stringify(data));
      }),
      catchError( error => {
          return throwError ('Something went wrong!');
      })
      )      
    }



}
