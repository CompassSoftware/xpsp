import {Component, Input} from 'angular2/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';
import {Activity} from '../../shared/interfaces/activity';

@Component({
  selector: 'activity-detail',
  templateUrl: 'build/components/activity-detail/activity-detail.cmp.html',
  styleUrls: [],
  providers: [],
  directives: [IONIC_DIRECTIVES, ActivityDetail],
  pipes: []
})
export class ActivityDetail {

  @Input() activity: Activity;
  @Input() expanded: boolean;

  constructor() {}

}
