import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ModelModule } from './model/model.module';
import { CoreModule } from './core/core.module';
import { MessageModule } from './messages/message.module';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { TermsGuard } from './terms.guard';
import { LoadGuard } from './load.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button'; 
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ModelModule,
    CoreModule,
    MessageModule,
    routing,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [TermsGuard, LoadGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
