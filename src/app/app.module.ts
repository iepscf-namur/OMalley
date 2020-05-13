import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap' ;
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button'; 
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http'
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxPageScrollModule } from 'ngx-page-scroll'
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ParallaxImageComponent } from './parallax-image/parallax-image.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ModalLoginComponent } from './modal-login/modal-login.component';
import { CatalogComponent } from './catalog/catalog.component';
import { UserComponent } from './user/user.component';
import { LoadComponent } from './load/load.component';
import { PlayComponent } from './play/play.component';
import { DeleteupdateComponent } from './deleteupdate/deleteupdate.component';
import { AuthGuard } from './guards/auth-guard.component';
import { AdminGuard } from './guards/admin-guard.component';

@NgModule({
  declarations: [
    AppComponent,
    ParallaxImageComponent,
    HomeComponent,
    FooterComponent,
    NavbarComponent,
    ModalLoginComponent,
    CatalogComponent,
    UserComponent,
    LoadComponent,
    PlayComponent,
    DeleteupdateComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatTableModule,
    MatMenuModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    NgbModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    ToastrModule.forRoot(),
    HttpClientModule,
    NgxPageScrollCoreModule.forRoot({_logLevel: 3}),
    NgxPageScrollModule,
    FlexLayoutModule
  ],
  providers: [
    AdminGuard,
    AuthGuard
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