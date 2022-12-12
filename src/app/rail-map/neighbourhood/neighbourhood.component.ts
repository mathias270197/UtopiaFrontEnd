import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { stringify } from 'querystring';
import { Subscription } from 'rxjs';
import { Building } from '../building';
import { StationService } from '../stations.service';

@Component({
  selector: 'app-neighbourhood',
  templateUrl: './neighbourhood.component.html',
  styleUrls: ['./neighbourhood.component.scss']
})
export class NeighbourhoodComponent implements OnInit,AfterViewInit {

  buildings: Building[] = [];
  buildings$: Subscription = new Subscription();
  stationId: number = 0;
  errorMessage: string = '';

  scale: number = 1;

  cordsBuilding1 : string = "100,160,360,420";
  

  

  constructor(private stationService: StationService,private router: Router) {
    this.stationId = +this.router.getCurrentNavigation()?.extras.state?.['stationId'];
   }

  ngOnInit(): void {
    this.GetEscapeRoomsOfStation(this.stationId);
  }
  
  ngAfterViewInit() {
    this.ChangeViewport()
  }
  
  ChangeViewport(){
    if (this.neighbourhoodImg != null){
      var width = this.neighbourhoodImg.nativeElement.offsetWidth;
    }
    this.scale= Math.round(100*width/1283)/100; //1283px is the width of the img

    //100, 160, 360, 400 are the coords of building1
    this.cordsBuilding1 = [Math.round(100*this.scale).toString(), Math.round(160*this.scale).toString(),Math.round(360*this.scale).toString(),Math.round(420*this.scale).toString(),].join(",")
  }


  
  @ViewChild('neighbourhoodImg')
  neighbourhoodImg: ElementRef | undefined;

  GetEscapeRoomsOfStation(stationId: number) {
    this.buildings$ = this.stationService.GetEscapeRoomsOfStation(stationId).subscribe(result => this.buildings = result);
  }

  NavigateToForm(buildingId: number) {
    this.router.navigate(['/form'],{ state: {firstBuildingId: buildingId} } );
    console.log("go to questions of building with ID: " + buildingId);
  }

}
