import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ExpenseComponent } from './expense/expense.component';
import { AddexpenseComponent } from './addexpense/addexpense.component';
import { NgbModule  } from '@ng-bootstrap/ng-bootstrap';
import { SuccessComponent } from './success/success.component';
import { ConfirmEqualValidatorDirective } from './directives/confirm-equal-validator.directive';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    ExpenseComponent,
    AddexpenseComponent,
    SuccessComponent,
    ConfirmEqualValidatorDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
