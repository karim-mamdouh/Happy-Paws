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
  activeURL: string = '';

  constructor(private _router: Router, private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this._router.events.subscribe((event: any) => {
      if (event.url !== undefined && event.type === 1)
        this.activeURL = event.url;
    });
  }
}
