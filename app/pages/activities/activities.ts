import {FormBuilder, Validators} from 'angular2/common';
import {Page, Modal, ViewController, NavController, NavParams} from 'ionic-angular';
import {CreateActivityModal} from './modals/create-activity.mod';
import {Activity} from '../../shared/interfaces/activity';
import {ActivityList} from '../../components/activity-list/activity-list.cmp';
import {ActivityDetail} from '../../components/activity-detail/activity-detail.cmp';
import {ActivityProvider} from '../../services/activity-provider/activity-provider.svc';


@Page({
  templateUrl: 'build/pages/activities/activities.html',
  directives: [ActivityDetail, ActivityList],
  providers: [ActivityProvider]
})
export class ActivitiesPage {
  nav: NavController;
  private activities: Array<Activity>;


  constructor(nav: NavController, private _activityProvider: ActivityProvider) {
    this.nav = nav;
    this.activities = [];
  }

  getActivities() {
    this._activityProvider.getActivities().then(activities => {
      this.activities = activities;
    });
  }



  ngOnInit() {
    this.getActivities();
  }

  createActivity(button) {
    let modal = Modal.create(CreateActivityModal);
    this.nav.present(modal);
    modal.onDismiss(activity => {
      if (activity != null) {
        this.activities.push(activity);
      }
    });
  }
}
