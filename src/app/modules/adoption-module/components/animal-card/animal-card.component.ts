import { Component, Input, OnInit } from '@angular/core';
import { Animal } from 'src/app/interfaces/adoption';

@Component({
  selector: 'app-animal-card',
  templateUrl: './animal-card.component.html',
  styleUrls: ['./animal-card.component.scss'],
})
export class AnimalCardComponent implements OnInit {
  @Input() animal = {} as Animal; //Animal object to be viewed
  showDetails: boolean = false; //Flag to show details window

  constructor() {}

  ngOnInit(): void {}
}
