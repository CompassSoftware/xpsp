import {Injectable} from 'angular2/core';
import {Activity} from '../../shared/interfaces/activity';
import {ACTIVITIES} from './mock-activities';

@Injectable()
export class ActivityProvider {

  constructor() {}

  getActivities() {
    return Promise.resolve(ACTIVITIES);
  }
}
