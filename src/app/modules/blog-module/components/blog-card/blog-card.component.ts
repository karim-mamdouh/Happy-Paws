import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/blog';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss'],
})
export class BlogCardComponent implements OnInit {
  @Input() article = {} as Article;

  constructor() {
    this.article = {
      author: 'Yasmeen',
      body: [{ data: 'aaaaaaaa' }],
      title: 'Protect your pet',
      image: '',
    };
  }

  ngOnInit(): void {}
}
