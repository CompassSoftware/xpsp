import {Page, NavController, NavParams, IONIC_DIRECTIVES} from 'ionic-angular';
import {Log} from '../../shared/interfaces/log';
import {Project} from '../../shared/interfaces/project';
import {Activity} from '../../shared/interfaces/activity';
import {LogProvider} from '../../services/log-provider/log-provider.svc';
import {ProjectProvider} from '../../services/project-provider/project-provider.svc';
import {ActivityProvider} from '../../services/activity-provider/activity-provider.svc';
import {ClockFormat} from '../../pipes/time-format/clock-format.pip';
import {TimeFormat} from '../../pipes/time-format/time-format.pip';

@Page({
  templateUrl: 'build/pages/timer/timer.html',
  directives: [IONIC_DIRECTIVES],
  providers: [LogProvider, ActivityProvider, ProjectProvider],
  pipes: [ClockFormat, TimeFormat]
})
export class TimerPage {
  private _log: Log;
  public logs: Array<Log>;
  public started: boolean;
  public timer: number;
  public project;
  public activity;

  constructor(private _logProvider: LogProvider,
              private _activityProvider: ActivityProvider,
              private _projectProvider: ProjectProvider,
              private nav: NavController,
              private navParams: NavParams) {
    this.logs = [];
    this.project = navParams.get('project');
    this.activity = navParams.get('activity');
  }

  public startTimer(){
    this._log = {
      'startTime': Date.now(),
      'endTime': 0,
      'projectId': this.project._id,
      'activityId': this.activity._id
    }
    this.timer = 0;
    this.started = true;
    this._incrementClock();
  }

  public stopTimer(){
    setTimeout(() => {this.timer = 0;}, 500);
    this.started = false;
    this._log.endTime = Date.now();
    this.log(this._log);
    this.logs.push(this._log);
  }

  private _incrementClock(){
    this.timer++;
    setTimeout(() => {
      if(this.started){
        this._incrementClock();
      }
    }, 1000);
  }

  public toggleTimer() {
    if (!this.started) {
      this.startTimer();
    } else {
      this.stopTimer();
    }
  }

  public getIconeName() {
    if (!this.started) {
      return 'play';
    } else {
      return 'square';
    }
  }

  private log(log: Log) {
    // Should be the timers job. Should fire even caught by projects/activities
    this.activity.delta_time += this.deltaT(this._log);
    this._activityProvider.updateActivity(this.activity);
    this.project.delta_time += this.deltaT(this._log);
    this._projectProvider.updateProject(this.project);
    this._logProvider.addLog(log);
  }

  public deltaT(log: Log) {
    return Math.round((log.endTime - log.startTime) / 1000);
  }
}
