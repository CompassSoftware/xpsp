import {FormBuilder, Validators} from 'angular2/common';
import {Page, Modal, ViewController, NavController, NavParams} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/projects/project-form.html'
})
class CreateProjectModal {
  viewCtrl: ViewController;
  projectForm: any;
  projectData: any;

  constructor(viewCtrl: ViewController, form: FormBuilder) {
    this.viewCtrl = viewCtrl;
    this.projectForm = form.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  create(event) {
    this.projectData = {
      name: this.projectForm.value.name,
      description: this.projectForm.value.description,
      delta_time: '00:00:00',
      active: false
    };
    event.preventDefault();
    this.close(true);
  }

  close(push: boolean = false) {
    this.viewCtrl.dismiss((push ? this.projectData : null));
  }
}

@Page({
  templateUrl: 'build/pages/projects/projects.html'
})
export class ProjectsPage {
  nav: NavController;
  projectQuery: string;
  projects: Array<any>;

  constructor(nav: NavController) {
    this.nav = nav;
    this.projectQuery = '';
    this.initializeProjects();
  }

  initializeProjects() {
    // TODO: Retrieve projects from server,
    // NOTE: Hard-coded test data
    this.projects = [{
      name: 'Project 1',
      description: 'A description of Project 1',
      delta_time: '09:30:22',
      active: false
    }, {
      name: 'Project 2',
      description: 'A description of Project 2',
      delta_time: '10:11:55',
      active: true
    }, {
      name: 'Project 3',
      description: 'A description of Project 3',
      delta_time: '03:20:11',
      active: false
    }];
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

  filterProjects(searchbar) {
    this.initializeProjects();
    var query = searchbar.value;
    if (query.trim() == '') {
      return;
    } else {
      this.projects = this.projects.filter((value) => {
        if (value.name.toLowerCase().indexOf(query.toLowerCase()) > -1) {
          return true;
        } else {
          return false;
        }
      });
    }
  }
}
