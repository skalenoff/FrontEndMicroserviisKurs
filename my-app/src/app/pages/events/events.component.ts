import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  isAdmin: boolean;
  buyer: number = 1;
  month: number = 1;
  buyers = [
    {
      id: 1,
      name: "Sanya"
    },
    {
      id: 2,
      name: "Danya"
    },
    {
      id: 3,
      name: "Lena"
    }
  ]
  months = [
    {
      id: 1,
      name: "Dec 2022"
    },
    {
      id: 2,
      name: "Jan 2021"
    },
    {
      id: 3,
      name: "Feb 2022"
    }
  ]
  constructor(private oauthService : AuthService) {
    this.isAdmin = oauthService.isAdmin();
  }

  ngOnInit(): void {
  }

  logCustomerAndType(){
    console.log(this.buyer, " | " , this.month)
  }
}
