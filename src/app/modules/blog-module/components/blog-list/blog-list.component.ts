import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Article } from 'src/app/interfaces/blog';
import { fillBlog } from 'src/app/store/blog/blog-actions';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
})
export class BlogListComponent implements OnInit {
  bloglist: Observable<{ blog: Array<Article> }> = new Observable(); //Observable to access store data

  constructor(private _store: Store<{ blog: { blog: Array<Article> } }>) {
    //this._store.dispatch(fillBlog({ payload: this.articles }));
  }

  ngOnInit(): void {
    this.bloglist = this._store.select('blog');
  }
}
