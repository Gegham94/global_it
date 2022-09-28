import { Component, Input, OnChanges } from '@angular/core';
import { Testemonial } from '../../../../shared/interfaces/testemonial.interface';

@Component({
  selector: 'app-home-testemonial',
  templateUrl: './home-testemonial.component.html',
  styleUrls: ['./home-testemonial.component.scss'],
})
export class HomeTestemonialComponent implements OnChanges {
  @Input() rightImage?: boolean = false;

  @Input() primary?: boolean = false;

  @Input() testemonialInfo!: Testemonial;

  public isExpanded: boolean = false;

  public showExpanded: boolean = false;

  public ngOnChanges() {
    this.showExpanded = this.testemonialInfo.description.length > 640;
  }

  public setExpanded(expanded: boolean): void {
    this.isExpanded = expanded;
  }

  get aboutText(): string {
    return this.testemonialInfo.description.length > 640 && !this.isExpanded
      ? this.testemonialInfo.description.slice(0, 640) + '...'
      : this.testemonialInfo.description;
  }
}
