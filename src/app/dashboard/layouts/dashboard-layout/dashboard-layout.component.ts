import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {

  private authService = inject( AuthService );
  public currentUser = computed(() => this.authService.currentUser())

  onLogout() {
    this.authService.logout();
  };

};
