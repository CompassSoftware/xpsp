import {bootstrap} from 'angular2/platform/browser';
import {XPspApp} from './app/x-psp';
import {ROUTER_PROVIDERS} from 'angular2/router';

bootstrap(XPspApp, [
  ROUTER_PROVIDERS
]);
