import { Component, Input, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Animal } from 'src/app/interfaces/adoption';

@Component({
  selector: 'app-animal-card',
  templateUrl: './animal-card.component.html',
  styleUrls: ['./animal-card.component.scss'],
})
export class AnimalCardComponent implements OnInit {
  @Input() animal = {} as Animal;
  constructor(private _router: Router) {}
  display: boolean = false;
  ngOnInit(): void {}
  goToDetails() {
    //this._router.navigate(['/adoption/animal-detail']);
    this.display = true;
  }
}
