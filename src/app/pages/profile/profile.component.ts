import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Users} from "../../models/Users";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  notPhotoProfile:string = "./assets/images/imgUserBlack.png"

  userId:number
  user!:Users
  formUser:FormGroup
  showAlert = false
  constructor(public _userService:UserService,
              private _router:Router,
              private _formBuild:FormBuilder) {
    this.userId = this._userService.userId
    this.formUser=this._formBuild.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.getUser()
  }
  getUser(){
    this._userService.getById(this.userId).subscribe((data)=>{
      this.user = data
      this.formUser.patchValue(this.user)
    })
  }
  updateUser(){
    if(this.formUser.valid){
      this.user.id = this.userId;
      this.user.name = this.formUser.get('name')?.value;
      this.user.lastName = this.formUser.get('lastName')?.value;
      this.user.firstName = this.formUser.get('firstName')?.value;

      console.log(this.user)
      this._userService.update(this.user).subscribe(()=>{
        //this._router.navigate(['/list-posts'])
      })
    }else{
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false
      }, 2000);
    }
  }
  logOut(){
    this._userService.logOut()

    this._router.navigate(['/navigation/login'])
  }

}
