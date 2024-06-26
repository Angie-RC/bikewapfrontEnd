import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Bike} from "../../../models/bike";
import {BikesService} from "../../../services/bikes.service";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-bike-form',
  templateUrl: './bike-form.component.html',
  styleUrls: ['./bike-form.component.css']
})
export class BikeFormComponent implements OnInit, AfterViewInit{
  bikeForm: FormGroup;

  @Input()isInBikes:boolean=false
  @Input()editMode:boolean = false
  @Input()bike:Bike
  @Output()editBike = new EventEmitter<Bike>()
  @Output()cancelEdit=new EventEmitter<boolean>()
  constructor(private formBuilder: FormBuilder,
              private _bikeService:BikesService,
              private _router:Router,
              private _userService:UserService) {

    this.bikeForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      model: ['', Validators.required],
      image: ['', Validators.required],
    });

    this.bike = {
      id:0,
      name: '',
      description: '',
      price: 0,
      model: '',
      image: '',
    };
  }

  ngAfterViewInit() {
    if (this.editMode) {
      this.bikeForm.setValue({
        name: this.bike.name,
        description: this.bike.description,
        price: this.bike.price,
        model: this.bike.model,
        image: this.bike.image,
      });
    }
  }

  ngOnInit(): void {
  }

  bikeValuesFromForm() {
    this.bike = {
      id: this.bike && this.bike.id ? this.bike.id : 0,
      name: this.bikeForm.get('name')?.value,
      description: this.bikeForm.get('description')?.value,
      price: this.bikeForm.get('price')?.value,
      model: this.bikeForm.get('model')?.value,
      image: this.bikeForm.get('image')?.value,
    };
  }

  addBike() {
    if (this.bikeForm.valid) {
      this.bikeValuesFromForm()

      if (this.editMode) {
        this.editBike.emit(this.bike);
      }else{
        this._bikeService.createBike(this.bike).subscribe(() => {
          if(this.isInBikes){
            this.isInBikes=false
            this.cancelEdit.emit(true)
          }else {
            this._router.navigate(['/navigation/home']);
          }
        });
      }

    } else {
      alert("Please complete all the fields");
    }
  }

  onCancelEdit() {
    if(this.isInBikes){
      this.isInBikes=false
      this.cancelEdit.emit(true)
    }else {
      window.history.back()
    }

  }

}
