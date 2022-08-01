import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/interfaces/blog';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss'],
})
export class BlogCardComponent implements OnInit {
  @Input() article = {} as Article;

  constructor(private _router: Router) {
    this.article = {
      author: 'Yasmeen',
      body: [{ data: 'aaaaaaaa' }],
      title: 'Protect your pet',
      image: '',
      type: 'Cat',
    };
  }
  goToBlogDetails() {
    this._router.navigate(['/blog/details'], {
      queryParams: { article: this.article.author },
    });
  }
  ngOnInit(): void {}
}
