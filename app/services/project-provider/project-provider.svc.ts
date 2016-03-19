import {Injectable} from 'angular2/core';
import {Project} from '../../shared/interfaces/project';
import {PROJECTS} from './mock-projects';

@Injectable()
export class ProjectProvider {

  constructor() {}

  getProjects() {
    return Promise.resolve(PROJECTS);
  }
}
