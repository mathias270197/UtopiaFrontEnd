import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Station } from '../station';
import { StationService } from '../stations.service';
import { PointsService } from 'src/app/points/points.service';


@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.scss']
})
export class StationsComponent implements OnInit {

  stations: Station[] = [];
  stations$: Subscription = new Subscription();
  // stations$: Observable<Station[]> = new Observable<Station[]>();
  errorMessage: string = '';
  points: number = 1;
  constructor(private stationService: StationService, private route: ActivatedRoute, private pointsService: PointsService) { }

  ngOnInit(): void {
    this.getStations();
   this.points = this.pointsService.getPoints()
  }

  getStations() {
    this.stations$ = this.stationService.getStations().subscribe(result => this.stations = result, err => this.errorMessage = err);

  }

}
