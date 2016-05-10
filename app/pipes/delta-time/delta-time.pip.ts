import {Pipe, PipeTransform} from 'angular2/core';
import {Log} from '../../shared/interfaces/log';

@Pipe({name: 'deltaTime'})
export class DeltaTimePipe implements PipeTransform {
  transform (value: Array<Log>): number {
    if(!value) return 0;
    let total: number = 0;
    value.forEach((log: Log) => {
      total += (log.endTime - log.startTime);
    });
    return total;
  }
}
