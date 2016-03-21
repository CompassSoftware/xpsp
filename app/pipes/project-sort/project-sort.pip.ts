import {Pipe, PipeTransform} from 'angular2/core';
import {Project} from '../../shared/interfaces/project';

@Pipe({name: 'projectSort'})
export class ProjectSort implements PipeTransform {
  transform(value:Array<Project>, args:string[]) : any {
    let query = args[0];
    if (query.trim() == '') {
      return value;
    } else {
      return value.filter((elem) => {
        return (elem.name.toLowerCase().indexOf(query.toLowerCase()) > -1)
      });
    }
  }
}
