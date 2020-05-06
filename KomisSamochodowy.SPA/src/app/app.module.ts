import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { TabsModule, PaginationModule, BsDropdownModule } from 'ngx-bootstrap';
import { ValueDetailResolver } from './_resolvers/value-detail.resolver';
import { ValueListResolver } from './_resolvers/value-list.resolver';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { ValueTableComponent } from './value/value-table/value-table.component';
import { ValueEditComponent } from './value/value-edit/value-edit.component';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { FileUploadModule } from 'ng2-file-upload';
import { ValueAddComponent } from './value/value-add/value-add.component';
import { QuestionResolver } from './_resolvers/question.resolver';
import { ValueQuestionComponent } from './value/value-question/value-question.component';
import { QuestionService } from './_services/question.service';
import { EmailService } from './_services/email.service';
import { ValueAnswerComponent } from './value/value-answer/value-answer.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


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
      ValueDetailComponent,
      ValueTableComponent,
      ValueEditComponent,
      ValueAddComponent,
      ValueQuestionComponent,
      ValueAnswerComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
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
      PaginationModule.forRoot(),
      BsDropdownModule.forRoot(),
      NgxGalleryModule,
      FileUploadModule,
      Ng2SearchPipeModule
   ],
   providers: [
      AuthService,
      AlertifyService,
      AuthGuard,
      ValueDetailResolver,
      ValueListResolver,
      PreventUnsavedChanges,
      QuestionResolver,
      QuestionService,
      EmailService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
