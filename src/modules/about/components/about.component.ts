import { Component } from '@angular/core';
import { DynamicTitleService } from '../../../shared/services/dynamic-title.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  constructor(
    private readonly translate: TranslateService,
    private readonly dynamicTitleService: DynamicTitleService,
  ) {
    this.dynamicTitleService.setTitle('about.head-title');
  }
}
