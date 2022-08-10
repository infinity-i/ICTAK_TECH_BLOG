import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http'
import { TokenInterceptorService } from './token-interceptor.service';

import {BrowserAnimationsModule} from'@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
// import { FormsModule,ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SignupComponent } from './signup/signup.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { BlogsComponent } from './blogs/blogs.component';
import { NgToastModule} from 'ng-angular-popup'
import { HeaderComponent } from './header/header.component';
import { AdminComponent } from './admin/admin.component';
import { PendingComponent } from './pending/pending.component';
import { AuthGuard } from './auth.guard';
import { ViewblogComponent } from './viewblog/viewblog.component';
import { TablesComponent } from './tables/tables.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent,
    SignupComponent,
    FooterComponent,
    HomeComponent,
    AddBlogComponent,
    HeaderComponent,
    AdminComponent,
    PendingComponent,
    BlogsComponent,
    ViewblogComponent,
    TablesComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgToastModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule

    
  ],    
  providers: [AuthService , AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent],

})
export class AppModule { }
