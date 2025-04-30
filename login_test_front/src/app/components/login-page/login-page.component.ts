import { Component } from '@angular/core';
import { FormsModule, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login-page',
  standalone: false,
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  loginForm: FormGroup;

  constructor(private loginService: LoginService, private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    // Vider le localStorage
    localStorage.clear();
  }

  onSubmit() {
    if(this.loginForm.valid) {
      const loginRequest = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      };

      this.loginService.login(loginRequest).subscribe({
        next: (response : any) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/acceuil']);
          alert("Connexion réussie !");
        },
        error: (error : any) => {
          alert("Erreur lors de la connexion : " + error.error);
        }
      });
    }
  }

  onRegister() {
    if(this.loginForm.valid) {
      const registerRequest = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
        role: 'user'
      };

      this.loginService.register(registerRequest).subscribe({
        next: (response : any) => {
          alert("Inscription réussie !");
        },
        error: (error : any) => {
          alert("Erreur lors de l'inscription : " + error.error);
        }
      });
    }
  }
}
