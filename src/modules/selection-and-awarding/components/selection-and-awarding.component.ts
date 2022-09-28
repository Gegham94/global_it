import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DynamicTitleService } from '../../../shared/services/dynamic-title.service';

@Component({
  selector: 'app-selection-and-awarding',
  templateUrl: './selection-and-awarding.component.html',
  styleUrls: ['./selection-and-awarding.component.scss'],
})
export class SelectionAndAwardingComponent {
  constructor(
    private readonly translate: TranslateService,
    private readonly dynamicTitleService: DynamicTitleService,
  ) {
    this.dynamicTitleService.setTitle('selection-and-awarding.head-title');
  }
}
