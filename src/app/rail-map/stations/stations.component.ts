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
  metromap: string = '<p>test<p/>';
  lines: any = null;
  junk: String = '';
  constructor(private stationService: StationService, private route: ActivatedRoute, 
    private pointsService: PointsService, private coordinatesService: CoordinatesService,
    private sanitizer: DomSanitizer, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    // this.getStations();
    // this.points = this.pointsService.getPoints();

    // console.log(this.metromap)
    this.getMetroMap();
    // console.log('Dit is de metromap nadat ze eigenlijk al opgeroepen is.')
    // console.log(this.metromap)
    
  }

  getStations() {
    this.stations$ = this.stationService.getStations().subscribe(result => this.stations = result, err => this.errorMessage = err);
  }

  async getMetroMap() {
    this.metromap = await this.coordinatesService.getCoordinates();
    // this.metromap = temp[0].toString();
    // this.lines = temp[1];

    console.log('Returned metromap:')
    console.log(this.metromap)
    this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.metromap);
    this.getLines();
  }

  getLines() {
    this.lines = this.localStorageService.getLines;
    console.log('Dit zijn de lines na ophalen uit local storage');
    console.log(this.lines)
  };

}
