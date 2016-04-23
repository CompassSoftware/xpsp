export interface Activity {
  name: String,
  delta_time: String,
  icon: String,
  children: this[],
  level: number
}
