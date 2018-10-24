import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoComponent } from './video/video.component';
import { RankingComponent } from './ranking/ranking.component';

const routes: Routes = [
  { path: 'video', component: VideoComponent },
  { path: 'ranking', component: RankingComponent },
  { path: '', redirectTo: '/video', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
