import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  open_time: any ;
  close_time: any;
  constructor() { }

  ngOnInit() {
   this.open_time = {hour: 13, minute: 30};
   this.close_time = {hour: 13, minute: 30};
  }

}
