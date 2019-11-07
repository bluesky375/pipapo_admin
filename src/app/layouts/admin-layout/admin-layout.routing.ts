import { Routes } from '@angular/router';

import { LoginComponent } from './../../login/login.component';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { RestaurantsComponent } from '../../restaurants/restaurants.component';
import { OrdersComponent } from '../../orders/orders.component';
import { ProductsComponent } from '../../products/products.component';
import { GalleryComponent } from '../../gallery/gallery.component';
import { BonusComponent } from '../../bonus/bonus.component';
import { ContactsComponent } from '../../contacts/contacts.component';
import { ImprintComponent } from '../../imprint/imprint.component';
import { RatingComponent } from './../../rating/rating.component';
import { PushnotificationComponent } from './../../pushnotification/pushnotification.component';
import { EditProductComponent } from './../../edit-product/edit-product.component';
import { ProfileComponent } from './../../profile/profile.component';
import { UserComponent} from '../../user/user.component';

import { from } from 'rxjs';

export const AdminLayoutRoutes: Routes = [

    { path: 'dashboard', component: DashboardComponent },
    { path: 'restaurants', component: RestaurantsComponent },
    { path: 'orders', component: OrdersComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'gallery', component: GalleryComponent },
    { path: 'bonus', component: BonusComponent },
    { path: 'contacts', component: ContactsComponent },
    { path: 'imprint', component: ImprintComponent },
    { path: 'rating', component: RatingComponent },
    { path: 'pushnotification', component: PushnotificationComponent },
    { path: 'editproduct/:id', component: EditProductComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'user', component: UserComponent}

];
