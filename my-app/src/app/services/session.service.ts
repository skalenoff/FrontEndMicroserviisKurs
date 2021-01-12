import {Injectable} from '@angular/core';
import {SessionStorageService} from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private sessionStorageService: SessionStorageService) {
  }

  /**
   * Записать параметр
   * @param paramName - имя параметра
   * @param data -значение параметра
   */
  public setSessionParam(paramName: string, data: any) {
    if (!data) {
      this.sessionStorageService.clear(paramName);
    } else {
      this.sessionStorageService.store(paramName, JSON.stringify(data));
    }
  }

  /**
   * Получение параметра
   * @param paramName - имя параметра
   */
  public getSessionParam(paramName: string) {
    const paramValue = this.sessionStorageService.retrieve(paramName);
    if (paramValue) {
      return JSON.parse(paramValue);
    }
    return null;
  }

}
