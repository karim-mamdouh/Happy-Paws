import { Component, Input, OnInit } from '@angular/core';
import { Animal } from 'src/app/interfaces/adoption';

@Component({
  selector: 'app-animal-details',
  templateUrl: './animal-details.component.html',
  styleUrls: ['./animal-details.component.scss'],
})
export class AnimalDetailsComponent implements OnInit {
  @Input() animal = {} as Animal; // Animal object to be viewed

  constructor() {}

  ngOnInit(): void {}
}
