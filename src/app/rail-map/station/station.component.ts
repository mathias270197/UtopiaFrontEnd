import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Console } from 'console';
import { Station } from '../station';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss']
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

    if (this.station.numberOfBuildings == 1) {
      this.router.navigate(['/form'], { state: { firstBuildingId: this.station.firstBuildingId } });
      console.log("go to questions of building with ID: " + this.station.firstBuildingId);
    }
    else {
      this.router.navigate(['/neighbourhood'], { state: { stationId: this.station.id, numberOfBuildings: this.station.numberOfBuildings } });
    }
  }

}
