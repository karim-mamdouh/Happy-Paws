import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  loggedIn: string = ''; //Login flag for local storage

  constructor() {}

  ngOnInit(): void {
    this.loggedIn = localStorage.getItem('token')!;
  }
  //Function to logout user by setting token to false and refreshing page
  logout(): void {
    localStorage.setItem('token', JSON.stringify(false));
    if (window.location.href.includes('github')) {
      let temp = window.location.href;
      let base = temp.substring(0, temp.indexOf('io/') + 3);
      let url = temp.replace(base, '');
      window.location.href = base + url.substring(0, url.indexOf('/') + 1);
    } else {
      window.location.href = '/';
    }
  }
}
