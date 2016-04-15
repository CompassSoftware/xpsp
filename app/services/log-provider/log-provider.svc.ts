import {Injectable} from 'angular2/core';
import {Log} from '../../shared/classes/Log';
import {LOGS} from './mock-logs';

@Injectable()
export class LogProvider {
  constructor() {}

  getLogs() {
    return Promise.resolve(LOGS);
  }
}
