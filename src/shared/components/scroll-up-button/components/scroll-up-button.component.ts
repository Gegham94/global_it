import { Component, NgZone, OnInit } from '@angular/core';

@Component({
  selector: 'app-scroll-up-button',
  templateUrl: './scroll-up-button.component.html',
  styleUrls: ['./scroll-up-button.component.scss'],
})
export class ScrollUpButtonComponent implements OnInit {
  public buttonShown: boolean = false;

  constructor(private readonly zone: NgZone) {}

  public ngOnInit(): void {
    window.addEventListener('scroll', () => this.scrollHandler());
  }

  public scrollHandler(): void {
    this.zone.runOutsideAngular(() => {
      const scrolledSize =
        window.pageYOffset !== undefined
          ? window.pageYOffset
          : (document.documentElement || document.body.parentNode || document.body).scrollTo;

      this.buttonShown =
        scrolledSize > 1000 && scrolledSize < document.body.offsetHeight - window.innerHeight;
    });
  }

  public scrollToTop() {
    window.scrollTo({ top: 0 });
  }
}
