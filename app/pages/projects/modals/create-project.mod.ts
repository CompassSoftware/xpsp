
import {FormBuilder, Validators} from 'angular2/common';
import {Page, Modal, ViewController, NavController, NavParams} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/projects/modals/create-project.mod.html'
})
export class CreateProjectModal {
  viewCtrl: ViewController;
  projectForm: any;
  projectData: any;

  constructor(viewCtrl: ViewController, form: FormBuilder) {
    this.viewCtrl = viewCtrl;
    this.projectForm = form.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      tags: ['', Validators.required]
    });
  }

  create(event) {
    this.projectData = {
      name: this.projectForm.value.name,
      description: this.projectForm.value.description,
      tags: this.projectForm.value.tags.split(","),
      delta_time: 0,
      active: false
    };
    event.preventDefault();
    this.close(true);
  }

  close(push: boolean = false) {
    this.viewCtrl.dismiss((push ? this.projectData : null));
  }
}
