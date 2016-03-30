import {Page} from 'ionic-angular';
import {Activity} from '../../shared/interfaces/activity';
import {ActivityProvider} from '../../services/activity-provider/activity-provider.svc';
import {ActivityList} from '../../components/activity-list/activity-list.cmp';
import {ActivityDetail} from '../../components/activity-detail/activity-detail.cmp';


@Page({
  templateUrl: 'build/pages/activities/activities.html',
  directives: [ActivityDetail, ActivityList],
  providers: [ActivityProvider]
})
export class ActivitiesPage {
  private activities: Array<Activity>;

  constructor(private _activityProvider: ActivityProvider) {
    this.activities = [];
  }

  ngOnInit() {
    this.getActivities();
  }

  getActivities() {
    this._activityProvider.getActivities().then(activities => {
      this.activities = activities;
    });
  }

}
