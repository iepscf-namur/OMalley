import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap' ;
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button'; 
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http'
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

//import { MatFormFieldModule } from '@angular/material/form-field';
//import { MatTableDataSource   Module ???????} from '@angular/material/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParallaxImageComponent } from './parallax-image/parallax-image.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
//import { CatalogServiceComponent } from './services/catalog-service/catalog-service.component';
import { CatalogComponent } from './catalog/catalog.component';
//import { UserServiceComponent } from './services/user-service/user-service.component';
import { UserComponent } from './user/user.component';
import { ModalLoginComponent } from './modal-login/modal-login.component';

@NgModule({
  declarations: [
    AppComponent,
    ParallaxImageComponent,
    HomeComponent,
    FooterComponent,
    NavbarComponent,
    CatalogComponent,
    UserComponent,
    ModalLoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatTableModule,
    MatMenuModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    NgbModule,
    NgMultiSelectDropDownModule.forRoot(),
    ToastrModule.forRoot(),
    HttpClientModule,
  ],
  providers: [
  //  CatalogServiceComponent
  //  UserServiceComponent
  //  LoginServiceComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// *************************
// Quid admin-auth-guard ???
// *************************