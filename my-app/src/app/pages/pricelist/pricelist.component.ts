import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'app-pricelist',
  templateUrl: './pricelist.component.html',
  styleUrls: ['./pricelist.component.css']
})
export class PricelistComponent implements OnInit {


  url = '/fruits';
  fruit!: Fruit[];


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  _getFruits(){
    this.getFruits().subscribe(data => {
    }, error => {
      console.log(error);
    });
  }

  getFruits(){
    //const endpoint = '/fruits';
    const endpoint = this.url;
    console.log("GET, " + endpoint)
    return this.http.get(endpoint, { headers: new HttpHeaders( {'Content-Type': 'application/json; charset=UTF-8'} )})
    .pipe(
      map((res:any) => {
      this.fruit = res;
      console.log("Загружено чтто-то");
      console.log(this.fruit);
      return true; })
      );
  }

  _postFruits(){
    this.postFruits().subscribe(data => {
    }, error => {
      console.log(error);
    });
  }

  postFruits(){
    //const endpoint = '/fruits';
    const endpoint = this.url;
    console.log("GET, " + endpoint)

    const request = {
      description: "Hellow Quarkus!",
      name: "Angular"
    };

    return this.http.post(endpoint, request, { headers: new HttpHeaders( {'Content-Type': 'application/json; charset=UTF-8'} )})
    .pipe(
      map((res:any) => {
      this.fruit = res;
      console.log("Загружено чтто-то");
      console.log(this.fruit);
      return true; })
      );
  }
}

export interface Fruit {
  description: string;
  name: string;
}