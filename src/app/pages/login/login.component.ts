import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{

  formLogin : FormGroup
  errorMessage: string | null = null;
  constructor(private formBuilder: FormBuilder,
              private _userService:UserService, private router: Router) {

    this.formLogin = this.formBuilder.group({
      email:['', [Validators.required, Validators.email]],
      password:['', Validators.required]
    })

  }

  ngOnInit(): void {

  }

  onLogin(){
    if (this.formLogin.valid) {
      this._userService.login(this.formLogin.value).subscribe(
        (data: any) => {
          console.log('Login successful', data);
          this._userService.validateLogin(data);
          console.log('userId in sessionStorage:', window.sessionStorage.getItem('userId'));
          this.router.navigate(['/navigation/home']);
        },
        error => {
          console.log('Login error', error);
          this.errorMessage = 'Error al iniciar sesión. Verifica tus credenciales.';
        }
      );
    } else {
      this.errorMessage = 'Por favor, completa correctamente el formulario.';
    }
  }

}
