import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PointsService } from '../points.service';


@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.scss']
})
export class PointsComponent implements OnInit {
  points: number | undefined;

  constructor(private router: Router, private pointsService: PointsService) { }

  ngOnInit(): void {
    this.points = this.pointsService.getPoints();
  }

}
