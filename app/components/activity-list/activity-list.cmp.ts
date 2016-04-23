import {Component, Input, Output, EventEmitter} from 'angular2/core';
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

  @Input() level: Number;
  @Input() activities: Array<Activity>;
  @Input() expandedActivities: Array<Activity>;
  @Output() expandedActivitiesChange: EventEmitter<Object> = new EventEmitter(false);

  constructor() {
    if (typeof this.expandedActivities === 'undefined') {
      this.expandedActivities = [];
    }
  }

  getExpanded() {
    return this.expandedActivities[this.expandedActivities.length - 1];
  }

  isExpanded(activity) {
    return (activity === this.getExpanded());
  }

  containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === obj) {
        return true;
      }
    }
    return false;
  }

  toggleExpanded(activity) {
    let parent = this.getExpanded();
    if (typeof parent != 'undefined') {
      if (activity === parent) {
        this.expandedActivities.pop();
        return;
      } else if (!(this.containsObject(activity, parent.children))) {
        for (var i = 0; i < (parent.level + 1); i++) {
          this.expandedActivities.pop();
        }
      }
    }
    this.expandedActivities.push(activity);
    this.expandedActivitiesChange.emit(this.expandedActivities);
  }
}
