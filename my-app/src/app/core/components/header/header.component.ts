import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userName = 'Войти';

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  route(){
      this.router.navigate(['/root']);
  }

  routeToAdmin(){
    this.router.navigate(['/calc']);
  }
}