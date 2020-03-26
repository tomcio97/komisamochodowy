import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AlertifyService } from './_services/Alertify.service';
import { ValueListComponent } from './value/value-list/value-list.component';
import { appRoutes } from './routes';
import { AuthGuard } from './_guards/auth.guard';
import { ValueCardComponent } from './value/value-card/value-card.component';
import { ValueDetailComponent } from './value/value-detail/value-detail.component';
import { TabsModule } from 'ngx-bootstrap';
import { ValueDetailResolver } from './_resolvers/value-detail.resolver';
import { ValueListResolver } from './_resolvers/value-list.resolver';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';

export function tokenGetter()
{
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      ValueListComponent,
      NavComponent,
      HomeComponent,
      LoginComponent,
      ValueCardComponent,
      ValueDetailComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      JwtModule.forRoot(
         {
            config: {
               tokenGetter: tokenGetter,
               whitelistedDomains: ['localhost:5000'],
               blacklistedRoutes: ['localhost:5000/api/auth']
            }
         }
      ),
      RouterModule.forRoot(appRoutes),
      TabsModule.forRoot(),
      NgxGalleryModule
   ],
   providers: [
      AuthService,
      AlertifyService,
      AuthGuard,
      ValueDetailResolver,
      ValueListResolver
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
