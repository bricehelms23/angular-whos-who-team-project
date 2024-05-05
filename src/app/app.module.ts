import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { HttpClient, HttpClientModule,} from '@angular/common/http'

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { PlayComponent } from "./play/play.component";
import { SettingsComponent } from './settings/settings.component';
import { CardComponent } from './card/card.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { ScoreComponent } from './score/score.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "play", component: PlayComponent},
  { path: "settings", component: SettingsComponent},
  { path: "leaderboard", component: LeaderboardComponent},
  { path: "score", component: ScoreComponent}
];

@NgModule({
  declarations: [AppComponent, HomeComponent, PlayComponent, SettingsComponent, CardComponent, LeaderboardComponent, ScoreComponent],
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(routes), HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
