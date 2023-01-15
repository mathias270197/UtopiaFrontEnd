import { Component, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { getMaxListeners } from 'process';
import { LocalStorageService } from 'src/app/local-storage/local-storage.service';
import { GraduateProgramService } from 'src/app/model/graduate-programe.service';
import { MetrolineService } from '../metroline.service';


@Component({
  selector: 'app-metroline',
  templateUrl: './metroline.component.html',
  styleUrls: ['./metroline.component.scss']
})
export class MetrolineComponent implements OnInit {
  lines: any = null;
  activeline: any = [];
  stations: any = [];
  graduatePrograms: any = [];
  gp: any;
  activeLineID = 2;
  faculties: any = [];
  activeStationColor: string = "red";
  activeStationId: number = 0;
  completedStations: any[] = [];
  completedStationColor: string = "black";
  completedStationColorPartion: string = "grey";
  blinkingDuration: number = 500; // in milliseconds
  sleep = (blinkingDuration: number) => new Promise(r => setTimeout(r, blinkingDuration));
  previousActiveStationId: number = 0;
  connectionGraduateProgramId = 0;
  previousConnectionGraduateProgramId = 0;

  constructor(private router: Router, private metroLineService: MetrolineService, private graduteProgramService: GraduateProgramService,
    private localStorageService: LocalStorageService, private renderer: Renderer2) { }

  async ngOnInit(): Promise<void> {

    // Get the active station
    this.activeStationId = Number(this.localStorageService.getActiveStationId());
    // Determine on which line it is located
    this.lines = this.metroLineService.getLines();
    console.log('lines', this.lines)
    this.faculties = this.localStorageService.getFaculties();
    console.log('faculties', this.faculties)
    // if(this.localStorageService.getCurrentLine() ==1){
    // this.activeLineID = this.getLine();}
    this.activeLineID = this.getLine();
    this.localStorageService.setCurrentLine(this.activeLineID);
    // Get the completed stations
    this.completedStations = this.localStorageService.getCompletedStations();
    this.updateStationColors();




    this.activeline = this.lines[this.activeLineID]
    console.log('active line', this.activeline)
    this.stations = this.lines[this.activeLineID].stations
    console.log(this.stations)

    console.log
    for (let i = 0; i < this.lines[this.activeLineID].stations.length; i++) {
      let tempOp = this.lines[this.activeLineID].stations[i];
      if (tempOp.graduateProgramId != null) {
        this.graduatePrograms.push(tempOp)
      }

    }
    console.log('opl', this.graduatePrograms)
  }

  async goToForm(destinationStationId: number) {

    console.log('Going to form with id: ' + destinationStationId);
    // Get the indexes in the active line between the active station and the destination station
    let transfer: number[] = [];
    let destinationStationIndexOnLine = 0;
    let activeStationIndexOnLine = 0;
    for (let i = 0; i < this.graduatePrograms.length; i++) {
      let currentGraduateProgramId = this.graduatePrograms[i].graduateProgramId
      transfer.push(currentGraduateProgramId)
      if (currentGraduateProgramId == this.activeStationId) {
        // Get the position of the active station
        activeStationIndexOnLine = transfer.length - 1;
      }
      if (currentGraduateProgramId == destinationStationId) {
        // Get the position of the destination station
        destinationStationIndexOnLine = transfer.length - 1;
      }
    }
    console.log('Index active station : ' + activeStationIndexOnLine);
    console.log('Index destination station : ' + destinationStationIndexOnLine);
    // Check if we need to trim and/or reverse the array
    if (activeStationIndexOnLine < destinationStationIndexOnLine) {
      transfer = transfer.slice(activeStationIndexOnLine, destinationStationIndexOnLine + 1)
      console.log('transfer no reverse after slice: ' + transfer);
    } else {
      transfer = transfer.slice(destinationStationIndexOnLine, activeStationIndexOnLine + 1).reverse();
      console.log('transfer with reverse after slice: ' + transfer);
    }
    console.log('transfer: ' + transfer);
    // Loop over the stations in between to go over the line to the destination station
    for (let i = 0; i < transfer.length; i++) {
      this.previousActiveStationId = this.activeStationId;
      this.previousConnectionGraduateProgramId = this.connectionGraduateProgramId;
      this.activeStationId = transfer[i];
      this.updateStationColors();
      await this.sleep(this.blinkingDuration);
    }

    this.localStorageService.setActiveStationId(destinationStationId);
    this.router.navigateByUrl("/form")
  }

  getLine() {
    let activeLineID = -1;
    for (let i = 0; i < this.lines.length; i++) {
      let stations = this.lines[i].stations
      // console.log('line: ' + i)
      // console.log('Stations: ' + stations)
      // console.log('Lengte station: ' + stations.length)
      for (let j = 0; j < stations.length; j++) {
        // console.log('Station: ' + j)
        // console.log('Vergelijking: ' + stations[j].graduateProgramId + ' - ' + this.activeStationId)
        if (stations[j].graduateProgramId == this.activeStationId) {
          activeLineID = this.lines[i].lineId;
          console.log('Nieuwe actieve lijn: ' + activeLineID);
        }
      }
    }
    return activeLineID
  }


  changeLine(id: number): void {

    // get the current position of the active station in order to be able to get the connection to the crossing line
    let currentId = 0;
    for (let i = 0; i < this.graduatePrograms.length; i++) {
      if (this.graduatePrograms[i].graduateProgramId == this.activeStationId) {
        currentId = i;
      }
    }
    // let station = this.graduatePrograms[currentId].connection.stationId
    // 
    // this.localStorageService.setCurrentLine(99)
    //change the activelineId to the choosen line id.
    this.activeLineID = id;
    // set the active station id to the id of the station of the new choosen line
    this.localStorageService.setActiveStationId(this.lines[this.activeLineID].stations[this.graduatePrograms[currentId].connection.stationId].graduateProgramId)
    // Empty the graduteprograms array before reloading the component
    this.graduatePrograms = [];
    this.ngOnInit();
  }

  updateStationColors() {
    // First revert the previous active station and connection
    if (this.previousActiveStationId != 0) {
    this.updateStationColor(this.previousActiveStationId, 'white');
    }
    if (this.previousConnectionGraduateProgramId != 0) {
      this.updateStationColor(this.previousConnectionGraduateProgramId, 'white');
    }
    // Update the already completed stations
    for (let i = 0; i < this.completedStations.length; i++) {
      this.updateStationColor(this.completedStations[i].graduateProgramId, this.completedStationColor)
    }
    // Update the active station color
    this.updateStationColor(this.activeStationId, this.activeStationColor);
    // If the active station has a connection, also highlight the connection
    let connection = this.localStorageService.getStationWithGraduateProgramId(this.activeStationId);
    if (connection != null) {
      this.connectionGraduateProgramId = this.localStorageService.getGraduateProgramIdwithLineIdAndStationId(connection.lineId, connection.stationId)
      console.log('Dit is de connectie ID: ' + this.connectionGraduateProgramId);
      this.updateStationColor(this.connectionGraduateProgramId, this.activeStationColor)
    }
  }

  updateStationColor(id: number, color: string) {
    const span_id = this.renderer.selectRootElement('#gp_' + id);
    this.renderer.setAttribute(span_id, 'fill', color);
    console.log('Updating id ' + id + ' with color ' + color);
  }


}




