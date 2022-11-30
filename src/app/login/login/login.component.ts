import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  userName: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  onSubmit() {
    //validatie toevoegen voor login name: mag niet "currentUserName" of "personalKey" zijn!!!
    this.loginService.login(this.userName)
    //this.router.navigateByUrl("/game")
  }



}
