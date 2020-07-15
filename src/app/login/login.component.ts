import { Users } from './../users';
import { LoginapiService } from './../service/loginapi.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: any = {};
  
  constructor(private loginService: LoginapiService
    ) { }

  ngOnInit() {
  }

  loginUser(user: Users){
    // alert(user.email)
    // return;
    this.loginService.loginUser(user);
  }

}
