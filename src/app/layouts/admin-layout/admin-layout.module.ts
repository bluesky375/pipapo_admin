import { RatingComponent } from './../../rating/rating.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { RestaurantsComponent } from '../../restaurants/restaurants.component';
import { OrdersComponent } from '../../orders/orders.component';
import { ProductsComponent } from '../../products/products.component';
import { GalleryComponent } from '../../gallery/gallery.component';
import { BonusComponent } from '../../bonus/bonus.component';
import { ContactsComponent } from '../../contacts/contacts.component';
import { ImprintComponent } from '../../imprint/imprint.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { PushnotificationComponent } from './../../pushnotification/pushnotification.component';
import { EditProductComponent } from './../../edit-product/edit-product.component';
import { ProfileComponent } from './../../profile/profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { UserComponent} from '../../user/user.component';


import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatCardModule,
  MatListModule,
  MatIconModule,
  MatTabsModule,
  MatPaginatorModule,
  MatTableModule,
  MatCheckboxModule,    
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatTabsModule,
    MatPaginatorModule,
    MatTableModule,
    MatCheckboxModule,
    NgxMaterialTimepickerModule,
    NgbModule,
    AngularEditorModule
  ],
  declarations: [
    DashboardComponent,
    RestaurantsComponent,
    OrdersComponent,
    ProductsComponent,
    GalleryComponent,
    BonusComponent,
    ContactsComponent,
    ImprintComponent,
    RatingComponent,
    PushnotificationComponent,
    EditProductComponent,
    ProfileComponent,   
    UserComponent
  ],
 
})

export class AdminLayoutModule {}
