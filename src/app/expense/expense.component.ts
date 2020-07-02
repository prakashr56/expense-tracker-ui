import { ExpenseService } from './../service/expense.service';
import { HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Expense } from '../model/expense';
import {NgbDate, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';


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
  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  constructor(private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private expenseService: ExpenseService,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter
    ) {
        this.fromDate = calendar.getToday();
        this.toDate = calendar.getToday();
     }

  ngOnInit() {

    this.expense = new Expense();

    this.userId = +this.activatedRoute.snapshot.paramMap.get("id");

    this.getExpenseList();

  }

  getExpenseList(){
    this.expenseService.getExpenseList(this.userId).subscribe((data:any) => {
      this.expenses = data;     
      this.filterSearch();
    });
  }

  filterSearch(){

        this.expenses = this.expenses.filter(
          m => new Date(m.createdAt) >= new Date(this.fromDate.year, this.fromDate.month-1, this.fromDate.day) 
              && new Date(m.createdAt) <= new Date(this.toDate.year, this.toDate.month-1, this.toDate.day)
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
