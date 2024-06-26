import {Component, OnInit} from '@angular/core';
import {Cars} from "../../models/Cars";
import {CarsService} from "../../services/cars.service";
import {Bike} from "../../models/bike";
import {BikesService} from "../../services/bikes.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.css']
})
export class CarsListComponent implements OnInit{
  bikes: Bike[] = []

  constructor(private route:ActivatedRoute,
              private _bikeService:BikesService) {}

  ngOnInit() {
    this.getAllPost();
  }

  getAllPost() {
    this._bikeService.getAll().subscribe({
      next: (val: any) => {
        this.bikes = val;
      }
    });
  }
}
