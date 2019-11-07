import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HttpClientModule } from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';

import {DeleteConfirmModalComponent} from '../app/delete-confirm-modal/delete-confirm-modal.component';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatDialogModule,
  MatSelectModule,
  MatCardModule,
  MatListModule,
  MatIconModule,
  MatTabsModule,
  MatPaginatorModule,
  MatTableModule,
  MatCheckboxModule,
} from '@angular/material';
import { LoginComponent } from './login/login.component';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  imports: [
    BrowserAnimationsModule,    
    FormsModule,    
    MatDialogModule,
    ReactiveFormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
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
    HttpClientModule,
    ToastrModule.forRoot()
    // AgmCoreModule.forRoot({
    //   apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    // })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    DeleteConfirmModalComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DeleteConfirmModalComponent]
})
export class AppModule { }
