import {Component, Input} from 'angular2/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';
import {Activity} from '../../shared/interfaces/activity';
import {Icon} from '../../shared/interfaces/icon';
import {IconProvider} from '../../services/icon-provider/icon-provider.svc';


@Component({
  selector: 'activity-detail',
  templateUrl: 'build/components/activity-detail/activity-detail.cmp.html',
  styleUrls: [],
  providers: [IconProvider],
  directives: [IONIC_DIRECTIVES, ActivityDetail],
  pipes: []
})
export class ActivityDetail {
  private icons: Array<Icon>;

  @Input() activity: Activity;
  @Input() expanded: boolean;

  constructor(private _iconProvider: IconProvider) {
    this.icons = [];
  }

ngOnInit() {
  this.getIcons();
}
  getIcons(){
    this._iconProvider.getIcons().then(icons => {
      this.icons = icons;
    });
  }
}
