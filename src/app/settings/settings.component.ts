import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalDataService } from '../global-data.service';

//const TOKEN_KEY = "whos-who-access-token";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  difficulty!: string;
  questions!: number; 
  genres: String[] = ["House", "Alternative", "J-Rock", "R&B"];
  selectedGenre: String = "";
  //token: any;

  

  constructor(private globalService: GlobalDataService) { }

  ngOnInit(): void {
    const difficulty = localStorage.getItem('difficulty');
    const questions = localStorage.getItem('questions');

    this.difficulty = difficulty ? difficulty : 'easy';
    this.questions = questions ? Number(questions) : 5;

    //this.token  = localStorage.getItem(TOKEN_KEY);

    this.loadGenres();
  }

  saveSettings(): void {
    localStorage.setItem('difficulty', this.difficulty);
    localStorage.setItem('questions', String(this.questions));

    console.log(this.difficulty);
    console.log(localStorage.getItem('difficulty'));
    console.log(localStorage.getItem('questions'));
  }

  loadGenres = async () => {

    this.genres = [
      "rock",
      "rap",
      "pop",
      "country",
      "hip-hop",
      "jazz",
      "alternative",
      "j-pop",
      "k-pop",
      "emo"
    ]
  };

  setGenre(selectedGenre: any) {
    this.selectedGenre = selectedGenre;
    //console.log(this.selectedGenre);
    this.globalService.setGenre(selectedGenre);
    //console.log("GLOBAL GENRE: " + this.globalService.getGenre())
  } 
}