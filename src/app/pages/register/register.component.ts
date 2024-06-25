import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  registerForm: FormGroup;

  constructor(private formBuilder:FormBuilder,
              private userService:UserService,
              private router:Router) {

    this.registerForm=this.formBuilder.group({
      name: ['',Validators.required],
      lastName: ['', Validators.required],
      firstName:['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

  }

  ngOnInit(): void {
  }

  register() {

      this.userService.createUser(this.registerForm.value).subscribe(
        (val:any)=>{
          this.router.navigate(['/navigation/login'])
        console.log("Registro exitoso")

      })

  }


}
