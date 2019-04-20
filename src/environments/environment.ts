import { DBConnection } from 'auth0-js';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  serviceAddress: "http://localhost",
  servicePort: 8902,
  auth0ClientId: "Tl3SnziPkp4qRjRuajZWfrAeMn6Dxwr6",
  auth0ClientSecret: "Ep36WseJFCSnU5IsMdDxJh_JKyhlyKDfw0_epmihC4JroW1SvVtvDa9BHuwDGPMJ",
  auth0Audience: "endpoint-security.containernooks.com",
  auth0GrantType: "client_credentials",
  database: "flight-db",
  collection: "flights"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
