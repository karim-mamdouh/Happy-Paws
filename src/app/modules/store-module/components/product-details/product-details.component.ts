import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductItem, Review } from 'src/app/interfaces/store';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  checked1: boolean = false;
  checked2: boolean = true;

  product: ProductItem = {} as ProductItem;
  // Add review
  reviewRating: number = 3;
  comment?: string = '';

  constructor(private _router: ActivatedRoute, private _fireDatabase: DatabaseService) { }

  ngOnInit(): void {
    this._router.queryParams.subscribe((res) => {
      this.product = JSON.parse(res['product']);
    });
  }
  reset() {
    this.reviewRating = 3;
    this.comment = '';
  }
  onSubmitReviewClick(event: Event) {
    if (localStorage.getItem('userID') != null) {
      // Create a new Review object
      let reviewObject: Review = {} as Review;
      reviewObject.rate = this.reviewRating;
      reviewObject.userID = localStorage.getItem('userID')!;
      reviewObject.userName = 'Mahmoud Badawy';
      reviewObject.comment = this.comment ? this.comment : undefined;

      // get the old reviews array and add the new review to it 
      let oldReviews = this.product.reviews;
      this.product.reviews = [...oldReviews, reviewObject];

      // update the product reviews in the database
      this._fireDatabase.addReviewToProductItem(this.product).then(res => {
        alert("Successfually added Review");
        this.reset();

      }).catch(err => {
       alert(`Error adding your review, Please contact the support ${err}`);
      })
    }
    else {
      alert("Please Login first !");
    }

  }
}
