import { AddexpenseComponent } from './addexpense/addexpense.component';
import { ExpenseComponent } from './expense/expense.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';


const routes: Routes = [
  { path: 'user', component: UserComponent },
  { path: 'user/:id/expense', component: ExpenseComponent },
  { path: 'user/:userId/expense/:expenseId', component: AddexpenseComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'register',  component: RegisterComponent },
  { path: 'expense',  component: ExpenseComponent },
  { path: '', redirectTo:'/login', pathMatch:'full' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
