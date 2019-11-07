import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Order } from '../interfaces/model';
import { OrderService } from '../services/order/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent implements OnInit {

  dataSource: any;
  order_all_list: any[];
  displayedColumns: string[] = ["id", "comment", "payment", "transactionId", "price", "actions"];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  constructor(private router: Router, private orderService: OrderService) { }

  ngOnInit() {


    this.orderService.getAllOrders().subscribe(data => {
      //  console.log('data->',JSON.parse( data['_body']));
      let res = JSON.parse(data['_body']);
      this.order_all_list = res.data;
      console.log('data->', this.order_all_list);
      this.dataSource = new MatTableDataSource<Order>(this.order_all_list);
      this.dataSource.paginator = this.paginator;

      console.log('datasource: ', this.dataSource);
    });
  }

  onViewEdit(id: number) {
    console.log('Here is onViewEdit: ', id);
    this.router.navigate(['/editproduct', id]);
  }

  onDelete() {
    
  }

}




