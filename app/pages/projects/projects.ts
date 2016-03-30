import {FormBuilder, Validators} from 'angular2/common';
import {OnInit} from 'angular2/core';
import {Page, Modal, ViewController, NavController, NavParams} from 'ionic-angular';
import {CreateProjectModal} from './modals/create-project.mod';
import {Project} from '../../shared/interfaces/project';
import {ProjectList} from '../../components/project-list/project-list.cmp';
import {ProjectDetail} from '../../components/project-detail/project-detail.cmp';
import {ProjectProvider} from '../../services/project-provider/project-provider.svc';
import {ProjectSort} from '../../pipes/project-sort/project-sort.pip';
import {ActivitiesPage} from '../activities/activities';

@Page({
  templateUrl: 'build/pages/projects/projects.html',
  directives: [ProjectDetail, ProjectList],
  providers: [ProjectProvider],
  pipes: [ProjectSort]
})
export class ProjectsPage {
  nav: NavController;
  projectQuery: string;
  projects: Array<Project>;
  filtered_projects: Array<Project>;
  searchActive: boolean;

  constructor(nav: NavController, private _projectProvider: ProjectProvider) {
    this.nav = nav;
    this.projectQuery = '';
    this.projects = [];
    this.searchActive = false;
  }

  getProjects() {
    this._projectProvider.getProjects().then(projects => {
      this.projects = projects;
      this.filtered_projects = this.projects;
    });
  }

  ngOnInit() {
    this.getProjects();
  }

  toggleSearchActive() {
    this.searchActive = !this.searchActive;
  }

  createProject(button) {
    let modal = Modal.create(CreateProjectModal);
    this.nav.present(modal);
    modal.onDismiss(project => {
      if (project != null) {
        this.projects.push(project);
      }
    });
  }
}
