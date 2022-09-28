import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { SelectOption } from '../../../interfaces/select-option.interface';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  public isMobileMenuToggled: boolean = false;

  public readonly languageList: SelectOption[] = environment.locales.map(
    (locale: string): SelectOption => ({
      displayName: locale.toUpperCase(),
      value: locale,
    }),
  );

  public chosenLanguage: string = 'en';

  public searchText: string = '';

  constructor(
    public readonly translate: TranslateService,
    public readonly router: Router,
    private readonly toastrService: ToastrService,
  ) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.searchText = '';
      this.isMobileMenuToggled = false;
    });
  }

  public setMobileMenuToggled(newState: boolean): void {
    this.isMobileMenuToggled = newState;
  }

  public setLanguage(): void {
    this.translate.use(this.chosenLanguage);
  }

  public submitSearch(event: Event): void {
    event.preventDefault();
    if (this.searchText && this.searchText.length > 2) {
      this.router.navigate([this.translate.currentLang + '/search'], {
        queryParams: {
          query: this.searchText.replace(/[^\w\s]/gi, ''),
        },
        queryParamsHandling: 'merge',
      });
      this.searchText = '';
      this.isMobileMenuToggled = false;
    } else {
      this.translate.get('errors.search-length').subscribe((errorMessage: string): void => {
        this.toastrService.error(errorMessage);
      });
    }
  }
}
