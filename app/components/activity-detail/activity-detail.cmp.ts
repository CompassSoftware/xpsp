import {Component, Input} from 'angular2/core';
import {IONIC_DIRECTIVES, NavController, NavParams, Modal, ActionSheet, Platform} from 'ionic-angular';
import {Activity} from '../../shared/interfaces/activity';
import {Project} from '../../shared/interfaces/project';
import {ActivityProvider} from '../../services/activity-provider/activity-provider.svc';
import {LogProvider} from '../../services/log-provider/log-provider.svc';
import {Icon} from '../../shared/interfaces/icon';
import {IconProvider} from '../../services/icon-provider/icon-provider.svc';
import {EditActivityModal} from '../../pages/activities/modals/edit-activity.mod';
import {TimerPage} from '../../pages/timer/timer';
import {TimeFormat} from '../../pipes/time-format/time-format.pip';

@Component({
  selector: 'activity-detail',
  templateUrl: 'build/components/activity-detail/activity-detail.cmp.html',
  styleUrls: [],
  providers: [IconProvider, LogProvider],
  directives: [IONIC_DIRECTIVES, ActivityDetail],
  pipes: [TimeFormat]
})
export class ActivityDetail {
  private icons: Array<Icon>;
  nav: NavController;
  actionSheet: ActionSheet;
  platform: Platform;
  project: Project;

  @Input() activity: Activity;
  @Input() expandedActivities: Array<Activity>;
  @Input() expanded: boolean;

  constructor(
    nav: NavController,
    navParams: NavParams,
    private _iconProvider: IconProvider,
    private _activityProvider: ActivityProvider,
    private _logProvider: LogProvider
  ) {
    this.icons = [];
    this.nav = nav;
    this.project = navParams.get('project');
  }

  ngOnInit() {
    this.getIcons();
  }

  getIcons(){
    this._iconProvider.getIcons().then(icons => {
      this.icons = icons;
    });
  }

  getLogs() {
    this._logProvider.getLogsByActivity(this.activity).then((logs) => {
      return logs;
    });
  }

  activityTapped(event, project) {
    this.nav.push(TimerPage, {project: this.project, activity: this.activity});
  }


  editActivity(button) {
    let modal = Modal.create(EditActivityModal, {activity: this.activity});
    this.nav.present(modal);
    modal.onDismiss(mdlObj => {
      if (mdlObj != null) {
        for (var attrname in mdlObj) {
          this.activity[attrname] = mdlObj[attrname];
        }
        this._activityProvider.updateActivity(this.activity);
      }
    })
  }

  openMenu() {
    this.actionSheet = ActionSheet.create({
      title: 'Activity',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this._activityProvider.removeActivity(
              this.activity,
              this.expandedActivities[this.expandedActivities.length - 1]
            );
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: null,
          handler: () => {
            this.actionSheet && this.actionSheet.dismiss();
          }
        }
      ]
    });
    this.nav.present(this.actionSheet);
  }
}
