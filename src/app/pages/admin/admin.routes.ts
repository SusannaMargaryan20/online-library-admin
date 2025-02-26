import { Routes } from "@angular/router";
import { AdminLayoutComponent } from "./admin-layout/admin-layout.component";

export const DASHBOARD_ROUTES: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./dashboard-component/dashboard-component.component').then(m => m.DashboardComponentComponent)
            },
            {
                path: 'users',
                loadComponent: () => import('./users-page/users-page.component').then(m => m.UsersPageComponent)
            },
            {
                path: 'products',
                loadComponent: () => import('./products-page/products-page.component').then(m => m.ProductsPageComponent)
            },
            {
                path: 'persons',
                loadComponent: () => import('./persons-page/persons-page.component').then(m => m.PersonsPageComponent)
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: '**',
                redirectTo: 'dashboard'
            }
        ]
    }

]