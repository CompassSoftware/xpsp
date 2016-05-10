import {Injectable} from 'angular2/core';

let PouchDB = require('pouchdb');


@Injectable()
export class ActivityProvider {
  private _db;
  private _activities;

  constructor() {
    this.initDB();
  }

  initDB() {
    this._db = new PouchDB(
      'xpsp-activity',
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

  private onDBChange(change){
    var idx = this.findIdx(this._activities, change.id);
    var activity = this._activities[idx];

    if (change.deleted) {
      if (activity) {
        // delete
        this._activities.splice(idx, 1);
      }
    } else {
      if (activity && (activity._id === change.id)) {
        // update
        this._activities[idx] = change.doc;
      } else {
        // insert
        this._activities.splice(idx, 0, change.doc);
      }
    }
  }

  addActivity(activity, parent=null) {
    if (parent === null) {
      activity.level = 0;
      return this._db.post(activity);
    } else {
      activity.level = parent.level + 1;
      this._db.post(activity).then(result => {
        this._db.get(result.id).then(activity => {
          parent.children.push(activity);
          return this._db.put(parent);
        });
      });
    }
  }

  removeActivity(activity, parent) {
    if (typeof parent != 'undefined') {
      this._db.get(parent._id).then(parent => {
        parent.children.splice(parent.children.indexOf(activity), 1);
        this._db.put(parent);
      });
    }
    for (var child in activity.children) {
      this._db.remove(child);
    }
    return this._db.remove(activity);
  }

  updateActivity(activity) {
    return this._db.put(activity);
  }

  getActivities() {
    if (!this._activities) {
      return this._db.allDocs({include_docs: true})
        .then(docs => {
          this._activities = docs.rows.map(row => {
            return row.doc;
          });

          this._db.changes({live: true, since: 'now', include_docs: true})
            .on('change', this.onDBChange);

          return this._activities;
        });
    } else {
      return Promise.resolve(this._activities);
    }
  }
}
