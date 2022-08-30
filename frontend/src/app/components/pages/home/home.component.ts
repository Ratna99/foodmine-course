import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  foods: Food[] = [];

  constructor(
    private foodService: FoodService,
    activatedRoute: ActivatedRoute
  ) {
    let foodObservable: Observable<Food[]>;

    activatedRoute.params.subscribe((params) => {
      if (params.searchTerm) {
        foodObservable = this.foodService.getAllFoodBySearchTerm(
          params.searchTerm
        );
      } else if (params.tag) {
        foodObservable = this.foodService.getAllFoodByTag(params.tag);
      } else {
        foodObservable = this.foodService.getAll();
      }
      foodObservable.subscribe((serverFood) => {
        this.foods = serverFood;
      });
    });
  }

  ngOnInit(): void {}
}
