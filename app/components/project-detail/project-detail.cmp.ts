import {Component, Input} from 'angular2/core';
import {IONIC_DIRECTIVES, NavController} from 'ionic-angular';
import {Project} from '../../shared/interfaces/project';
import {ActivitiesPage} from '../../pages/activities/activities';


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

  @Input() project: Project;

  constructor(nav: NavController) {
    this.nav = nav;
  }

  projectTapped(event, project) {
    this.nav.push(ActivitiesPage, {project: project});
  }
}
