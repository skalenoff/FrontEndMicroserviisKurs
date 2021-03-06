// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  envName: 'local',
  keycloak: {
    // Url of the Identity Provider
    //issuer: 'http://192.168.16.136:8080/auth/realms/quarkus',
    issuer: 'http://10.0.0.9:8080/auth/realms/quarkus',
    //issuer: '/auth/realms/Quarkus',
    // URL of the SPA to redirect the user to after login
    //redirectUri: 'http://192.168.16.100:4200/',
    redirectUri: 'http://10.0.0.8:4200/',
    // The SPA's id. 
    // The SPA is registerd with this id at the auth-serverß
    //clientId: 'todo-ui',
    clientId:'front-end',
    responseType: 'code',
    // set the scope for the permissions the client should request
    // The first three are defined by OIDC.
    scope: 'openid profile email',
    // Remove the requirement of using Https to simplify the demo
    // THIS SHOULD NOT BE USED IN PRODUCTION
    // USE A CERTIFICATE FOR YOUR IDP
    // IN PRODUCTION
    requireHttps: false,
    // at_hash is not present in JWT token
    showDebugInformation: true,
    disableAtHashCheck: true
  }
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
