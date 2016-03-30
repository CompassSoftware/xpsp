import {Activity} from '../../shared/interfaces/activity';

export var ACTIVITIES: Activity[] = [{
  name: 'Fixing Bugs',
  icon: 'bug',
  delta_time: '00:09:03',
  children: [{
    name: 'Documenting Bugs',
    icon: 'analytics',
    delta_time: '00:09:03',
    children: []
  }]
}, {
  name: 'Coffee Break',
  icon: 'cafe',
  delta_time: '00:01:12',
  children: []
}, {
  name: 'Programming',
  icon: 'code',
  delta_time: '01:05:05',
  children: [{
    name: 'Implementing Libraries',
    icon: 'code-download',
    delta_time: '00:06:02',
    children: []
  }, {
    name: 'Novel Coding',
    icon: 'code-working',
    delta_time: '00:55:03',
    children: [{
      name: 'Documenting Code',
      icon: 'book',
      delta_time: '00:03:02',
      children: []
    }]
  }]
}]
