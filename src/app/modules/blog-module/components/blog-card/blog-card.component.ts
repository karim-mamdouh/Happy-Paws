import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/interfaces/blog';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss'],
})
export class BlogCardComponent implements OnInit {
  @Input() article = {} as Article; //Article object to be viewed

  constructor(private _router: Router) {}

  ngOnInit(): void {}
  // Navigates to details page
  goToBlogDetails(): void {
    this._router.navigate(['/blog/details'], {
      queryParams: { id: this.article.id },
    });
  }
}
