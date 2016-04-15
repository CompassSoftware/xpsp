import {Component, Input} from 'angular2/core';
import {IONIC_DIRECTIVES, NavController, Modal, ActionSheet, Platform} from 'ionic-angular';
import {Project} from '../../shared/interfaces/project';
import {ActivitiesPage} from '../../pages/activities/activities';
import {EditProjectModal} from '../../pages/projects/modals/edit-project.mod';

@Component({
  selector: 'project-detail',
  templateUrl: 'build/components/project-detail/project-detail.cmp.html',
  styleUrls: [],
  providers: [],
  directives: [IONIC_DIRECTIVES],
  pipes: []
})
export class ProjectDetail {
  nav: NavController;
  actionSheet: ActionSheet;
  platform: Platform;

  @Input() project: Project;
  @Input() projects: Project[];

  constructor(nav: NavController) {
    this.nav = nav;
  }

  projectTapped(event, project) {
    this.nav.push(ActivitiesPage, {project: project});
  }

  editProject(button) {
    let modal = Modal.create(EditProjectModal);
    this.nav.present(modal);
    modal.onDismiss(project => {
      if (project != null) {
        this.project = project;
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
            for (var i = 0; i < this.projects.length; i++) {
              if (this.projects[i] === project) {
                this.projects.splice(i, 1);
              }
            }
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
