// dashboard.component.ts
import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import { MenuAplicacionResponse } from './model/menu.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [
    CommonModule, RouterModule
  ]
})
export class DashboardComponent {
  isSidebarCollapsed = false;
  activeSubmenus: { [key: string]: boolean } = {};
  isMobileView = false;
  showOverlay = false;
  currentRoute = '';
  menus: MenuAplicacionResponse[] = [];
  constructor(
    private router: Router,
    private _menuService: MenuService
  ) {
    this.checkScreenSize();
    this.currentRoute = this.router.url;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });

    this.obtenerMenu();
  }


  obtenerMenu() {
    this._menuService.getMenu().subscribe({
      next: (data: MenuAplicacionResponse[]) => {
        this.menus = data;
      },
      error: (error) => { console.error('Error fetching menu:', error); },
      complete: () => { }
    });
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    this.showOverlay = this.isMobileView && !this.isSidebarCollapsed;
  }

  toggleSubmenu(menuKey: string): void {
    this.activeSubmenus[menuKey] = !this.activeSubmenus[menuKey];
  }

  closeOnMobile(): void {
    if (this.isMobileView) {
      this.isSidebarCollapsed = true;
      this.showOverlay = false;
    }
  }

  isActiveSubroute(route: string): boolean {
    return this.currentRoute.includes(route);
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize(): void {
    const wasMobile = this.isMobileView;
    this.isMobileView = window.innerWidth <= 768;

    if (this.isMobileView) {
      this.isSidebarCollapsed = true;
      this.showOverlay = false;
    } else if (wasMobile && !this.isMobileView) {
      this.isSidebarCollapsed = false;
      this.showOverlay = false;
    }
  }
}
