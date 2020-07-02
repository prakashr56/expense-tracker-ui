import { ExpenseService } from './../service/expense.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Expense } from '../model/expense';
import {NgbDateStruct, NgbDate, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';


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
  // model: NgbDateStruct;
  date: NgbDate | null;


  constructor(private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private expenseService: ExpenseService,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter
    ) {
      
     }

  ngOnInit() {

    this.userId = +this.activatedRoute.snapshot.paramMap.get("userId");

    this.expenseId = +this.activatedRoute.snapshot.paramMap.get("expenseId");

    if(this.expenseId === 0){
      this.expense = new Expense();
      this.expense.userId = this.userId;   
      this.date = this.calendar.getToday();
    }
    else{
      this.getExpense()
    } 
  }

  getExpense(){
    this.expenseService.getExpense(this.expenseId).subscribe((data:any) => {
      this.expense = data;      
      this.expense.createdAt = new Date(+this.expense.createdAt).toJSON().split("T")[0] ;
      // new Date(+this.expense.createdAt).toJSON().split("T")[0];
      let tempDate = new Date(+this.expense.createdAt);
      
      // this.date =  this.formatter.format(this.expense.createdAt);
    });
  }

  addExpense(){  

    // Date Parse
    this.expense.createdAt = Date.parse(this.date.day+"-"+this.date.month+"-"+this.date.year);
    alert(this.date.day+"-"+this.date.month+"-"+this.date.year);
    return;

    this.expenseService.addExpense(this.expense, this.userId);
  }

  deleteExpense(){

      this.expenseService.deleteExpense(this.expenseId, this.userId);

  }

}
