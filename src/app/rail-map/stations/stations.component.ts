import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Station } from '../station';
import { StationService } from '../stations.service';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css']
})
export class StationsComponent implements OnInit {

  stations: Station[] = [];
  stations$: Subscription = new Subscription();
  // stations$: Observable<Station[]> = new Observable<Station[]>();
  errorMessage: string = '';

  constructor(private stationService: StationService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getStations();
  }

  getStations() {
    this.stations$ = this.stationService.getStations().subscribe(result => this.stations = result, err => this.errorMessage = err);

  }

}
