import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { Faculty } from './faculty';
import { GraduateProgramService } from './graduate-programe.service';

@Injectable({
  providedIn: 'root'
})
export class CoordinatesService {

  constructor(private graduateProgramService: GraduateProgramService, private localStorageService: LocalStorageService) { }

  // The 'defaultLines' variable contains the hardcoded default relative coordinates for the metro map
  // With 'x' and 'y' you can draw the line from the start station until the end station of the line.
  // With 'fillUpOrder' you can define in which order the stations are placed on the line.
  // Connection defines to which other lines you can connect. The null means there is no connection. An object including {lineId: 4, stationId: 3} indicates a connection.
  private defaultLines: any = [
    {
      id: 0,
      color: "red",
      x: [20, 20, 48, 64, 81, 102, 129, 140, 150, 155],
      y: [17, 52, 80, 80, 80, 80, 80, 85, 85, 75],
      fillUpOrder: [3, 4, 5, 6, 9, 0, 2, 1, 7, 8],
      connection: [null, null, null, {lineId: 3, stationId: 3}, {lineId: 3, stationId: 4}, {lineId: 1, stationId: 6}, {lineId: 1, stationId: 7}, null, null, null],
    },
    {
      id: 1,
      color: "green",
      x: [65, 65, 65, 65, 70, 95, 102, 120, 123, 123, 126],
      y: [10, 31, 48, 56, 62, 62, 80, 88, 96, 120, 124],
      fillUpOrder: [5, 6, 7, 8, 2, 0, 3, 9, 1, 4],
      connection: [null, null, null, null, null, null, {lineId: 0, stationId: 6}, {lineId: 0, stationId: 7}, {lineId: 2, stationId: 8}, null],
    },
    {
      id: 2,
      color: "blue",
      x: [5, 32, 43, 81, 91, 103, 120, 129, 129, 150],
      y: [125, 98, 98, 98, 98, 88, 88, 80, 65, 45],
      fillUpOrder: [1, 2, 6, 3, 4, 5, 0, 7, 8, 9],
      connection: [null, null, {lineId: 1, stationId: 3}, null, null, null, null, null, null, null],
    },
    {
      id: 3,
      color: "yellow",
      x: [43, 43, 48, 48, 48, 65, 87, 104, 114, 134],
      y: [118, 98, 90, 80, 62, 48, 48, 48, 38, 18],
      fillUpOrder: [3, 4, 0, 1, 7, 8, 2, 9, 5, 6],
      connection: [null, null, null, {lineId: 0, stationId: 4}, {lineId: 0, stationId: 5}, null, null, null, null, null],
    },
    {
      id: 4,
      color: "orange",
      x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      fillUpOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      connection: [null, null, null, null, null, null, null, null, null, null],
    },
    {
      id: 5,
      color: "purple",
      x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      fillUpOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      connection: [null, null, null, null, null, null, null, null, null, null],
    },
    {
      id: 6,
      color: "brown",
      x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      fillUpOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      connection: [null, null, null, null, null, null, null, null, null, null],
    },
    {
      id: 7,
      color: "pink",
      x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      fillUpOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      connection: [null, null, null, null, null, null, null, null, null, null],
    },
    {
      id: 8,
      color: "violet",
      x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      fillUpOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      connection: [null, null, null, null, null, null, null, null, null, null],
    },
    {
      id: 9,
      color: "black",
      x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      fillUpOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      connection: [null, null, null, null, null, null, null, null, null, null],
    },
  ]

  // Some variables
  faculties: Faculty[] = [];
  faculties$: Subscription = new Subscription();

  metroline: string = '';

  // Function to calculate the metro map => hardcoded!
  async getCoordinates() {
    // // Collect the faculties asynchronously
    // this.faculties$ = this.graduateProgramService.getFaculties().subscribe(faculties => {
    //   this.faculties = faculties;
    // });

    // Collect the faculties synchronously 
    this.faculties = await this.graduateProgramService.getFacultiesSync();
    console.log('Faculties array');
    console.log(this.faculties);
    // Initiate the div for the metromap
    var metromap: string = '<div class="map-svg d-flex p-2"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 160 160">';
    // Variable to collect all the lines
    let lines: any[] = [];
    // For every line
    for (let i = 0; i < this.faculties.length; i++) {
      // Initiate a new polyline
      metromap += '<polyline points="';
      let stations: any = [];
      // Draw the line first
      for (let j = 0; j < this.defaultLines[i].x.length; j++) {
        // Set the template for this station, including a null for the graduateProgramId
        let tempStation = {
          graduateProgramId: null,
          name: null,
          x: this.defaultLines[i].x[j],
          y: this.defaultLines[i].y[j],
          connection: this.defaultLines[i].connection[j]
        }
        // Push the station into the stations array
        stations.push(tempStation);
        // Add the points to the polyline
        metromap += this.defaultLines[i].x[j] + ',' + this.defaultLines[i].y[j] + ' ';
      }
      // Terminiate this polyline
      metromap += '" style="fill:none;stroke:' + this.defaultLines[i].color + ';stroke-width:1"/>';
      // Initiate the visible stations for this line
      metromap += '<g id="stops" fill="#FFF" stroke="black">';
      // Now fill up the n-faculty stations with the graduateProgramIds
      for (let k = 0; k < this.faculties[i].graduatePrograms.length; k++) {
        // Get the index of the station that is next in line to be filled up
        let next = this.defaultLines[i].fillUpOrder[k];
        // Put the graduateProgramId into that specific station
        stations[next].graduateProgramId = this.faculties[i].graduatePrograms[k].id;
        // Add the name to the station
        stations[next].name = this.faculties[i].graduatePrograms[k].name;
        // Insert the visible station in the metromap
        metromap += '<circle id="gp_' + this.faculties[i].graduatePrograms[k].id + '" class="station" cx="' + this.defaultLines[i].x[next] + '" cy="' + this.defaultLines[i].y[next] +'" r="2" stroke-width="1" fill="white" />'
      }
      // Terminate the visible stations
      metromap += '</g>';
      // set the template for this line
      let tempLine = {
        lineId: i,
        color: this.defaultLines[i].color,
        stations: stations,
      }
      // Push the line into the lines array
      lines.push(tempLine)
    }

    console.log('Lines: ');
    console.log(lines)
    metromap += '</svg></div>';
    // console.log('Metromap: ');
    // console.log(metromap)

    this.localStorageService.setLines(lines);
    this.localStorageService.setMetromap(metromap);

    // return metromap

  }

  // calculateMetroMap() {
  //   this.getCoordinates();
  //   console.log('Faculties array');
  //   console.log(this.faculties);
  //   // Initiate the div  for the metromap
  //   var metromap: String = '<div class="map-svg d-flex p-2"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 170 180">';
  //   let lines: any[] = [];
  //   // For every line
  //   for (let i = 0; i < this.faculties.length; i++) {
  //     // Initiate the polyline
  //     metromap += '<polyline points="';
  //     let stations: any = [];
  //     // Draw the line first
  //     for (let j = 0; j < this.defaultLines[i].x.length; j++) {
  //       // Set the template for this station, including a null for the graduateProgramId
  //       let tempStation = {
  //         graduateProgramId: null,
  //         x: this.defaultLines[i].x[j],
  //         y: this.defaultLines[i].y[j],
  //       }
  //       // Push the station into the stations array
  //       stations.push(tempStation);
  //     }
  //     // Terminiate the polyline
  //     metromap += '" style="fill:none;stroke:green;stroke-width:2" />';
  //     // Now fill up the n-faculty stations with the graduateProgramIds
  //     for (let k = 0; k < this.faculties[i].graduatePrograms.length; k++) {
  //       // Get the index of the station that is next in line to be filled up
  //       let next = this.defaultLines[i].fillUpOrder[k];
  //       // Put the graduateProgramId into that specific station
  //       stations[next].graduateProgramId = this.faculties[i].graduatePrograms[k].id;
  //     }
  //     // set the template for this line
  //     let tempLine = {
  //       lineId: i,
  //       color: this.defaultLines[i].color,
  //       stations: stations,
  //     }
  //     // Push the line into the lines array
  //     lines.push(tempLine)
  //   }

  //   // metromap += '<p>test</p>';
  //   // metromap += '</svg></div>';
  //   console.log('Lines: ');
  //   console.log(lines)


  //   metromap += '<p>test</p></svg></div>';
  //   console.log('Metromap: ');
  //   console.log(metromap)

  //   return metromap

  // }


}
