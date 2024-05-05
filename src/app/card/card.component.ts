import { Component, OnInit, Input} from '@angular/core';
import { GlobalDataService } from '../global-data.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() id: number | undefined;
  @Input() dataRecieved: any;
  @Input() option1: string | undefined;
  @Input() option2: string | undefined;
  @Input() option3: string | undefined;
  @Input() option4: string | undefined;

  savedResponse: string = ""
  
  constructor(private globalService: GlobalDataService) { }

  ngOnInit(): void {

    console.log(this.id)
    
    //console.log("OPTION!: " + this.option1)
    // this.dataRecieved = this.globalService.apiTracksData
    // console.log("CARD HERE!!" + JSON.stringify(this.dataRecieved));
    // console.log("CARD HERE!!" + JSON.stringify(this.dataRecieved.tracks.items));
  }

  onSubmit(){
    //this.savedResponse = 
    //this.globalService.responses.push(this.savedResponse)
    
    if(this.id == 1){
      this.globalService.responseSet.q1 = this.savedResponse
    } else if( this.id == 2) {
      this.globalService.responseSet.q2 = this.savedResponse
    } else if( this.id == 3) {
      this.globalService.responseSet.q3 = this.savedResponse
    } else {
      this.globalService.responseSet.q4 = this.savedResponse
    }
  }

  onChange(e: any) {
    this.savedResponse = e.target.value;
    console.log(this.savedResponse)
  }
}
