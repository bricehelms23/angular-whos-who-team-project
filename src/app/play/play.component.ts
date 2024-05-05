import { Component, OnInit, Input } from '@angular/core';
import fetchFromSpotify, { request } from 'src/services/api';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { async } from 'rxjs';
import { GlobalDataService } from '../global-data.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css'],
  template: `<p>{{recievedData}}</p>`
})
export class PlayComponent implements OnInit {
  //@Input() recievedData: any;
  constructor(private globalService: GlobalDataService) { }


  dataFromApi: any;
  preview1: any;
  preview2: any;
  preview3: any;
  preview4: any;
  //preview5: any;
  correct1: any;
  correct2: any;
  correct3: any;
  correct4: any;
  //correct5: any;



  firstCardOptions = [
    "Option1",
    "Option2",
    "Option3",
    "Option4"
  ]
  secondCardOptions = [
    "Option1",
    "Option2",
    "Option3",
    "Option4"
  ]
  thirdCardOptions = [
    "Option1",
    "Option2",
    "Option3",
    "Option4"
  ]
  fourthCardOptions = [
    "Option1",
    "Option2",
    "Option3",
    "Option4"
  ]
  // fifthCardOptions = [
  //   "Option1",
  //   "Option2",
  //   "Option3",
  //   "Option4"
  // ]

  TOKEN_KEY: string = "whos-who-access-token";

  async ngOnInit() {
    /**
     * GAME LOGIC (??)
     */

    // console.log("getting recieved data");
    // console.log(this.recievedData);

    this.globalService.resetAnswersAndResponses();

    const t = this.getUrlToken();
    //console.log(t)

    const d = await fetchFromSpotify({
      token: t, endpoint: "search",
      params: {
        type: 'track',
        // q: `genre:${this.selectedGenre}`,
        // q: 'genre:pop',
        q: 'genre:' + this.globalService.getGenre(),
        market: 'US',
        limit: 4
      }
    });
    this.dataFromApi = d;
    // console.log(this.dataFromApi)
    //console.log(`Number of songs: ${d.tracks.items.length}`);

    this.globalService.apiTracksData = this.dataFromApi;
    //console.log(this.globalService.apiTracksData);

    //const randomIndexes = this.getRandomIndexes(5, this.dataFromApi.tracks.items.length);
    this.preview1 = this.dataFromApi.tracks.items[0].preview_url
    this.correct1 = this.dataFromApi.tracks.items[0].name
    
    this.preview2 = this.dataFromApi.tracks.items[1].preview_url
    this.correct2 = this.dataFromApi.tracks.items[1].name

    this.preview3 = this.dataFromApi.tracks.items[2].preview_url
    this.correct3 = this.dataFromApi.tracks.items[2].name

    this.preview4 = this.dataFromApi.tracks.items[3].preview_url
    this.correct4 = this.dataFromApi.tracks.items[3].name

    // saving correct song names globally
    // const answers = [];
    // answers.push(this.correct1, this.correct2, this.correct3, this.correct4);
    // console.log(answers);
    // this.globalService.quizAnswers = answers;
    this.globalService.answerSet = {
      q1: this.correct1,
      q2: this.correct2,
      q3: this.correct3,
      q4: this.correct4
    }


    // this.preview5 = this.dataFromApi.tracks.items[4].preview_url
    // this.correct5 = this.dataFromApi.tracks.items[4].name

    //console.log(this.preview1);

    // this.firstCardOptions[0] = this.dataFromApi.tracks.items[0].artists[0].name
    // this.firstCardOptions[1] = this.dataFromApi.tracks.items[1].artists[0].name
    // this.firstCardOptions[2] = this.dataFromApi.tracks.items[2].artists[0].name
    // this.firstCardOptions[3] = this.dataFromApi.tracks.items[3].artists[0].name

    // Create an array of all song titles
    const songTitles = this.dataFromApi.tracks.items.map((item: any) => item.name);


    for (let i = 0; i < 4; i++) {
      // Get the current song title
      const currentSongTitle = this.dataFromApi.tracks.items[i].name;

      // Start options with the current song title
      const options = [currentSongTitle];

      // Get three random song titles that are not the current song
      const randomTitles = this.getRandomSongTitles(3, songTitles, currentSongTitle);
      options.push(...randomTitles);

      // Shuffle the options
      switch(i) {
        case 0:
          this.firstCardOptions = this.shuffleArray(options);
          //console.log('Options:', options);
          //console.log('First card options:', this.firstCardOptions);
          break;
        case 1:
          this.secondCardOptions = this.shuffleArray(options);
          //console.log('Options:', options);
          //console.log('Second card options:', this.secondCardOptions);
          break;
        case 2:
          this.thirdCardOptions = this.shuffleArray(options);
          //console.log('Options:', options);
          //console.log('Third card options:', this.thirdCardOptions);
          break;
        case 3:
          this.fourthCardOptions = this.shuffleArray(options);
          //console.log('Options:', options);
          //console.log('Fourth card options:', this.fourthCardOptions);
          break;
        // case 4:
        //   this.fifthCardOptions = this.shuffleArray(options);
        //   console.log('Options:', options);
        //   console.log('Fifth card options:', this.fifthCardOptions);
        //   break;
      }
    }



  }

  getRandomSongTitles(n: number, songTitles: string[], currentSongTitle: string): string[] {
    const titles = new Set<string>();
    while (titles.size < n) {
      const randomIndex = Math.floor(Math.random() * songTitles.length);
      const randomTitle = songTitles[randomIndex];
      if (randomTitle !== currentSongTitle) {
        titles.add(randomTitle);
      }
    }
    return Array.from(titles);
  }

  // Function to shuffle an array
  shuffleArray(array: any[]): any[] {
    // Shuffle the array
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    
    return array; // Return the shuffled array
  }


  getRandomIndexes(n: number, max: number): number[] {
    console.log("max: " + max);
    const indexes = new Set<number>();
    while (indexes.size < n) {
      const randomIndex = Math.floor(Math.random() * max);
      indexes.add(randomIndex);
    }
    return Array.from(indexes);
  }

  async onSubmit1() {

    // console.log(this.preview)
    window.open(this.preview1, 'targetWindow', 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=400,height=400');

  }

  async onSubmit2() {

    // console.log(this.preview)
    window.open(this.preview2, 'targetWindow', 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=400,height=400');

  }

  async onSubmit3() {

    // console.log(this.preview)
    window.open(this.preview3, 'targetWindow', 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=400,height=400');

  }

  async onSubmit4() {

    // console.log(this.preview)
    window.open(this.preview4, 'targetWindow', 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=400,height=400');

  }

  async onSubmit5() {

    // console.log(this.preview)
    //window.open(this.preview5, 'targetWindow', 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=400,height=400');

  }

  getUrlToken() {
    console.log("Called");
    const url = new URL(window.location.href);
    const authorizationToken = url.searchParams.get('prop');
    return authorizationToken;
  }
}