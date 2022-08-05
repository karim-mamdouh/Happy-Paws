import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Article } from 'src/app/interfaces/blog';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss'],
})
export class BlogDetailsComponent implements OnInit {
  article = {} as Article; //Article object to be viewed
  blogData: Observable<{ blog: Array<Article> }> = new Observable();
  constructor(
    private _activeRoute: ActivatedRoute,
    private _store: Store<{ blog: { blog: Array<Article> } }>
  ) {}

  ngOnInit(): void {
    this.blogData = this._store.select('blog');
    this.blogData.subscribe((res) => {
      let result = res.blog.find(
        (element) => element.id === this._activeRoute.snapshot.queryParams['id']
      );
      if (result) this.article = result;
    });
  }
}
