import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Console } from 'console';
import { Station } from '../station';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.css']
})
export class StationComponent implements OnInit {

  @Input() station: Station = {
    id: 0,
    x: 0,
    y: 0,
    numberOfBuildings: 0,
    firstBuildingId: 0
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  GoToStation() {
    //opvragen hoeveel gebouwen er zijn in het station

    //als er maar één gebouw is: 

    switch(this.station.numberOfBuildings) { 
      case 1: { 
        this.router.navigate(['/form'],{ state: {firstBuildingId: this.station.firstBuildingId} } );
        console.log("go to questions of building with ID: " + this.station.firstBuildingId);
        break; 
      } 
      case 2: { 
        this.router.navigate(['/neighbourhood'],{ state: {stationId:  this.station.id} } );
        break; 
      } 
      default: { 
        console.log("to implements");
        break; 
      } 
   } 


    //Als er meerdere gebouwen zijn:
    //navigate to neighbourhood of the station
    // this.router.navigate(['/neighbourhood'],{ state: {stationId: stationId} } );
  }

}
