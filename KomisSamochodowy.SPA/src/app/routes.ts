import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactComponent } from './contact/contact.component';

export const appRoutes: Routes = 
[
    {path: 'home', component: HomeComponent},
    {path: 'onas', component: AboutusComponent},
    {path: 'kontakt', component: ContactComponent},
    {path: 'login', component: LoginComponent},
    {path: '**', redirectTo: 'home', pathMatch: 'full'}
]