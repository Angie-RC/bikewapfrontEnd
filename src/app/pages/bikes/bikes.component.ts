import {Component, OnInit} from '@angular/core';
import {BikeService} from "../../public/shared/services/bikeservice/bike.service";
import {Bike} from "../../models/Bike";
import {Post} from "../../models/Post";
import {PostService} from "../../public/shared/services/postservice/post.service";

@Component({
  selector: 'app-bikes',
  templateUrl: './bikes.component.html',
  styleUrls: ['./bikes.component.css']
})
export class BikesComponent implements OnInit {
  combinedData: any[] = [];

  constructor(private bikeService: BikeService, private postService: PostService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.bikeService.getBikes().subscribe(
      (bikes: Bike[]) => {
        this.postService.getPosts().subscribe(
          (posts: Post[]) => {
            this.combinedData = bikes.map(bike => {
              const post = posts.find(p => p.bikeId === bike.id);
              return {
                ...bike,
                description: post ? post.description : 'No description available',
                pricePerHour: post ? post.pricePerHour : 'N/A',
                isActive: post ? post.isActive : false
              };
            });
          },
          (error) => {
            console.error('Error fetching posts', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching bikes', error);
      }
    );
  }
}

