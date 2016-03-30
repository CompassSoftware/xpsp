import {Activity} from '../../shared/interfaces/activity';

export var ACTIVITIES: Activity[] = [{
  name: 'Activity 1',
  icon: 'bug',
  time: '00:09:03',
  children: [{
    name: 'Sub-Activity 1-1',
    icon: 'analytics',
    time: '00:09:03',
    children: []
  }]
}, {
  name: 'Activity 2',
  icon: 'cafe',
  time: '00:01:12',
  children: []
}, {
  name: 'Activity 3',
  icon: 'code',
  time: '01:05:05',
  children: [{
    name: 'Sub-Activity 3-1',
    icon: 'code-download',
    time: '00:06:02',
    children: []
  }, {
    name: 'Sub-Activity 3-2',
    icon: 'code-working',
    time: '00:55:03',
    children: [{
      name: 'Sub-Activity 3-2-1',
      icon: 'book',
      time: '00:03:02',
      children: []
    }]
  }]
}]
