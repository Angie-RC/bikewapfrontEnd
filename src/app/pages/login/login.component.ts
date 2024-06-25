import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{

  formLogin : FormGroup

  constructor(private formBuilder: FormBuilder,
              private _userService:UserService) {

    this.formLogin = this.formBuilder.group({
      email:['', [Validators.required, Validators.email]],
      password:['', Validators.required]
    })


  }


  ngOnInit(): void {
    console.log("Hello this is login design this was completed by user x")
  }


  onLogin(){

    if(this.formLogin.valid){
      this._userService.login(this.formLogin.get("email")?.value, this.formLogin.get("password")?.value)

    }else{
      alert("Illegal arguments")
    }
  }


}
