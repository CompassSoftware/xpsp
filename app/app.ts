import {App, IonicApp, Platform, MenuController} from 'ionic-angular';
import {ProjectsPage} from './pages/projects/projects';
import {ActivitiesPage} from './pages/activities/activities';
import {LoginPage} from './pages/login/login';
import {SettingsPage} from './pages/settings/settings';
import {TimerPage} from './pages/timer/timer';
import {LogProvider} from './services/log-provider/log-provider.svc';

// https://angular.io/docs/ts/latest/api/core/Type-interface.html
import {Type} from 'angular2/core';


@App({
  templateUrl: `build/app.html`,
  providers: [LogProvider],
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
  app: IonicApp;
  rootPage: Type = ProjectsPage;
  menu: MenuController;
  loginPage: Type = LoginPage;
  settingsPage: Type = SettingsPage;
  timerPage: Type = TimerPage;

  constructor(app: IonicApp, platform: Platform, menu: MenuController) {
    platform.ready().then(() => {
      this.app = app;
      this.menu = menu;
    });
  }

  openPage(page) {
    this.menu.close();
    let nav = this.app.getComponent('nav');
    nav.setRoot(page);
  }
}
