import {Activity} from '../../shared/interfaces/activity';

export var DEFAULT_ACTIVITIES: Activity[] = [{
  name: 'Planning',
  icon: 'clipboard',
  delta_time: 0,
  level: 0,
  default: true,
  children: [{
    name: 'Defining Requirements',
    icon: 'checkbox-outline',
    delta_time: 0,
    level: 1,
    default: true,
    children: []
  }, {
    name: 'Designing',
    icon: 'bulb',
    delta_time: 0,
    level: 1,
    default: true,
    children: []
  }]
}, {
  name: 'Development',
  icon: 'code',
  delta_time: 0,
  level: 0,
  default: true,
  children: [{
    name: 'Programming',
    icon: 'code-working',
    delta_time: 0,
    level: 1,
    default: true,
    children: [{
      name: 'Solo Programming',
      icon: 'person',
      delta_time: 0,
      level: 2,
      default: true,
      children: []
    }, {
      name: 'Pair Programming',
      icon: 'people',
      delta_time: 0,
      level: 2,
      default: true,
      children: []
    }, {
      name: 'Refactoring',
      icon: 'hammer',
      delta_time: 0,
      level: 2,
      default: true,
      children: []
    }]
  }, {
    name: 'Unit Testing',
    icon: 'create',
    delta_time: 0,
    level: 1,
    default: true,
    children: []
  }, {
    name: 'Debugging',
    icon: 'bug',
    delta_time: 0,
    level: 1,
    default: true,
    children: []
  }]
}, {
  name: 'Break',
  icon: 'cafe',
  delta_time: 0,
  level: 0,
  default: true,
  children: []
}]
