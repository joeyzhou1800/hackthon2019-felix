import { Component, OnInit } from '@angular/core';
import { ControlPointsService } from '../services/control-points.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  constructor(
    public controlPoints: ControlPointsService,
  ) { }

  ngOnInit() {
  }

}
