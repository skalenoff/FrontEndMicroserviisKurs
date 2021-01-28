import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RestService } from 'src/app/services/rest-service.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  isAdmin: boolean;
  year: String = "2020";
  month: String = "01";
  isHystory: boolean = true;
  orders: Order[] | any;

  years = [
    {
      id: "2020",
      name: "2020"
    },
    {
      id: "2021",
      name: "2021"
    },
    {
      id: "2022",
      name: "2022"
    }
  ]
  months = [
    {
      id: "01",
      name: "Январь"
    },
    {
      id: "02",
      name: "Февраль"
    },
    {
      id: "03",
      name: "Март"
    },
    {
      id: "04",
      name: "Апрель"
    },
    {
      id: "05",
      name: "Май"
    },
    {
      id: "06",
      name: "Июнь"
    },
    {
      id: "07",
      name: "Июль"
    },
    {
      id: "08",
      name: "Август"
    },
    {
      id: "09",
      name: "Сентябрь"
    },
    {
      id: "10",
      name: "Октябрь"
    },
    {
      id: "11",
      name: "Ноябрь"
    },
    {
      id: "12",
      name: "Декабрь"
    }
  ]

  constructor(private oauthService : AuthService, private restService : RestService) {

    this.isAdmin = oauthService.isAdmin();
  }

  results: any;

  check(){
    const param = this.year + "-" + this.month
    this.restService._doPost("/events/filterHistory", param).subscribe(
      data => { 
        console.log(data)
        this.results = data
        this.isHystory = false;
      },
      error => { console.log(error) }
    );
  }

  history(){
    const param = this.year + "-" + this.month
    this.restService._doPost("/events/filterOrder", param).subscribe(
      data => { 
        console.log(data)
        this.orders = data
        this.isHystory = true;
      },
      error => { console.log(error) }
    );
  }

  ngOnInit(): void {
  }
}

export class Order{
  buyer: String = ""; 
  date: String = "";
  totalPrice: number = 0;
  items: BusketItem[] = [];
  hidden = true;
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