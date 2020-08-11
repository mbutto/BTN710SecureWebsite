import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { VideoComponent } from './video/video.component';
import { NavbarComponent } from './template/navbar/navbar.component';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { AuthService } from './auth.service';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { TokenIntercepterService } from './token-intercepter.service';

import { HomeServiceService } from './home-service.service'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VideoComponent,
    NavbarComponent,
    LoginComponent,
    NoAccessComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PdfViewerModule,
    FormsModule, 
    HttpClientModule
  ],
  providers: [AuthService, AuthGuard, HomeServiceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenIntercepterService,
      multi: true
    }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
