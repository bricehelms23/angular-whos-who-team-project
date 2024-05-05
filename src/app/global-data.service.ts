import { Injectable, asNativeElements } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {

  constructor() { }

  apiTracksData: any;
  scores: any[] = [];
  gameGenre: string = "rock"


  answerSet = {
    q1: "",
    q2: "",
    q3: "",
    q4: ""
  }

  responseSet = {
    q1: "",
    q2: "",
    q3: "",
    q4: ""
  }

  
  getTracksData(){
    return this.apiTracksData;
  }

  addScore(newScore: any){
    this.scores.push(newScore);
  }

  setGenre(newGenre: string){
    this.gameGenre = newGenre;
  }

  getGenre(): string {
    return this.gameGenre
  }

  resetAnswersAndResponses(){
    // this.quizAnswers = []
    // this.responses = []

    this.answerSet = {
      q1: "",
      q2: "",
      q3: "",
      q4: ""
    }

    this.responseSet = {
      q1: "",
      q2: "",
      q3: "",
      q4: ""
    }
  }
}