import {Injectable} from 'angular2/core';

let PouchDB = require('pouchdb');

@Injectable()
export class ProjectProvider {
  private _db;
  private _projects;

  constructor() {
    this.initDB();
  }

  initDB() {
    this._db = new PouchDB(
      'xpsp-project',
      {adapter: 'websql', iosDatabaseLocation: 'default'}
    );
  }

  private findIdx(array, id) {
    var low = 0, high = array.length, mid;
    while (low < high) {
      mid = (low + high) >>> 1;
      array[mid]._id < id ? low = mid + 1 : high = mid
    }
    return low;
  }

  private onDBChange = (change) => {
    var idx = this.findIdx(this._projects, change.id);
    var project = this._projects[idx];

    if (change.deleted) {
      if (project) {
        // delete
        this._projects.splice(idx, 1);
      }
    } else {
      if (project && (project._id === change.id)) {
        // update
        this._projects[idx] = change.doc;
      } else {
        // insert
        this._projects.splice(idx, 0, change.doc);
      }
    }
  }

  addProject(project) {
    return this._db.post(project);
  }

  removeProject(project) {
    return this._db.remove(project);
  }


  getProjects() {
    if (!this._projects) {
      return this._db.allDocs({include_docs: true})
        .then(docs => {
          this._projects = docs.rows.map(row => {
            return row.doc;
          });

          this._db.changes({live: true, since: 'now', include_docs: true})
            .on('change', this.onDBChange);

          return this._projects;
        });
    } else {
      return Promise.resolve(this._projects);
    }
  }
}
