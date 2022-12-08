import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Building } from '../building';
import { StationService } from '../stations.service';

@Component({
  selector: 'app-neighbourhood',
  templateUrl: './neighbourhood.component.html',
  styleUrls: ['./neighbourhood.component.css']
})
export class NeighbourhoodComponent implements OnInit {

  buildings: Building[] = [];
  buildings$: Subscription = new Subscription();
  buildingId: number = 0;

  errorMessage: string = '';

  constructor(private stationService: StationService,private router: Router) {
    this.buildingId = +this.router.getCurrentNavigation()?.extras.state?.['stationId'];
   }

  ngOnInit(): void {
    this.GetEscapeRoomsOfStation(this.buildingId);
  }

  GetEscapeRoomsOfStation(stationId: number) {
    this.buildings$ = this.stationService.GetEscapeRoomsOfStation(stationId).subscribe(result => this.buildings = result);
  }

}
