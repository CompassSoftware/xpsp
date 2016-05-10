export interface Activity {
  name: String,
  delta_time: number,
  icon: String,
  children: this[],
  level: number
}
