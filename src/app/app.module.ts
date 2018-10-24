import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BlockLayoutComponent } from './block-layout/block-layout.component';
import { VideoComponent } from './video/video.component';
import { RankingComponent } from './ranking/ranking.component';
import { AppRoutingModule } from './/app-routing.module';
import { ControlLayoutComponent } from './control-layout/control-layout.component';

@NgModule({
  declarations: [AppComponent, BlockLayoutComponent, VideoComponent, RankingComponent, ControlLayoutComponent],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
