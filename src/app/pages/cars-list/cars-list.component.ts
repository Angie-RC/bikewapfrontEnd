import {Component, OnInit} from '@angular/core';
import {Cars} from "../../models/Cars";
import {CarsService} from "../../services/cars.service";

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.css']
})
export class CarsListComponent implements OnInit{
  cars: Cars[] = [];

  constructor(private carService: CarsService) {}

  ngOnInit() {
    this.getCarList();
  }

  getCarList() {
    this.carService.getCars().subscribe(
      (data: Cars[]) => {
        this.cars = data;
      },
      (error) => {
        console.error('Error fetching car list:', error);
      }
    );
  }
}
