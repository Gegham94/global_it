import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';
import { SelectOption } from '../../../interfaces/select-option.interface';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('searchToggle', [
      state(
        'closed',
        style({
          width: 0,
        }),
      ),
      state(
        'opened',
        style({
          width: '*',
        }),
      ),
      transition('closed => opened', [style({ width: '0' }), animate('0.3s')]),
      transition('opened => closed', [style({ width: '*' }), animate('0.3s')]),
    ]),
  ],
})
export class HeaderComponent implements OnInit {
  public isSearchEnabled: boolean = false;

  public searchText: string = '';

  public chosenLanguage: string = 'en';

  public readonly languageList: SelectOption[] = environment.locales.map(
    (locale: string): SelectOption => ({
      displayName: locale.toUpperCase(),
      value: locale,
    }),
  );

  constructor(
    public readonly router: Router,
    public readonly translate: TranslateService,
    private readonly toastrService: ToastrService,
  ) {}

  public ngOnInit(): void {
    this.initializeLanguage();
    this.translate.onLangChange.subscribe(() => this.initializeLanguage());
  }

  private initializeLanguage(): void {
    this.chosenLanguage = this.translate.currentLang ?? this.translate.defaultLang;
  }

  public setSearchMode(newState: boolean): void {
    this.isSearchEnabled = newState;
  }

  public submitSearch(): void {
    if (this.searchText && this.searchText.length > 2) {
      this.router.navigate([this.translate.currentLang + '/search'], {
        queryParams: {
          query: this.searchText.replace(/[^\w\s]/gi, ''),
        },
        queryParamsHandling: 'merge',
      });
      this.searchText = '';
    } else {
      this.translate.get('errors.search-length').subscribe((errorMessage: string): void => {
        this.toastrService.error(errorMessage);
      });
    }
  }

  public setLanguage(): void {
    this.translate.use(this.chosenLanguage);
  }
}
