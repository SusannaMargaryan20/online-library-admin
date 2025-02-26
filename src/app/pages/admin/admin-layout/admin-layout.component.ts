import { Component, HostListener, inject, signal } from '@angular/core';
import { HeaderComponent } from "../../../global/components/header/header.component";
import { RouterModule, RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../../global/material.module';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterModule, HeaderComponent, RouterOutlet, MaterialModule, NgClass],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {

  isMenuOpened = signal(true);
  isMobile = signal(false);


  ngOnInit() {
    this.checkIsMobile();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkIsMobile();
  }


  checkIsMobile() {
    if (window.innerWidth > 768) {
      this.isMobile.set(false);
      this.isMenuOpened.set(true);
    } else if (window.innerWidth <= 768) {
      this.isMobile.set(true);
      this.isMenuOpened.set(false);
    }

  }


  navigatePage() {
   if(this.isMobile())  {
    this.isMenuOpened.set(false);
   }
  }
}
