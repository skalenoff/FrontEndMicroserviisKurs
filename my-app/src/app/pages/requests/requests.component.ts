import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RestService } from 'src/app/services/rest-service.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  isAdmin: boolean;
  isBuyer: boolean

  items: BusketItem[] = [];

  constructor(private oauthService : AuthService, private restService : RestService) {
    
    this.isAdmin = oauthService.isAdmin();
    this.isBuyer = oauthService.isBuyer();

    this.getBusket();
  }

  getBusket(){
    this.restService._doGet("/priceList/getBuyersBasket").subscribe(
      data => { this.items = data },
      error => { console.log(error) }
    );
  }

  deleteFromBusket(obj : BusketItem){
    this.restService._doPost("/priceList/deleteItemFromBasket", obj).subscribe(
      data => { 
        this.getBusket(); 
        console.log(data)
      },
      error => { console.log(error) }
    );
    
  }

  saveToBusket(obj : BusketItem){
    this.restService._doPost("/priceList/updateItemInBasket", obj).subscribe(
      data => { 
        this.getBusket();
        console.log(data)
      },
      error => { console.log(error) }
    );
    
  }

  deal(){
    this.restService._doPost("/events/addToHistory", this.items).subscribe(
      data => { 
        console.log(data)
      },
      error => { console.log(error) }
    );
    this.items.forEach(element => {
      this.restService._doPost("/priceList/deleteItemFromBasket", element).subscribe(
        data => { 
          console.log(data)
          this.restService._doGet("/priceList/getBuyersBasket").subscribe(
            data => { this.items = data },
            error => { console.log(error) }
          );
        },
        error => { console.log(error) }
      );
    });
  }

  ngOnInit(): void {
  }


}

export class BusketItem{
  customerName: String = "";
  offeringName: String = "";
  offeringDescription: String = "";
  offeringMaxCount: number = 0;
  offeringStatus: boolean = false;
  offeringType: String = "";
  offeringPrice: number = 0;
  count: number = 0;
  buyer: String = ""; 
  }