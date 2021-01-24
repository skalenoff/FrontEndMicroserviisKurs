import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public login: string;
  public isAdmin: boolean;
  public isBuyer: boolean;
  public isCustomer: boolean;
  constructor(private router: Router, private oauthService : AuthService) {
    this.login = oauthService.getLogin();
    this.isAdmin = oauthService.isAdmin();
    this.isBuyer = oauthService.isBuyer();
    this.isCustomer = oauthService.isCustomer();
  }

  ngOnInit() {
  }

  route(page_name : string){
      this.router.navigate([page_name]);
  }

  logout() {
    this.oauthService.logout();
  }
  
}
