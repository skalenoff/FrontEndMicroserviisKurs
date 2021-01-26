import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { RestService } from 'src/app/services/rest-service.service';
import { Offering } from '../catalog/catalog.component'
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-pricelist',
  templateUrl: './pricelist.component.html',
  styleUrls: ['./pricelist.component.css']
})
export class PricelistComponent implements OnInit {

  public isAdmin: boolean = false;
  customer : String = "";
  customers: String[] = [];

  type : String = "";
  types : String[] = [];

  offering: number = 1;
  offerings: Offering[] | any = []

  constructor(private http: HttpClient, private restService : RestService, private authService : AuthService) { 
    this.getCustomers();
    this.getOfferings();
    this.getTypes();
    this.loadTotalBasket();
    this.isAdmin = authService.isAdmin();
  }

  ngOnInit(): void {
  }

  loadTotalBasket(){
    this.restService._doGet("/priceList/getTotalByBuyer").subscribe(
      data => { this.busket = data },
      error => { console.log(error) }
    );
  }

  loadOfferings(){
    this.restService._doGet("/priceList/getOfferingToPageWithCheat").subscribe(
      data => { this.offerings = data },
      error => { console.log(error) }
    );
  }

  getOfferings(){
    const param = {
      customer: null,
      offeringType: null,
      offeringCount: 40,
      pageNumber: 0
    }
    this.restService._doGet("/priceList/getOfferingsFromBD").subscribe(
      data => { this.offerings = data },
      error => { console.log(error) }
    );
  }

  getTypes(){
    this.restService._doGet("/offering/allResourseTypes").subscribe(
      data => { 
        this.types = data 
        this.type = this.types[0];
        this.types.length = this.types.length + 1
        this.types[this.types.length - 1] = ""
      },
      error => { console.log(error) }
    );
  }

  getCustomers(){
    this.restService._doGet("/offering/allCustomers").subscribe(
      data => { 
        this.customers = data
        this.customer = this.customers[0];
        this.customers.length = this.customers.length + 1
        this.customers[this.customers.length - 1] = ""
      },
      error => { console.log(error) }
    );
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

  busket: any = {
    _itemCount: 0,
    _totalCost: 0
  };

  addOnCart(off : Offering){
    console.log(off);
    this.restService._doPost("/priceList/addItemToBasket", off).subscribe(
      data => { 
        this.busket = data
      },
      error => { console.log(error) }
    );
  }
}
