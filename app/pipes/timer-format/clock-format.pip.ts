import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({name: 'clockFormat'})
export class ClockFormat implements PipeTransform {
  transform(value:number, args:string[]) : string {
  	if (isNaN(value)) {
  		return "00:00:00";
  	}
  	let sec: number = value;
  	let min: number = Math.floor(value / 60);
  	let hour: number = Math.floor(min / 60);
  	sec = sec % 60;
  	min = min % 60;
  	let output: string = this._extend(hour) + ":" + this._extend(min) + ":" + this._extend(sec);
  	return output;
  }

  private _extend(value: number) : string {
  	let extended: string = "00" + value;
  	return extended.substr(extended.length-2);
  }
}
