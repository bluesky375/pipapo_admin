import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from '../services/contact/contact.service';

declare var $: any;

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})

export class ContactsComponent implements OnInit {

  open_time: any;
  close_time: any;
  contact_id: number;
  address: string;
  phone: string;
  email: string;
  website: string;
  paymethod: string;
  direction: string;
  handicapped: string;
  tables_burst: string;
  parking: string;
  smoking_area: string;


  constructor(private toastrService: ToastrService, private contactService: ContactService) { }

  // showNotification(from, align) {
  //   const type = ['', 'info', 'success', 'warning', 'danger'];

  //   const color = Math.floor((Math.random() * 4) + 1);

  //   $.notify({
  //     icon: 'notifications',
  //     message: 'Welcome to <b>Material Dashboard</b> - a beautiful freebie for every web developer.'

  //   }, {
  //     type: type[color],
  //     timer: 4000,
  //     placement: {
  //       from: from,
  //       align: align
  //     },
  //     template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
  //       '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
  //       '<i class="material-icons" data-notify="icon">notifications</i> ' +
  //       '<span data-notify="title">{1}</span> ' +
  //       '<span data-notify="message">{2}</span>' +
  //       '<div class="progress" data-notify="progressbar">' +
  //       '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
  //       '</div>' +
  //       '<a href="{3}" target="{4}" data-notify="url"></a>' +
  //       '</div>'
  //   });
  // }

  ngOnInit() {
    this.open_time = { hour: 0, minute: 0 };
    this.close_time = { hour: 0, minute: 0 };
    this.contact_id = 0;
    this.address = '';
    this.phone = '';
    this.email = '';
    this.website = '';
    this.paymethod = '';
    this.direction = '';
    this.handicapped = '';
    this.tables_burst = '';
    this.parking = '';
    this.smoking_area = '';

    this.getContact();
  }

  onSave() {
    let contact = {
      open: JSON.stringify(this.open_time),
      close: JSON.stringify(this.close_time),
      address: this.address,
      phone: this.phone,
      email: this.email,
      website: this.website,
      pament_methods: this.paymethod,
      directions: this.direction,
      handicapped_accessible: this.handicapped,
      tables: this.tables_burst,
      parking: this.parking,
      smoking_area: this.smoking_area
    }
    console.log('contact_id', this.contact_id);
    if (this.contact_id == 0) {   // create
      this.contactService.insertNewContact(contact).subscribe(data =>{
        let res=JSON.parse(data['_body']);
        if(res.success){
          this.toastrService.success('New contact has been set successfully!');
          this.getContact();    
        }else{
          this.toastrService.error('Please fill in empty elements!');
        }
      })
    } else {           // update
      this.contactService.updatecontact(this.contact_id, contact).subscribe(data =>{
        let res=JSON.parse(data['_body']);
        if(res.success){
          this.toastrService.success('New contact has been updated successfully!');
          this.getContact();
        }else{
          this.toastrService.error('Updating failed!');
        }
      })
    }
  }

  getContact() {
    
    this.contactService.getContact().subscribe(data => {
      console.log('data ', data);
      let res = JSON.parse(data['_body']);
      if (res.success) {            
        let response = res.data[0];
        if (response.id != undefined) { 
          console.log(res.data[0]);          
          this.open_time = JSON.parse(response.open);
          this.close_time = JSON.parse(response.close);
          this.contact_id = response.id;
          this.address = response.address;
          this.phone = response.phone;
          this.email = response.email;
          this.website = response.website;
          this.paymethod = response.pament_methods;
          this.direction = response.directions;
          this.handicapped = response.handicapped_accessible;
          this.tables_burst = response.tables;
          this.parking = response.parking;
          this.smoking_area = response.smoking_area;
        }
      }
    });
  }

}
