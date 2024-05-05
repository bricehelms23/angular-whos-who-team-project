import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalDataService } from '../global-data.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

  constructor(
    public router: Router,
    private globalService: GlobalDataService
  ) { }

  playerName: string = "";

  playersScore: number = 0;

  ans: string[] = [];
  resp: string[] = [];

  ngOnInit(): void {
    console.log(this.globalService.answerSet)
    console.log(this.globalService.responseSet)

    if(this.globalService.answerSet.q1 == this.globalService.responseSet.q1){
      this.playersScore++;
    }
    if(this.globalService.answerSet.q2 == this.globalService.responseSet.q2){
      this.playersScore++;
    }
    if(this.globalService.answerSet.q3 == this.globalService.responseSet.q3){
      this.playersScore++;
    }
    if(this.globalService.answerSet.q4 == this.globalService.responseSet.q4){
      this.playersScore++;
    }
  }

  onSubmit(){
     const s: Score = {
      name: this.playerName,
      score: this.playersScore
     }
     this.globalService.addScore(s)
    this.router.navigate(['/']);
  }

}

interface Score {
  name: string,
  score: number
}
