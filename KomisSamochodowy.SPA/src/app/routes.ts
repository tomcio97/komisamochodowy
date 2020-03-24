import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactComponent } from './contact/contact.component';
import { AuthGuard } from './_guards/auth.guard';

export const appRoutes: Routes = 
[
    {path: '', component: HomeComponent},
    {path: 'onas', component: AboutusComponent},
    {path: 'kontakt', component: ContactComponent},
    {path: 'paneladministracyjny', component: LoginComponent},
    {path: '**', redirectTo: '', pathMatch: 'full'}
]