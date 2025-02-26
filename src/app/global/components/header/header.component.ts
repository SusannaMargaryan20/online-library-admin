import { Component, computed, inject, Input, signal } from '@angular/core';
import { NgIf, NgStyle } from '@angular/common';
import { AuthService } from '../../../api/helpers/auth-service.service';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-header',
  imports: [MaterialModule, NgStyle],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @Input() isOpenedMenuShow = signal(false);
  private authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }

 
}
