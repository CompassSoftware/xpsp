import {Injectable, Inject} from 'angular2/core';
import {Log} from '../shared/classes/Log';
import {LogProvider} from '../services/log-provider/log-provider.svc';

@Injectable()
export class LogsModel {
  private _logProvider: LogProvider;
  private _logs: Array<Log>;

  constructor(logProvider: LogProvider) {
    this._logProvider = logProvider;
    this._getLogs();
  }

  private _getLogs() {
    this._logProvider.getLogs().then(logs => {
      this._logs = logs;
    });
  }

  public getLogs() : Array<Log> {
    return this._logs;
  }

  public getLogsByProjects(projectId: number) : Array<Log> {
    return this._logs.filter(function(log: Log){
       return log.projectId === projectId;
    });
  }

  public getLogsByActivity(activityId: number) : Array<Log> {
    return this._logs.filter(function(log: Log){
       return log.activityId === activityId;
    });
  }

  public pushLog(log: Log) {
    this._logs.push(log);
  }
}
