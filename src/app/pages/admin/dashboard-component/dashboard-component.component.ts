import { Component, inject, signal } from '@angular/core';
import { MaterialModule } from '../../../global/material.module';

@Component({
  selector: 'app-dashboard-component',
  imports: [MaterialModule],
  templateUrl: './dashboard-component.component.html',
  styleUrl: './dashboard-component.component.scss'
})
export class DashboardComponentComponent {
  users = signal<number>(100);
  products = signal<number>(50);
  persons = signal<number>(100);
}
