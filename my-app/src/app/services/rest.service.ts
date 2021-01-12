import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private jsonHeaders = new HttpHeaders({'Content-Type': 'application/json; charset=UTF-8'});
  private static DEFAULT_PATH = '/rest/';

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Вызов веб-сервиса
   * @param methodName - имя метода
   * @param params - параметры
   */
  public doCall(methodName: string, params: any, path: string, type: string) {
    const url = path + methodName;
    const options = {
      headers: this.jsonHeaders,
      body: params,
      withCredentials: true
    };
    return this.httpClient.request(type, url, options)
      .pipe(map((response) => {
        return this.mapResponse(methodName, response);
      }));
  }

  /**
   * Мапинг результата вызова
   * @param methodName
   * @param response
   */
  private mapResponse(methodName: string, response: Object) {
    console.log(methodName + ' call result: ', response);
    return response;
  }

}
