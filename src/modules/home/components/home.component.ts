import { Component } from '@angular/core';
import { DynamicTitleService } from '../../../shared/services/dynamic-title.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    private readonly translate: TranslateService,
    private readonly title: DynamicTitleService,
  ) {
    this.title.setTitle('home.title');
  }
}
