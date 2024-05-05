import { Component, OnInit } from '@angular/core';
import { GlobalDataService } from '../global-data.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})

export class LeaderboardComponent implements OnInit {

  constructor(private globalService: GlobalDataService) { }

  players: player[] = this.globalService.scores;
  //playerNames: string[] = [];


  ngOnInit(): void {
    this.players.sort((a, b) => b.score - a.score);
    // const leaderboardPlayers = this.players;
    // leaderboardPlayers.sort((a, b) => a.score - b.score)
    // console.log(leaderboardPlayers)
    // leaderboardPlayers.forEach((p) => {
    //   this.playerNames.push(p.name)
    // })
    // this.playerNames.reverse();
    // console.log(this.playerNames)
  }


}


export interface player {
  name: string,
  score: number
}