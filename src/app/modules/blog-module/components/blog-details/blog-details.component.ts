import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/interfaces/blog';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss'],
})
export class BlogDetailsComponent implements OnInit {
  article = {} as Article;
  constructor(private _activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    // this.article = this._activeRoute.snapshot.queryParams['article'] as Article;
    // console.log(this._activeRoute.snapshot.queryParams['article']);
    this.article = {
      author: 'Yasmeen',
      body: [{ data: 'aaaaaaaa' }],
      type: 'Cat',
      title: 'Protect your pet',
      image: '',
    };
  }
}
