import {Injectable} from 'angular2/core';
import {Icon} from '../../shared/interfaces/icon';
import {ICONS} from './mock-icons';

@Injectable()
export class IconProvider {

  constructor() {}

  getIcons() {
    return Promise.resolve(ICONS);
  }
}
