import { Component } from '@angular/core';
import { User } from '../../models/user';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-acceuil',
  standalone: false,
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.scss'
})
export class AcceuilComponent {
  username : string = '';

  constructor(private loginService: LoginService,) {
  }

  ngOnInit() {
    if (this.loginService.getUserFromToken() != null) {
      const user = this.loginService.getUserFromToken();
      if (user) {
        this.username = user.username;
      }
    }
    
  }
}
