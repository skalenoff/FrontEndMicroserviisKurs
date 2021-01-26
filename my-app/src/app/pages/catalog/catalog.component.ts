import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RestService } from 'src/app/services/rest-service.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  redact: boolean = false;
  public isAdmin: boolean;


  customers: String[] = []
  customer: String = this.customers[0];

  types: String[] = []
  type: String = this.types[0];

  redOffering: Offering;
  addOfferinbg: boolean = false;

  offering: number = 1;
  offerings: Offering[] | any = []

  constructor(private oauthService: AuthService, private restService: RestService) {
    this.isAdmin = oauthService.isAdmin();
    this.redOffering = new Offering;
  }

  ngOnInit(): void {
    const param = {
      customer: null,
      offeringCount: 40,
      pageNumber: 0
    }
    this.restService._doGet("/offering/allCustomers").subscribe(
      data => { 
        this.customers = data
        this.customer = this.customers[0];
        this.customers.length = this.customers.length + 1
        this.customers[this.customers.length - 1] = ""
      },
      error => { console.log(error) }
    );

    this.restService._doGet("/offering/allResourseTypes").subscribe(
      data => { 
        this.types = data 
        this.type = this.types[0];
        this.types.length = this.types.length + 1
        this.types[this.types.length - 1] = ""
      },
      error => { console.log(error) }
    );

    this.restService._doPost("/offering/getOfferingToPage", param).subscribe(
      data => { 
        this.offerings = data
      },
      error => { console.log(error) }
    );
  }

  red(obj: any) {
    this.redact = true;
    this.redOffering = obj
    console.log(obj)
  }

  accessFilter() {
    const param = {
      customer: this.customer,
      offeringType: this.type,
      offeringCount: 40,
      pageNumber: 0
    }
    this.restService._doPost("/offering/getOfferingToPage", param).subscribe(
      data => { 
        this.offerings = data
      },
      error => { console.log(error) }
    );
  }

  delete(obj: any) {
    console.log(obj)
    this.restService.doPost("/offering/deleteOffering", obj);
  }

  cancel(){
    this.redact = false;
    this.addOfferinbg = false;
  }

  newOffering() {
    this.redOffering = new Offering;
    this.redact = true;
    this.addOfferinbg = true;
  }

  redAccess() {
    this.redact = false;
    console.log()
  }

  save() {
    if (this.addOfferinbg == true) {
      console.log(this.redOffering)
      this.restService.doPost("offering/addOffering", this.redOffering);
    }
    else {
      console.log(this.redOffering)
      this.restService.doPost("offering/updateOffering", this.redOffering);
    }
    this.addOfferinbg = false;
    this.redact = false;
    const param = {
      customer: this.customer,
      offeringType: this.type,
      offeringCount: 40,
      pageNumber: 0
    }
    this.restService._doPost("/offering/getOfferingToPage", param).subscribe(
      data => { this.offerings = data },
      error => { console.log(error) }
    );
  }

  redactN: boolean = false;
  nac: number = 0;
  nacType: String = "";

  redactNak(){
    this.redactN = true;
  }

  saveNak(){
    const param = {
      offeringType : this.nacType,
      cheatPercent : this.nac
    }
    this.restService.doPost("/offering/addCheating", param);
  }

  cancelNak(){
    this.redactN = false;
  }

  getFruits() {
    this.restService.doGet('/offering/offeringCountAll')
  }
}

export class Offering {
  offeringName: String = "NoName";
  offeringStatus: boolean = false;
  offeringDescription: String = "NoName";
  offeringMaxCount: number = 0;
  customerName: String = "NoCustomer";
  offeringType: String = "NoName";
  offeringPrice: number = 0;
}