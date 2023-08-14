import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  constructor(private authService: AuthService,
              private router: Router) {}

  logout() {
    this.authService.logout().then( () => {
      this.router.navigateByUrl('/login')
    });
  }

}
