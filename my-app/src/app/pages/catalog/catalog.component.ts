import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  redact: boolean = false;
  public isAdmin : boolean;


  customers: Customer[] = [
    {
      name: "Customer 1"
    },
    {
      name: "Customer 2"
    }
  ]
  customer: Customer = this.customers[0];

  types: Type[] = [
    {
      name: "type 1"
    },
    {
      name: "type 2"
    }
  ]
  type: Type = this.types[0];

  redOffering: Offering;

  offering: number = 1;
  offerings: Offering[] = [
    {
      id: 1,
      name: "Name 1",
      discription: "discription 1",
      maxCount: 5,
      type: this.types[0],
      customerName: "Sanya",
      status: true
    },
    {
      id: 2,
      name: "Name 2",
      discription: "discription 2",
      maxCount: 5,
      type: this.types[1],
      customerName: "Danya",
      status: true
    },
    {
      id: 3,
      name: "Name 3",
      discription: "discription 3",
      maxCount: 5,
      type: this.types[1],
      customerName: "Manya",
      status: true
    },
    {
      id: 4,
      name: "Name 4",
      discription: "discription 4",
      maxCount: 5,
      type: this.types[1],
      customerName: "Manya",
      status: true
    },
    {
      id: 5,
      name: "Name 5",
      discription: "discription 5",
      maxCount: 5,
      type: this.types[1],
      customerName: "Manya",
      status: true
    }
  ]
  constructor(private oauthService : AuthService) {
    this.isAdmin = oauthService.isAdmin();
    this.redOffering = this.offerings[1];
  }

  ngOnInit(): void {
  }

  red(obj : any){
    this.redact = true;
    this.redOffering = obj
    console.log(obj)
  }

  accessFilter(){
    console.log(this.type)
    console.log(this.customer);
  }

  delete(obj : any){
    this.redact = true;
    obj.name = "deleted";
    console.log(obj)
  }

  redAccess(){
    this.redact = false;
    console.log()
  }

  save(){
    this.redact = false;
    console.log("Тип сохранено")
  }
}

export class Offering{
  id: number = 0;
  name: String = "NoName";
  discription: String = "NoName";
  maxCount: number = 0;
  customerName: String = "NoCustomer";
  status: boolean = true;
  type: Type = {
    name: "NoName"
  };
}

export class Type{
  name: String = "NoName";
}

export class Customer{
  name: String = "NoName";
}
