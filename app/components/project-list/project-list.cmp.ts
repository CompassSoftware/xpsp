import {Component} from 'angular2/core';
import {Input} from 'angular2/core';
import {Project} from '../../shared/interfaces/project';
import {ProjectDetail} from '../project-detail/project-detail.cmp';

@Component({
  selector: 'project-list',
  templateUrl: 'build/components/project-list/project-list.cmp.html',
  styleUrls: [],
  providers: [],
  directives: [ProjectDetail],
  pipes: []
})
export class ProjectList {

  @Input() projects: Array<Project>;

  constructor() {}
}
