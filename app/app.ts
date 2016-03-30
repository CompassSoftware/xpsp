import {App, IonicApp, Platform, MenuController} from 'ionic-angular';
import {ProjectsPage} from './pages/projects/projects';
import {ActivitiesPage} from './pages/activities/activities';
import {LoginPage} from './pages/login/login';

// https://angular.io/docs/ts/latest/api/core/Type-interface.html
import {Type} from 'angular2/core';


@App({
  templateUrl: `build/app.html`,
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
  app: IonicApp;
  rootPage: Type = ProjectsPage;
  menu: MenuController;
  loginPage: Type = LoginPage;

  constructor(app: IonicApp, platform: Platform, menu: MenuController) {
    platform.ready().then(() => {
      this.app = app;
      this.menu = menu;
      // The platform is now ready. Note: if this callback fails to fire, follow
      // the Troubleshooting guide for a number of possible solutions:
      //
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //
      // First, let's hide the keyboard accessory bar (only works natively) since
      // that's a better default:
      //
      // Keyboard.setAccessoryBarVisible(false);
      //
      // For example, we might change the StatusBar color. This one below is
      // good for dark backgrounds and light text:
      // StatusBar.setStyle(StatusBar.LIGHT_CONTENT)
    });
  }

  openPage(page) {
    this.menu.close();
    let nav = this.app.getComponent('nav');
    nav.setRoot(page);
  }
}
