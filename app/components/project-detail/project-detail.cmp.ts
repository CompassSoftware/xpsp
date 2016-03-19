import {Component} from 'angular2/core';
import {Input} from 'angular2/core';
import {Project} from '../../shared/interfaces/project';

@Component({
  selector: 'project-detail',
  templateUrl: 'build/components/project-detail/project-detail.cmp.html',
  styleUrls: [],
  providers: [],
  directives: [],
  pipes: []
})
export class ProjectDetail {

  @Input() project: Project;

  constructor() {}
}
