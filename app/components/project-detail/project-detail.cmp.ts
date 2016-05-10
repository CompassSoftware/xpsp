import {Component, Input} from 'angular2/core';
import {IONIC_DIRECTIVES, NavController, Modal, ActionSheet, Platform} from 'ionic-angular';
import {Project} from '../../shared/interfaces/project';
import {ProjectProvider} from '../../services/project-provider/project-provider.svc';
import {ActivitiesPage} from '../../pages/activities/activities';
import {EditProjectModal} from '../../pages/projects/modals/edit-project.mod';
import {TimeFormat} from '../../pipes/time-format/time-format.pip';

@Component({
  selector: 'project-detail',
  templateUrl: 'build/components/project-detail/project-detail.cmp.html',
  styleUrls: [],
  providers: [],
  directives: [IONIC_DIRECTIVES],
  pipes: [TimeFormat]
})
export class ProjectDetail {
  nav: NavController;
  actionSheet: ActionSheet;
  platform: Platform;

  @Input() project: Project;

  constructor(nav: NavController, private _projectProvider: ProjectProvider) {
    this.nav = nav;
  }

  projectTapped(event, project) {
    this.nav.push(ActivitiesPage, {project: project});
  }

  editProject(button) {
    let modal = Modal.create(EditProjectModal, {project: this.project});
    this.nav.present(modal);
    modal.onDismiss(mdlObj => {
      if (mdlObj != null) {
        for (var attrname in mdlObj) {
          this.project[attrname] = mdlObj[attrname];
        }
        this._projectProvider.updateProject(mdlObj);
      }
    })
  }

  openMenu(project) {
    this.actionSheet = ActionSheet.create({
      title: 'Project',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this._projectProvider.removeProject(project);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
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
