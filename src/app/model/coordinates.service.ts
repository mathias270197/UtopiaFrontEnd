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
      y: [ 0, 10, 20, 30, 40, 50, 60, 70, 80, 90],
      fillUpOrder: [2, 1, 0, 3, 4, 5, 6, 7, 8, 9],
    },
    {
      color: "dark green",
      x: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
      y: [50, 50, 50, 50, 50, 50, 50, 50, 50,  50],
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
      // console.log('This is within the coordinates service:')
      // console.log(this.faculties);
      // For every line
      for (let i = 0; i < this.faculties.length; i++) {
        let stations: any = [];
        // console.log('In faculty ' + this.faculties[i].id);
        // For every station
        for (let j = 0; j < this.faculties[i].graduatePrograms.length; j++) {
          // console.log('In graduate program ' + this.faculties[i].graduatePrograms[j].id);
          // Get the next station to fill up
          let positionOnLine = this.defaultLines[i].fillUpOrder[j];
          // Set the template for this station
          let tempStation = {
            graduateProgramId: this.faculties[i].graduatePrograms[j].id,
            x: this.defaultLines[i].x[positionOnLine],
            y: this.defaultLines[i].y[positionOnLine],
          }
          // Push the station into the stations array
          stations.push(tempStation);
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
