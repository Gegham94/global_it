import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DynamicTitleService } from '../../../shared/services/dynamic-title.service';

@Component({
  selector: 'app-stamps-and-postcards',
  templateUrl: './stamps-and-postcards.component.html',
  styleUrls: ['./stamps-and-postcards.component.scss'],
})
export class StampsAndPostcardsComponent {
  constructor(
    private readonly translate: TranslateService,
    private readonly dynamicTitleService: DynamicTitleService,
  ) {
    this.dynamicTitleService.setTitle('stamps-and-postcards.head-title');
  }

  public readonly archivePhotos: string[] = [
    './assets/images/stamps-photo-archive/photo-1.jpg',
    './assets/images/stamps-photo-archive/photo-2.jpg',
    './assets/images/stamps-photo-archive/photo-3.jpg',
    './assets/images/stamps-photo-archive/photo-4.jpg',
    './assets/images/stamps-photo-archive/photo-5.jpg',
    './assets/images/stamps-photo-archive/photo-6.jpg',
    './assets/images/stamps-photo-archive/photo-7.jpg',
    './assets/images/stamps-photo-archive/photo-8.jpg',
    './assets/images/stamps-photo-archive/photo-9.jpg',
    './assets/images/stamps-photo-archive/photo-10.jpg',
    './assets/images/stamps-photo-archive/photo-11.jpg',
    './assets/images/stamps-photo-archive/photo-12.jpg',
    './assets/images/stamps-photo-archive/photo-13.jpg',
    './assets/images/stamps-photo-archive/photo-14.jpg',
    './assets/images/stamps-photo-archive/photo-15.jpg',
    './assets/images/stamps-photo-archive/photo-16.jpg',
    './assets/images/stamps-photo-archive/photo-17.jpg',
    './assets/images/stamps-photo-archive/photo-18.jpg',
    './assets/images/stamps-photo-archive/photo-19.jpg',
    './assets/images/stamps-photo-archive/photo-20.jpg',
    './assets/images/stamps-photo-archive/photo-21.jpg',
    './assets/images/stamps-photo-archive/photo-22.jpg',
  ];

  public readonly stamps: { [key: string]: string } = {
    '2013': './assets/images/stamps/stamp-2013.png',
    '2018': './assets/images/stamps/stamp-2018.png',
  };

  public readonly exampleStamps: string[] = [
    './assets/images/stamp-examples/example1.jpg',
    './assets/images/stamp-examples/example2.jpg',
    './assets/images/stamp-examples/example3.jpg',
    './assets/images/stamp-examples/example4.jpg',
  ];
}
