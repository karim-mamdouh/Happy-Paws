import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/profile';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user = {} as User;

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {}
}
