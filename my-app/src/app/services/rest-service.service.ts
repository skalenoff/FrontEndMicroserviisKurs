import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private jsonHeaders = new HttpHeaders(
    {
      'Content-Type' : 'application/json; charset=UTF-8',
      'Authorization' : ('Bearer ' + this.auth.getAccessToken())
    }
    );

  constructor(private http: HttpClient, private auth : OAuthService) {
  }
  private response : any;
  getRes() : any {
    return this.response;
  }
  /**
   * Вызов веб-сервиса
   * @param methodName - имя метода
   * @param params - параметры
   */

  doGet(url: string) {
    this._doGet(url).subscribe(data => {
    }, error => {
      console.log(error);
    });
    return this.response;
  }

  public _doGet(url: string) {
    console.log("GET, " + url)
    console.log(this.jsonHeaders)
    return this.http.get(url, { headers: this.jsonHeaders })
      .pipe(
        map((res: any) => {
          console.log("Загружено что-то");
          console.log(res);
          this.response = res;
          return res;
        })
      );
  }

  doPost(url: string, params: any) {
    this._doPost(url, params).subscribe(data => {
    }, error => {
      console.log(error);
    });
    return this.response;
  }

  public _doPost(url : string, params: any) {
    const options = {
      headers: this.jsonHeaders,
      body: params,
      withCredentials: true
    };
    return this.http.post(url, params,{ headers: this.jsonHeaders })
      .pipe(map((response) => {
        console.log("Загружено что-то");
        console.log(response)
        this.response = response;
        return response;
      }));
  }

}
