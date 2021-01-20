import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule, AuthConfig } from 'angular-oauth2-oidc';

import { AuthService, authConfig, OAuthModuleConfig } from '../services/auth.service';

export function init_app(authConfigService: AuthService) {
    return () => authConfigService.initAuth();
}


@NgModule({
  imports: [ HttpClientModule, OAuthModule.forRoot() ],
  providers: [
    AuthService,
    { provide: AuthConfig, useValue: authConfig },
    OAuthModuleConfig,
    { 
      provide: APP_INITIALIZER, 
      useFactory: init_app, 
      deps: [ AuthService ], 
      multi: true
    }
  ]
})
export class AppInitModule { }
