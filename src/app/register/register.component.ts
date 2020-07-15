import { Users } from './../users';
import { RegisterService } from './../service/register.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup  } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: Users = new Users();
  // user: any = {};
  public frmSignup: FormGroup;

  constructor(private http: HttpClient, 
    private router: Router,
    private registerService: RegisterService
    ) {
     }

  ngOnInit() {
  }

  register(){

    this.registerService.register(this.user);
  }


}
