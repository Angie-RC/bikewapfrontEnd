import {Bike} from "./Bike";

export interface Post {
  id: number;
  description: string;
  pricePerHour: number;
  isActive: boolean;
  bikeId: number;
}
