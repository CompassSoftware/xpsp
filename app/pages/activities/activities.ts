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
  private expandedActivities: Array<Activity>;
  private level: Number;

  constructor(nav: NavController, private _activityProvider: ActivityProvider) {
    this.nav = nav;
    this.activities = [];
    this.expandedActivities = [];
    this.level = 0;
  }

  ngOnInit() {
    this.getActivities();
  }

  getActivities() {
    this._activityProvider.getActivities().then(activities => {
      this.activities = activities;
    });
  }

  getExpanded() {
    return this.expandedActivities[this.expandedActivities.length - 1];
  }

  createActivity(button) {
    let modal = Modal.create(CreateActivityModal, {parent: this.getExpanded()});
    this.nav.present(modal);
    modal.onDismiss(activity => {
      if (activity != null) {
        this._activityProvider.addActivity(activity, this.getExpanded());
      }
    });
  }
}
