import {Component, Input} from 'angular2/core';
import {IONIC_DIRECTIVES, NavController, Modal, ActionSheet, Platform} from 'ionic-angular';
import {Activity} from '../../shared/interfaces/activity';
import {Icon} from '../../shared/interfaces/icon';
import {IconProvider} from '../../services/icon-provider/icon-provider.svc';
import {EditActivityModal} from '../../pages/activities/modals/edit-activity.mod';

@Component({
  selector: 'activity-detail',
  templateUrl: 'build/components/activity-detail/activity-detail.cmp.html',
  styleUrls: [],
  providers: [IconProvider],
  directives: [IONIC_DIRECTIVES, ActivityDetail],
  pipes: []
})
export class ActivityDetail {
  private icons: Array<Icon>;
  nav: NavController;
  actionSheet: ActionSheet;
  platform: Platform;

  @Input() activity: Activity;
  @Input() expanded: boolean;

  constructor(private _iconProvider: IconProvider, nav: NavController) {
    this.icons = [];
    this.nav = nav;
  }

  ngOnInit() {
    this.getIcons();
  }

  getIcons(){
    this._iconProvider.getIcons().then(icons => {
      this.icons = icons;
    });
  }
  editActivity(button) {
    let modal = Modal.create(EditActivityModal);
    this.nav.present(modal);
    modal.onDismiss(activity => {
      if (activity != null) {
        this.activity = activity;
      }
    })
  }
  openMenu(activity) {
    this.actionSheet = ActionSheet.create({
      title: 'Activity',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            // TODO
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
