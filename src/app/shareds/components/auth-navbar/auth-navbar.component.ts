import { Component, OnInit } from '@angular/core';
import { AppURL } from 'src/app/app.url';
import { AuthURL } from 'src/app/authentication/authentication.url';
import { Router } from '@angular/router';
import { AuthenService } from 'src/app/services/authen.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-auth-navbar',
  templateUrl: './auth-navbar.component.html',
  styleUrls: ['./auth-navbar.component.css']
})
export class AuthNavbarComponent implements OnInit {
  AppURL = AppURL;
  AuthURL = AuthURL;

  constructor(
    private router: Router,
    private authen: AuthenService,
    private alert: AlertService
  ) { }

  ngOnInit() {
  }

  onLogout() {
    this.authen.clearAuthenticated();
    this.router.navigate(['/', AppURL.Login]);
    this.alert.someting_wrong('ออกจากระบบสำเร็จ', 'info');
  }

}
