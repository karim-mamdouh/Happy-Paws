import { Component, OnInit } from '@angular/core';
import { AnimalType } from 'src/app/interfaces/adoption';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  loggedIn: string = ''; //Login flag for local storage
  cat: AnimalType = AnimalType.Cat;
  dog: AnimalType = AnimalType.Dog;

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this.loggedIn = localStorage.getItem('token')!;
  }
  //Function to logout user by setting token to false and refreshing page
  logout(): void {
    this._authService.logout().then(() => {
      localStorage.clear();
      if (window.location.href.includes('github')) {
        let temp = window.location.href;
        let base = temp.substring(0, temp.indexOf('io/') + 3);
        let url = temp.replace(base, '');
        window.location.href = base + url.substring(0, url.indexOf('/') + 1);
      } else {
        window.location.href = '/';
      }
    });
  }
}
