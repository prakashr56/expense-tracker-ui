import { ExpenseService } from './../service/expense.service';
import { HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Expense } from '../model/expense';
import {NgbDate, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { DateRange } from 'moment-range';


@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  expenses: Expense[];
  expense: Expense;
  userId: number;
  httpOptions;
  filterName: string = "";
  filterText: string ="";

  date1: string = Date.now().toString();
  date2: string;
  date = new Date();

  constructor(private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private expenseService: ExpenseService,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter
    ) {
  
     }

  ngOnInit() {

    this.expense = new Expense();

    this.userId = +this.activatedRoute.snapshot.paramMap.get("id");

    this.getExpenseList();

    this.filterName = "createdAt";

    this.date1  = new Date(this.date.getFullYear(), this.date.getMonth(), 2).toJSON().split("T")[0] ;

    this.date2  = new Date().toJSON().split("T")[0] ;
  }

  getExpenseList(){
    this.expenseService.getExpenseList(this.userId).subscribe((data:any) => {
      this.expenses = data;     
      this.filterSearch();
    });
  }

  filterSearch(){

        this.expenses = this.expenses.filter(
          m => new Date(m.createdAt) >= new Date(this.date1) && new Date(m.createdAt) <= new Date(this.date2)
        );
      
       if(this.filterText || 0 <= this.filterText.length){

          this.expenses = this.expenses.filter(e => e.description.includes(this.filterText)
               || e.amount.includes(this.filterText));
        }

        return this.expenses.sort((val1, val2)=> {

          if(this.filterName === "amount"){
            return (val2.amount) - (val1.amount);
              
          }
          return (val2.createdAt) - (val1.createdAt);
         
          });     
  }


}
