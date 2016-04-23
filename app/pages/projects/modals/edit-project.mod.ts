
import {FormBuilder, Validators} from 'angular2/common';
import {IONIC_DIRECTIVES, Page, Modal, ViewController, NavController, NavParams} from 'ionic-angular';
import {Project} from '../../../shared/interfaces/project';

@Page({
  templateUrl :'build/pages/projects/modals/edit-project.mod.html',
  directives: [IONIC_DIRECTIVES]
})
export class EditProjectModal {
  viewCtrl: ViewController;
  editForm: any;
  projectData: any;
  project: Project;

  constructor(params: NavParams, viewCtrl: ViewController, form: FormBuilder) {
    this.project = params.get('project');
    this.viewCtrl = viewCtrl;
    this.editForm = form.group({
      name: [this.project.name],
      description: [this.project.description],
      tags: [this.project.tags.join()]
    });
  }

  edit(event) {
    this.projectData = {
      name: this.editForm.value.name,
      description: this.editForm.value.description,
      tags: this.editForm.value.tags.split(','),
    };
    // event.preventDefault();
    this.close(true);
  }

  close(push: boolean = false) {
    this.viewCtrl.dismiss((push ? this.projectData :null));
  }
}
