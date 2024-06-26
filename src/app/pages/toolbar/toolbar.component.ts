import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit{
  constructor(private _userService:UserService,
              private _router:Router,
  ) {

  }

  ngOnInit(): void {

  }
  MyProfile(){
    this._router.navigate([`/navigation/profile`])
  }
  isUserLogged(){
    return this._userService.isLogged();
  }
}
