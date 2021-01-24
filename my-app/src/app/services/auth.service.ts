import { Injectable } from '@angular/core';
import { AuthConfig, NullValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { filter } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    
  private _decodedAccessToken: any;
  private _decodedIDToken: any;
  get decodedAccessToken() { return this._decodedAccessToken; }
  get decodedIDToken() { return this._decodedIDToken; }

  userName = 'Войти';
  public login: string = "";
  private role: Role = Role.customer;
  public isBuyer(): boolean {
    this.role = JSON.parse(localStorage.getItem("id_token_claims_obj") + "").user_role
    console.log(this.role)
    return (this.role == Role.buyer);
  };
  public isCustomer(): boolean{
    this.role = JSON.parse(localStorage.getItem("id_token_claims_obj") + "").user_role
    return (this.role == Role.customer);
  };
  public isAdmin(): boolean{
    this.role = JSON.parse(localStorage.getItem("id_token_claims_obj") + "").user_role
    return (this.role == Role.admin);
  };
  public getLogin() : string{
    return JSON.parse(localStorage.getItem("id_token_claims_obj") + "").name
  }

  constructor(
    private readonly oauthService: OAuthService,
    private readonly authConfig: AuthConfig
  ) {

  }

  public logout() {
    this.oauthService.logOut();
  }

  async initAuth(): Promise<any> {
    return new Promise<void>((resolveFn, rejectFn) => {
      // setup oauthService
      this.oauthService.configure(this.authConfig);
      this.oauthService.setStorage(localStorage);
      this.oauthService.tokenValidationHandler = new NullValidationHandler();

      // subscribe to token events
      this.oauthService.events
        .pipe(filter((e: any) => {
          return e.type === 'token_received';
        }))
        .subscribe(() => this.handleNewToken());
        
      // continue initializing app or redirect to login-page
      
      this.oauthService.loadDiscoveryDocumentAndLogin().then(isLoggedIn => {
        if (isLoggedIn) {
          this.oauthService.setupAutomaticSilentRefresh();
          resolveFn();
        } else {
          this.oauthService.initImplicitFlow();
          rejectFn();
        }
      });
      
    });
  }

  private handleNewToken() {
    this._decodedAccessToken = this.oauthService.getAccessToken();
    this._decodedIDToken = this.oauthService.getIdToken();
  }

}

enum Role {
  admin = "[AngularAdmin]",
  customer = "[Customer]",
  buyer = "[buyer]"
}

export const authConfig: AuthConfig = {

  // Url of the Identity Provider
  issuer: environment.keycloak.issuer,

  // URL of the SPA to redirect the user to after login
  redirectUri: environment.keycloak.redirectUri,

  // The SPA's id. 
  // The SPA is registerd with this id at the auth-serverß
  clientId: environment.keycloak.clientId,

  responseType: environment.keycloak.responseType,
  // set the scope for the permissions the client should request
  // The first three are defined by OIDC.
  scope: environment.keycloak.scope,
  // Remove the requirement of using Https to simplify the demo
  // THIS SHOULD NOT BE USED IN PRODUCTION
  // USE A CERTIFICATE FOR YOUR IDP
  // IN PRODUCTION
  requireHttps: environment.keycloak.requireHttps,
  // at_hash is not present in JWT token
  showDebugInformation: environment.keycloak.showDebugInformation,
  disableAtHashCheck: environment.keycloak.disableAtHashCheck
};


export class OAuthModuleConfig {
  resourceServer: OAuthResourceServerConfig = {sendAccessToken: false};
}

export class OAuthResourceServerConfig {
  /**
   * Urls for which calls should be intercepted.
   * If there is an ResourceServerErrorHandler registered, it is used for them.
   * If sendAccessToken is set to true, the access_token is send to them too.
   */
  allowedUrls?: Array<string>;
  sendAccessToken = true;
  customUrlValidation?: (url: string) => boolean;
}