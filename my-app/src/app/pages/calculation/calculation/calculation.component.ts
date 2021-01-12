import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpEvent, HttpParams, HttpRequest, HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.scss']
})
export class CalculationComponent implements OnInit {
  fileToUpload: File | null | undefined;
  constructor(private restService: RestService, private http: HttpClient) {
  }

  ngOnInit() {
  }

  load_guide_corps(t : boolean){
    this.load_corps(t).subscribe(data => {
    }, error => {
      console.log(error);
    });
  }

  load_corps(t : boolean){
    const endpoint = '/rest/main/getAllHoustings';
    console.log("GET, /rest/main/getAllHoustings")
    console.log("Ожидается ответ: {[ {id, numberOfHousing, enable}{id, numberOfHousing, enable}... ]}");
    return this.http

    .get(endpoint, { headers: new HttpHeaders({'Content-Type': 'application/json; charset=UTF-8'})})
    .pipe(map((res:any) => {
      console.log(res);
      return true; }
       )
      );
  }
}