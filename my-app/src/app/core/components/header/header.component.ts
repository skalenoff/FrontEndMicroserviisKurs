import { Component, Input, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { SessionService } from '../../../services/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userName = 'Войти';
  login: string;

  constructor(private router: Router, private oauthService : OAuthService, private sessionService : SessionService) {
    this.login = JSON.parse(localStorage.id_token_claims_obj).name;
  }

  ngOnInit() {
  }

  route(page_name : string){
      this.router.navigate([page_name]);
  }

  logout() {
    this.oauthService.logOut();
  }

}
