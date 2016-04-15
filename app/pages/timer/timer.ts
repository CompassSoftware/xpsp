import {Page} from 'ionic-angular';
import {Log} from '../../shared/classes/Log';
import {LogsModel} from '../../models/logs.mdl';

@Page({
  templateUrl: 'build/pages/timer/timer.html',
  directives: [],
  providers: [LogsModel]
})
export class TimerPage {
  constructor(private _logsModel: LogsModel) {}
}
