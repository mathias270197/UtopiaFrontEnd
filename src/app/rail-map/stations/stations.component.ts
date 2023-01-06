import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Station } from '../station';
import { StationService } from '../stations.service';
import { PointsService } from 'src/app/points/points.service';
import { CoordinatesService } from 'src/app/model/coordinates.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { LocalStorageService } from 'src/app/local-storage/local-storage.service';


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
  @Input() safeHtml: SafeHtml = '';
  metromap: string = '';
  lines: any = null;
  junk: String = '';
  constructor(private stationService: StationService, private route: ActivatedRoute, 
    private pointsService: PointsService, private coordinatesService: CoordinatesService,
    private sanitizer: DomSanitizer, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    // this.getStations();
    // this.points = this.pointsService.getPoints();

    this.getMetroMap();
  }

  getStations() {
    this.stations$ = this.stationService.getStations().subscribe(result => this.stations = result, err => this.errorMessage = err);
  }

  async getMetroMap() {
    // this.metromap = await this.coordinatesService.getCoordinates();
    
    // Calculate the lines and coordinates
    await this.coordinatesService.getCoordinates();

    // Fetch the metromap from the local storage
    this.metromap = this.localStorageService.getMetromap()!;
    // console.log('Returned metromap:')
    // console.log(this.metromap)
    // Convert it to a safe html injectable string
    this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.metromap);

    // Fetch the lines from the local storage
    this.lines = this.localStorageService.getLines();
    // console.log('Dit zijn de lines na ophalen uit local storage');
    // console.log(this.lines)
  }

}
