import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Station } from '../station';
import { StationService } from '../stations.service';
import { PointsService } from 'src/app/points/points.service';
import { CoordinatesService } from 'src/app/model/coordinates.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { LocalStorageService } from 'src/app/local-storage/local-storage.service';
import { MetrolineService } from 'src/app/metroline/metroline.service';
import { MetrolineComponent } from 'src/app/metroline/metroline/metroline.component';
import { GraduateProgram } from 'src/app/model/graduate-program';
import { GraduateProgramService } from 'src/app/model/graduate-programe.service';


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
  graduatePrograms: GraduateProgram[] = [];
  neighborhoodIds: number[] = [];
  activeStationId: number = 0;
  junk: String = '';
  constructor(private stationService: StationService, private route: ActivatedRoute, 
    private pointsService: PointsService, private coordinatesService: CoordinatesService,private metroLineService: MetrolineService,
    private sanitizer: DomSanitizer, private localStorageService: LocalStorageService,
    private graduateProgramService: GraduateProgramService) { }

  ngOnInit(): void {
    // this.getStations();
    // this.points = this.pointsService.getPoints();

    this.getMetroMap();
    
  }

  // getStations() {
  //   this.stations$ = this.stationService.getStations().subscribe(result => this.stations = result, err => this.errorMessage = err);
  // }

  async getMetroMap() {
    // Calculate the lines and coordinates
    await this.coordinatesService.getCoordinates();
    // Fetch the metromap from the local storage
    this.metromap = this.localStorageService.getMetromap()!;
    // Convert it to a safe html injectable string
    this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.metromap);
    // Fetch the lines from the local storage
    this.lines = this.localStorageService.getLines();
  }



}
