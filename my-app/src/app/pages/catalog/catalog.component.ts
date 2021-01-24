import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  public isAdmin : boolean;
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
  constructor(private oauthService : AuthService) {
    this.isAdmin = oauthService.isAdmin();
  }

  ngOnInit(): void {
  }

  logCustomerAndType(){
    console.log(this.customer, " | " ,this.type)
  }
}
