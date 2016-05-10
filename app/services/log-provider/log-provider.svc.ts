import {Injectable} from 'angular2/core';
import {Log} from '../../shared/interfaces/log';

let PouchDB = require('pouchdb');

@Injectable()
export class LogProvider {
  private _db: any;
  private _logs;

  constructor() {
    this.initDB();
  }

  private initDB() {
    this._db = new PouchDB(
      'xpsp-log',
      {adapter: 'websql', iosDatabaseLocation: 'default'}
    );
  }

  private findIdx(array, id) {
    let low: number = 0;
    let high: number = array.length, mid;
    while (low < high) {
      mid = (low + high) >>> 1;
      array[mid]._id < id ? low = mid + 1 : high = mid;
    }
    return low;
  }

  private onDBChange(change: any){
    let idx = this.findIdx(this._logs, change.id);
    let log = this._logs[idx];

    if (change.deleted) {
      if (log) {
        // delete
        this._logs.splice(idx, 1);
      }
    } else {
      if (log && (log._id === change.id)) {
        // update
        this._logs[idx] = change.doc;
      } else {
        // insert
        this._logs.splice(idx, 0, change.doc);
      }
    }
  }

  public addLog(log: Log){
    return this._db.post(log);
  }

  public getLogs() {
    if (!this._logs) {
      return this._db.allDocs({include_docs: true})
        .then(docs => {
          this._logs = docs.rows.map(row => {
            return row.doc;
          });

          this._db.changes({live: true, since: 'now', include_docs: true})
            .on('change', this.onDBChange);

          return this._logs;
        });
    } else {
      return Promise.resolve(this._logs);
    }
  }

  public getLogsByProject(projectId): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.getLogs().then((logs) => {
        resolve(
          this._logs.filter((log) => {
            return (log.projectId === projectId)
          })
        );
      });
    });
    return promise;
  }

  public getLogsByActivity(activityId): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.getLogs().then((logs) => {
        resolve(
          this._logs.filter((log) => {
            return (log.activityId === activityId)
          })
        );
      });
    });
    return promise;
  }
}
