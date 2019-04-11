import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './routes/app-routing.module';

// components
import { AppComponent } from './app.component';
import { ListPublicationsComponent } from './components/admin/list-publications/list-publications.component';
import { UsersComponent } from './components/admin/users/users.component';
import { AlertComponent } from './components/page/alert/alert.component';
import { ContactComponent } from './components/page/contact/contact.component';
import { DetailPublicactionComponent } from './components/page/detail-publicaction/detail-publicaction.component';
import { FooterComponent } from './components/page/footer/footer.component';
import { HomeComponent } from './components/page/home/home.component';
import { ModalComponent } from './components/page/modal/modal.component';
import { NavbarComponent } from './components/page/navbar/navbar.component';
import { PublicationsComponent } from './components/page/publications/publications.component';
import { NoticeOfPrivacyComponent } from './components/page/notice-of-privacy/notice-of-privacy.component';
import { Page404Component } from './components/page/page404/page404.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { CommentsPublicationsComponent } from './components/user/comments-publications/comments-publications.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { ProfileEditComponent } from './components/user/profile-edit/profile-edit.component';

// scrollreveal
import { NgsRevealModule } from 'ng-scrollreveal';

// spinner
import { NgxSpinnerModule } from 'ngx-spinner';

// ngx-pagination
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    ListPublicationsComponent,
    UsersComponent,
    AlertComponent,
    ContactComponent,
    DetailPublicactionComponent,
    FooterComponent,
    HomeComponent,
    ModalComponent,
    NavbarComponent,
    PublicationsComponent,
    NoticeOfPrivacyComponent,
    Page404Component,
    LoginComponent,
    RegisterComponent,
    CommentsPublicationsComponent,
    ProfileComponent,
    ProfileEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgsRevealModule,
    NgxSpinnerModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
