import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { Faculty } from './faculty';
import { GraduateProgramService } from './graduate-programe.service';

@Injectable({
  providedIn: 'root'
})
export class CoordinatesService {

  constructor(private graduateProgramService: GraduateProgramService) { }

  // The 'defaultLines' variable contains the hardcoded default relative coordinates for the metro map
  // With 'x' and 'y' you can draw the line from the start station until the end station of the line.
  // With 'fillUpOrder' you can define in which order the stations are placed on the line.
  private defaultLines: any = [
    {
      color: "red",
      x: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
      y: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90],
      fillUpOrder: [2, 1, 0, 3, 4, 5, 6, 7, 8, 9],
    },
    {
      color: "dark green",
      x: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
      y: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
      fillUpOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
    {
      color: "dark blue",
      x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      fillUpOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
    {
      color: "yellow",
      x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      fillUpOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
    {
      color: "orange",
      x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      fillUpOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
    {
      color: "purple",
      x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      fillUpOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
    {
      color: "light green",
      x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      fillUpOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
    {
      color: "light blue",
      x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      fillUpOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
    {
      color: "violet",
      x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      fillUpOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
    {
      color: "pink",
      x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      fillUpOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
  ]

  // Some variables
  faculties: Faculty[] = [];
  faculties$: Subscription = new Subscription();

  // Function to calculate the metro map
  async getCoordinates() {
    // Collect the faculties
    this.faculties$ = await this.graduateProgramService.getFaculties().subscribe(faculties => {
      this.faculties = faculties;
      let lines: any[] = [];
      // For every line
      for (let i = 0; i < this.faculties.length; i++) {
        let stations: any = [];
        // Draw the line first
        for (let j = 0; j < this.defaultLines[i].x.length; j++) {
          // Set the template for this station, including a null for the graduateProgramId
          let tempStation = {
            graduateProgramId: null,
            x: this.defaultLines[i].x[j],
            y: this.defaultLines[i].y[j],
          }
          // Push the station into the stations array
          stations.push(tempStation);
        }
        // Now fill up the n-faculty stations with the graduateProgramIds
        for (let k = 0; k < this.faculties[i].graduatePrograms.length; k++) {
          // Get the index of the station that is next in line to be filled up
          let next = this.defaultLines[i].fillUpOrder[k];
          // Put the graduateProgramId into that specific station
          stations[next].graduateProgramId = this.faculties[i].graduatePrograms[k].id;
        }
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
      return lines
    });
  }




}
