import { Router } from '@angular/router';
import { Expense } from './../model/expense';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  httpOptions;

  constructor(private httpClient: HttpClient,
    private router: Router
    ) { }

  getExpenseList(userId: number) {
    return this.httpClient.get("http://localhost:8080/expense/"+userId).
        pipe(
           map((data: Expense[]) => {
             console.log("ExpenseData:  "+ JSON.stringify(data));
             
             return data;
           }), catchError( error => {
             return throwError( 'Something went wrong!' );
           })
        )
    }

    getExpense(id: number) {
      return this.httpClient.get("http://localhost:8080/expense/userexpense/"+id).
          pipe(
             map((data: Expense[]) => {
               console.log("expense data "+ JSON.stringify(data));
               
               return data;
             }), catchError( error => {
               return throwError( 'Something went wrong!' );
             })
          )
      }

      addExpense(expense: Expense, userId: number){  

        // expense.createdAt = Date.parse(expense.createdAt);
    
        this.httpOptions = {
          headers: new HttpHeaders({
            "Content-Type":"application/json",
            'Access-Control-Allow-Origin': '*',
            Accept: '*'
          })
        };  
          
        this.httpClient
          .post<any>(`http://localhost:8080/expense/save`, JSON.stringify(expense), this.httpOptions
          )
          .subscribe(
            response => {
              console.log("response: " + response);
              this.router.navigate(["/user/"+userId+"/expense"]);     
            },
            error => {
              alert('Something went wrong!' );
              console.log( 'Something went wrong!' );
                
            }
          );
      }

      deleteExpense(expenseId: number, userId: number){  
    
        this.httpOptions = {
          headers: new HttpHeaders({
            "Content-Type":"application/json",
            'Access-Control-Allow-Origin': '*',
            Accept: '*'
          })
        };  
          
        this.httpClient
          .delete<any>(`http://localhost:8080/expense/delete/`+expenseId, this.httpOptions
          )
          .subscribe(
            response => {
              console.log("response: " + response);
              this.router.navigate(["/user/"+userId+"/expense"]);     
            },
            error => {
              alert('Something went wrong!' );
              console.log( 'Something went wrong!' );
                
            }
          );
      }

}
