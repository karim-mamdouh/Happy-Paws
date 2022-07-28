import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Happy Paws';
  showNavbarFooter: boolean = false;
  constructor(private _router: Router, private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this._router.events.subscribe((event: any) => {
      if (event.url !== undefined && event.type === 1) {
        if (event.url.includes('login') || event.url.includes('register'))
          this.showNavbarFooter = false;
        else this.showNavbarFooter = true;
      }
    });
  }
}
