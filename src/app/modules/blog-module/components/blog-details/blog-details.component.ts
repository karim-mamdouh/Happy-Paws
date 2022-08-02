import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/interfaces/blog';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss'],
})
export class BlogDetailsComponent implements OnInit {
  article = {} as Article; //Article object to be viewed
  constructor(private _activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.article = {
      author: 'Yasmeen',
      body: [{ data: 'aaaaaaaa' }],
      type: 'Cat',
      title: 'Protect your pet',
      image: '',
    };
  }
}
