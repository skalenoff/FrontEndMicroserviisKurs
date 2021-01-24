import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { RestService } from 'src/app/services/rest-service.service';
import { AuthService } from 'src/app/services/auth.service';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-pricelist',
  templateUrl: './pricelist.component.html',
  styleUrls: ['./pricelist.component.css']
})
export class PricelistComponent implements OnInit {


  customer:number = 1;
  customers = [
    {
      id: 1,
      name: "Customer 1"
    },
    {
      id: 2,
      name: "Customer 2"
    },
    {
      id: 3,
      name: "Customer 3"
    },
    {
      id: 4,
      name: "Customer 4"
    },
    {
      id: 5,
      name: "Customer 5"
    }
  ]

  type:number = 1;
  types = [
    {
      id: 1,
      name: "type 1"
    },
    {
      id: 2,
      name: "type 2"
    },
    {
      id: 3,
      name: "type 3"
    },
    {
      id: 4,
      name: "type 4"
    },
    {
      id: 5,
      name: "type 5"
    }
  ]

  constructor(private http: HttpClient, private restService : RestService, private authService : OAuthService) { }

  ngOnInit(): void {
  }


  getFruits(){
    this.restService.doGet('/api/users/me')
  }

  postFruits(){
    const params = this.authService.getAccessToken;
    this.restService.doGet('/api/admin');
  }

  logCustomerAndType(){
    console.log(this.customer, " | " ,this.type)
  }
}
