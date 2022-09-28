import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NewsApiService } from '../../../shared/services/news-api.service';
import { Committee } from '../../../shared/interfaces/committee.interface';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { DynamicTitleService } from '../../../shared/services/dynamic-title.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-committee',
  templateUrl: './committee.component.html',
  styleUrls: ['./committee.component.scss'],
})
export class CommitteeComponent implements OnInit {
  public chairmanList: Committee[] = [];

  public selectionPanelList: Committee[] = [];

  private committeeSubscription?: Subscription;

  constructor(
    public readonly newsApiService: NewsApiService,
    private readonly translate: TranslateService,
    private readonly dynamicTitleService: DynamicTitleService,
    @Inject(PLATFORM_ID) private platformId: any,
  ) {
    this.dynamicTitleService.setTitle('committee.head-title');
  }

  public ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.fetchCommitteeList();
      this.translate.onLangChange.subscribe(() => this.fetchCommitteeList(true));
    }
  }

  private fetchCommitteeList(languageChanged: boolean = false): void {
    if (languageChanged) {
      this.committeeSubscription?.unsubscribe();
      this.selectionPanelList = [];
      this.chairmanList = [];
    }

    this.committeeSubscription = this.newsApiService
      .getCommittee()
      .subscribe((data: Committee[]): void => {
        this.chairmanList = data.filter((committee: Committee) => !+committee.selection_panel);
        this.selectionPanelList = data.filter((committee: Committee) => +committee.selection_panel);
      });
  }
}
