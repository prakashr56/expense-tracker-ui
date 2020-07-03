import { ExpenseService } from './../service/expense.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Expense } from '../model/expense';
import {NgbDateStruct, NgbDate, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';


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
  dateMoment = moment();

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
      this.expense.createdAt = this.dateMoment.format('YYYY-DD-MM');
      
      // this.date = this.calendar.getToday();
    }
    else{
      this.getExpense()
    } 


    let now = moment(); // add this 2 of 4
    console.log('hello world', now.format()); // add this 3 of 4
    console.log(now.add(7, 'days').format()); // add this 4of 4
  }

  getExpense(){
    this.expenseService.getExpense(this.expenseId).subscribe((data:any) => {
      this.expense = data;      
      // this.expense.createdAt = new Date(+this.expense.createdAt).toJSON().split("T")[0] ;

      this.expense.createdAt =  moment(this.expense.createdAt).format('YYYY-DD-MM');
    });
  }

  addExpense(){  

    // Date Parse
    // this.expense.createdAt = Date.parse(this.date.day+"-"+this.date.month+"-"+this.date.year);
  
    this.expenseService.addExpense(this.expense, this.userId);
  }

  deleteExpense(){

      this.expenseService.deleteExpense(this.expenseId, this.userId);
  }

}
