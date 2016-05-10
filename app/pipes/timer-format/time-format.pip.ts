import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({name: 'timeFormat'})
export class TimeFormat implements PipeTransform {
  transform(value:number, args:string[]) : string {
  	if (isNaN(value)) {
  		return "00:00:00";
  	}
  	let sec: number = value;
  	let min: number = Math.floor(value / 60);
  	let hour: number = Math.floor(min / 60);
  	sec = sec % 60;
  	min = min % 60;
    if (hour) {
      return (hour + 'hr ' + min + 'm');
    } else if (min) {
      return (min + 'm');
    } else {
      return (sec + 's');
    }
  }

}
