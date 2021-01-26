import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  constructor(private http: HttpClient, private auth : OAuthService) {
  }
  private response: any;
  getRes() : any {
    return this.response;
  }
  /**
   * Вызов веб-сервиса
   * @param methodName - имя метода
   * @param params - параметры
   */

  doGet(url: string) : any {

    this._doGet(url).subscribe(
      data => { return data  }, 
      error => {  console.log(error)  }
      );
  }

  public _doGet(url: string) {
    const jsonHeaders = new HttpHeaders(
      {
        'Content-Type' : 'application/json; charset=UTF-8',
        'Authorization' : ('Bearer ' + this.auth.getAccessToken())
      }
      );
    return this.http.get(url, { headers: jsonHeaders })
      .pipe(map((res: any) => {
        console.log("Метод", url);
          console.log(res);
          this.response = res;
          return res;
        })
      );
  }

  doPost(url: string, params: any) : any{
    this._doPost(url, params).subscribe(data => {return data}, error => {console.log(error)});
  }

  public _doPost(url : string, params: any) {
    const jsonHeaders = new HttpHeaders(
      {
        'Content-Type' : 'application/json; charset=UTF-8',
        'Authorization' : ('Bearer ' + this.auth.getAccessToken())
      }
      );
    const options = {
      headers: jsonHeaders,
      body: params,
      withCredentials: true
    };
    return this.http.post(url, params,{ headers: jsonHeaders })
      .pipe(map((response) => {
        console.log("Метод", url);
        console.log(params);
        console.log(response)
        this.response = response;
        return response;
      }));
  }

}
