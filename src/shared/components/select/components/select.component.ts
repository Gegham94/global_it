import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {
  AbstractValueAccessor,
  MakeAbstractValueAccessorProvider,
} from '../../../providers/abstract-value-accessor.provider';
import { SelectOption } from '../../../interfaces/select-option.interface';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  animations: [
    trigger('selectToggle', [
      state(
        'closed',
        style({
          height: 0,
          borderWidth: 0,
        }),
      ),
      state(
        'opened',
        style({
          height: '*',
          borderWidth: '1px',
        }),
      ),
      transition('closed => opened', [style({ height: '0' }), animate('0.15s ease-in')]),
      transition('opened => closed', [style({ height: '*' }), animate('0.15s ease-out')]),
    ]),
  ],
  providers: [MakeAbstractValueAccessorProvider(SelectComponent)],
})
export class SelectComponent extends AbstractValueAccessor implements AfterContentChecked {
  @Input()
  public optionList: SelectOption[] = [];

  @ViewChild('toggle')
  public selectToggle!: ElementRef;

  public optionListState: 'opened' | 'closed' = 'closed';

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: any,
  ) {
    super();
  }

  public optionSelected(value: string | number): void {
    this.value = value;
    this.setOptionListState('closed');
  }

  public setOptionListState(newState: 'opened' | 'closed'): void {
    this.optionListState = newState;
    this.changeDetectorRef.detectChanges();
  }

  public verticalPosition(): 'top' | 'bottom' {
    if (
      this.selectToggle?.nativeElement.getBoundingClientRect &&
      isPlatformBrowser(this.platformId)
    ) {
      const clientRect: DOMRect = this.selectToggle?.nativeElement.getBoundingClientRect();
      return clientRect &&
        clientRect.width &&
        clientRect.height &&
        window.innerHeight - (clientRect.y + clientRect.height) < 250
        ? 'top'
        : 'bottom';
    } else {
      return 'top';
    }
  }

  public ngAfterContentChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  get selectedOption(): string | undefined {
    return this.optionList.find((option) => option.value === this.value)?.displayName;
  }
}
