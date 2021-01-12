import {Component, OnInit} from '@angular/core';
import {SessionService} from '../../../services/session.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})

export class RootComponent implements OnInit {
  constructor(private SessionService: SessionService,  private http: HttpClient) {
  }

  ngOnInit() {
    console.log("Подгружаем справочники");
  }
}
