import {Page} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/projects/projects.html'
})
export class ProjectsPage {
  projectQuery: string;
  projects: Array<any>;

  constructor() {
    this.projectQuery = '';
    this.initializeProjects();
  }

  initializeProjects() {
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
