import { ExpenseService } from './../service/expense.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Expense } from '../model/expense';



@Component({
  selector: 'app-addexpense',
  templateUrl: './addexpense.component.html',
  styleUrls: ['./addexpense.component.css']
})
export class AddexpenseComponent implements OnInit {

  expense: Expense ;
  userId: number;
  expenseId: number;
  httpOptions;

  constructor(private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private expenseService: ExpenseService
    ) { }

  ngOnInit() {

    this.userId = +this.activatedRoute.snapshot.paramMap.get("userId");

    this.expenseId = +this.activatedRoute.snapshot.paramMap.get("expenseId");

    if(this.expenseId === 0){
      this.expense = new Expense();
      this.expense.userId = this.userId;   
    }
    else{
      this.getExpense()
    } 
  }

  getExpense(){
    this.expenseService.getExpense(this.expenseId).subscribe((data:any) => {
      this.expense = data;      
      this.expense.createdAt = new Date(+this.expense.createdAt).toJSON().split("T")[0] ;
    });
  }

  addExpense(){  

    this.expenseService.addExpense(this.expense, this.userId);

  }

}
