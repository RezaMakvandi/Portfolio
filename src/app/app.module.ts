import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ButtonModule} from 'primeng/button';
import { HomeComponent } from './home/home.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import {ProgressBarModule} from 'primeng/progressbar';
import { RzProgressModule } from 'rz-progress';
import { ToggleHeightDirective } from './directives/toggle-height.directive';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopMenuComponent,
    ToggleHeightDirective,
    SidebarComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    ProgressBarModule,
    BrowserAnimationsModule,
    RzProgressModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
