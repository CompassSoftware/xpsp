import {Component, Input} from 'angular2/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';
import {Activity} from '../../shared/interfaces/activity';
import {ActivityDetail} from '../activity-detail/activity-detail.cmp';

@Component({
  selector: 'activity-list',
  templateUrl: 'build/components/activity-list/activity-list.cmp.html',
  styleUrls: [],
  providers: [],
  directives: [IONIC_DIRECTIVES, ActivityDetail, ActivityList],
  pipes: []
})
export class ActivityList {

  @Input() activities: Array<Activity>;
  private expandedActivity: Activity;

  constructor() {
    this.expandedActivity = null;
  }

  isExpanded(activity) {
    return (activity === this.expandedActivity);
  }

  getExpanded() {
    return this.expandedActivity;
  }

  toggleExpanded(activity) {
    if (!this.isExpanded(activity)) {
      this.expandedActivity = activity;
    } else {
      this.expandedActivity = null;
    }
  }
}
