import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Station } from '../station';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.css']
})
export class StationComponent implements OnInit {

  @Input() station: Station = {
    id: 0,
    x: 0,
    y: 0
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  GoToStation(id: number) {
    // this.router.navigate(['/station', id]);
  }

}
