import { Component, OnInit } from '@angular/core';
import { AppURL } from 'src/app/app.url';
import { AuthURL } from 'src/app/authentication/authentication.url';
import { IAuthSidebarComponent } from './auth-sidebar.interface';
import { IAccount, AccountService } from '../../services/account.service';
import { AuthenService } from 'src/app/services/authen.service';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-sidebar',
  templateUrl: './auth-sidebar.component.html',
  styleUrls: ['./auth-sidebar.component.css']
})
export class AuthSidebarComponent implements OnInit, IAuthSidebarComponent {

  UserLogin: IAccount;
  AppURL = AppURL;
  AuthURL = AuthURL;

  constructor(
    private account: AccountService,
    private authen: AuthenService,
    private alert: AlertService,
    private router: Router
  ) {
    this.initialLoadUserLogin();
  }

  ngOnInit() {
  }

  private initialLoadUserLogin() {
    this.account
      .getUserLogin(this.authen.getAuthenticared())
      .then(userLogin => this.UserLogin = userLogin)
      .catch(err => {
        this.alert.someting_wrong(err.Message);
        this.authen.clearAuthenticated();
        this.router.navigate(['/', AppURL.Login]);
      });
  }

}
