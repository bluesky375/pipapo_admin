import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  dataSource: any;
  user_all_list: any[];
  displayedColumns: string[] = ["full_name", "gender", "email", "address", "phone", "active_status", "action"];
  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  // input controls
  first_name: string = null;
  surname: string = null;
  email: string = null;
  occupation: string = null;
  gender: string = null;
  birthday: string = null;
  phone: string = null;
  street: string = null;
  company: string = null;
  post_code: string = null;
  country: string = null;
  city: string = null;
  state: string = null;
  linkedin: string = null;
  facebook: string = null;
  twitter: string = null;
  instagram: string = null;
  active: boolean = true;
  seletctedUserId = 0;


  constructor(private router: Router,
    private userService: UserService,
    private toastrService: ToastrService) { }

  ngOnInit() {
     this.getAllUsersList();
  }

  getAllUsersList() {
    this.userService.getAllUsers().subscribe(data => {
      let res = JSON.parse(data['_body']);
      this.user_all_list = res.data;
      this.dataSource = new MatTableDataSource<any>(this.user_all_list);
      this.dataSource.paginator = this.paginator;
    });
  }



  onInitInputControls() {
    this.first_name = null;
    this.surname = null;
    this.email = null;
    this.occupation = null;
    this.gender= null;
    this.birthday = null;
    this.phone = null;
    this.street= null;
    this.company = null;
    this.post_code = null;
    this.country = null;
    this.city = null;
    this.state = null;
    this.linkedin = null;
    this.facebook = null;
    this.twitter = null;
    this.instagram = null;
    this.active = true;
    this. seletctedUserId = 0;
  }

  onCancel() {
    this.onInitInputControls();
  }

  onSetUserId(id: number){
    this.onInitInputControls();
    this.userService.getUserById(id).subscribe(data=>{
      let res = JSON.parse(data['_body']);
      if(res.success){
        this.first_name = res.data.first_name;
        this.surname = res.data.surname;
        this.email = res.data.email;
        this.occupation = res.data.email;
        this.gender= res.data.gender;
        this.birthday = res.data.birthday;
        this.phone = res.data.phone;
        this.street= res.data.street;
        this.company = res.data.company;
        this.post_code = res.data.post_code;
        this.country = res.data.country;
        this.city = res.data.city;
        this.state = res.data.state;
        this.linkedin = res.data.linkedin;
        this.facebook = res.data.facebook;
        this.twitter = res.data.twitter;
        this.instagram = res.data.instagram;
        this.active = res.data.active == 0? false: true;
        this.seletctedUserId = res.data.id;
      }
    })
  }

  onSave() {
  console.log(this.active);
  console.log(this.seletctedUserId);
    this.userService.updateUserActivityStatusById(this.seletctedUserId, {active: this.active==false? 0: 1}).subscribe(data=>{
     let res = JSON.parse(data['_body']);
      if(res.success){
        this.toastrService.success('Active status has been updated successfully!');
        this.getAllUsersList();
      }else{
        this.toastrService.success('Active status updating has been failed');
      }
    });
  }
}





