import {Component, Input} from 'angular2/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';
import {Project} from '../../shared/interfaces/project';
import {ProjectDetail} from '../project-detail/project-detail.cmp';

@Component({
  selector: 'project-list',
  templateUrl: 'build/components/project-list/project-list.cmp.html',
  styleUrls: [],
  providers: [],
  directives: [IONIC_DIRECTIVES, ProjectDetail],
  pipes: []
})
export class ProjectList {

  @Input() projects: Array<Project>;

  constructor() {}

}
