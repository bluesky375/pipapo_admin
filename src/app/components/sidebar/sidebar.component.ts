import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  // { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
  { path: '/restaurants', title: 'Restaurants', icon: 'restaurants', class: '' },
  { path: '/orders', title: 'Orders', icon: 'content_paste', class: '' },
  { path: '/products', title: 'Products', icon: 'library_books', class: '' },
  { path: '/gallery', title: 'Gallery', icon: 'bubble_chart', class: '' },
  { path: '/bonus', title: 'Bonus points', icon: 'location_on', class: '' },
  { path: '/contacts', title: 'Contact', icon: 'contacts', class: '' },
  { path: '/imprint', title: 'Imprint', icon: 'unarchive', class: '' },
  { path: '/rating', title: 'Rating', icon: 'unarchive', class: '' },
  { path: '/pushnotification', title: 'Push Notification', icon: 'unarchive', class: '' },  
  { path: '/user', title: 'User', icon: 'location_on', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}
