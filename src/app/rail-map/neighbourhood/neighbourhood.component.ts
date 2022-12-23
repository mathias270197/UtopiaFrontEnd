import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Building } from '../building';
import { StationService } from '../stations.service';

@Component({
  selector: 'app-neighbourhood',
  templateUrl: './neighbourhood.component.html',
  styleUrls: ['./neighbourhood.component.scss']
})
export class NeighbourhoodComponent implements OnInit {

  buildings: Building[] = [];
  buildings$: Subscription = new Subscription();
  stationId: number = 0;
  errorMessage: string = '';

  scale: number = 1;

  numberOfBuildings: number = 0;

  cordsBuilding1 : string = "100,160,360,420";
  cordsBuilding2Version1 : string = "666,95,920,360";
  cordsBuilding2Version2 : string = "475,130,706,369";
  cordsBuilding3 : string = "817,343,1061,581"; 

  buildingsImg : string = ""; 

  numberOfBuildingsIs2 : boolean = false;
  numberOfBuildingsIs3 : boolean = false;
  

  

  constructor(ngbAlertConfig: NgbAlertConfig, private stationService: StationService,private router: Router, private cd: ChangeDetectorRef) {
    // ngbAlertConfig.animation = false;
    this.stationId = +this.router.getCurrentNavigation()?.extras.state?.['stationId'];
    this.GetEscapeRoomsOfStation(this.stationId);
    this.numberOfBuildings = +this.router.getCurrentNavigation()?.extras.state?.['numberOfBuildings'];
    
   }
  ngOnInit(): void {

    switch(this.numberOfBuildings) {
      case 2:
        this.numberOfBuildingsIs2 = true;
        this.buildingsImg = "../../assets/images/neigberhood2buildings.jpg"
        break;
      case 3:
        this.numberOfBuildingsIs3 = true;
        this.buildingsImg = "../../assets/images/neigberhood3buildings.jpg"
        break;
      default:
        this.buildingsImg = "../../assets/images/neigberhood2buildings.jpg"
    }

  }

  
  ChangeViewport(){
    if (this.neighbourhoodImg != null){
      var width = this.neighbourhoodImg.nativeElement.offsetWidth;
    }
    this.scale= Math.round(100*width/1283)/100; //1283px is the width of the img

    //100, 160, 360, 400 are the coords of building1
    this.cordsBuilding1 = [Math.round(100*this.scale).toString(), Math.round(160*this.scale).toString(),Math.round(360*this.scale).toString(),Math.round(420*this.scale).toString(),].join(",")
    this.cordsBuilding2Version1 = [Math.round(666*this.scale).toString(), Math.round(95*this.scale).toString(),Math.round(920*this.scale).toString(),Math.round(360*this.scale).toString(),].join(",")
    this.cordsBuilding2Version2 = [Math.round(475*this.scale).toString(), Math.round(130*this.scale).toString(),Math.round(706*this.scale).toString(),Math.round(369*this.scale).toString(),].join(",")
    this.cordsBuilding3 = [Math.round(817*this.scale).toString(), Math.round(343*this.scale).toString(),Math.round(1061*this.scale).toString(),Math.round(581*this.scale).toString(),].join(",")
    // 475,130,706,369

    // cordsBuilding2Version2 : string = ",,,";
    // cordsBuilding3 : string = ",,,";
  
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
