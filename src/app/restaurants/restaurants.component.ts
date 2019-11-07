import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RestaurantService } from '../services/restaurant/restaurant.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  open_time: any;
  close_time: any;
  seated_burst: number;
  guest_room: number;
  guest_garden: number;
  restaurant_id: number;

  constructor(private toastrService: ToastrService,
    private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.open_time = { hour: 0, minute: 0 };
    this.close_time = { hour: 0, minute: 0 };
    this.restaurant_id = 0;
    this.address = '';
    this.phone = '';
    this.email = '';
    this.website = '';
    this.name = '';
    this.description = '';
    this.seated_burst = null;
    this.guest_room = null;
    this.guest_garden = null;

    this.getRestaurant();
  }

  onSave() {
    let restaurant = {
      open: JSON.stringify(this.open_time),
      close: JSON.stringify(this.close_time),
      address: this.address,
      phone: this.phone,
      email: this.email,
      website: this.website,
      name: this.name,
      description: this.description,
      seated_burst: this.seated_burst,
      guest_garden: this.guest_garden,
      guest_room: this.guest_room
    }
   
    if (this.restaurant_id == 0) {   // create
      this.restaurantService.insertNewRestaurant(restaurant).subscribe(data => {
        let res = JSON.parse(data['_body']);
        if (res.success) {
          this.toastrService.success('Restaurant has been set successfully!');
          this.getRestaurant();
        } else {
          this.toastrService.error('Please fill in empty elements!');
        }
      })
    } else {           // update
      this.restaurantService.updateRestaurant(this.restaurant_id, restaurant).subscribe(data => {
        let res = JSON.parse(data['_body']);
        if (res.success) {
          this.toastrService.success('Restaurant has been updated successfully!');
          this.getRestaurant();
        } else {
          this.toastrService.error('Updating failed!');
        }
      })
    }
  }

  getRestaurant(){

    this.restaurantService.getRestaurant().subscribe(data => {
      let res = JSON.parse(data['_body']);
      if (res.success) {
        let response = res.data[0];
        if (response.id != undefined) {
          console.log(res.data[0]);
          this.open_time = JSON.parse(response.open);
          this.close_time = JSON.parse(response.close);
          this.restaurant_id = response.id;
          this.address = response.address;
          this.phone = response.phone;
          this.email = response.email;
          this.website = response.website;
          this.name = response.name;
          this.seated_burst = response.seated_burst;
          this.guest_garden = response.guest_garden;
          this.guest_room = response.guest_room;
          this.description = response.description;
        }
      }
    });
  }

}
