import { Component, AfterViewInit } from '@angular/core';

import {
  ShortcutInput,
  ShortcutEventOutput,
  KeyboardShortcutsComponent
} from "ng-keyboard-shortcuts";

import { environment } from '../../environments/environment';
import { ControlPointsService } from '../services/control-points.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements AfterViewInit {

  ratio = 10;
  shortcuts: ShortcutInput[] = [];

  constructor(
    public controlPoints: ControlPointsService,
  ) { }

  ngAfterViewInit() {
    this.shortcuts.push({
      key: ["cmd + e"],
      label: "Auto complete",
      description: "Auto complete",
      command: () => this.controlPoints.autoFill(),
      preventDefault: true,
    });
  }

  getImageUrl() {
    if (this.controlPoints.image)
      return environment.serverUrl + '/image/' + this.controlPoints.image;
    else
      return '//';
  }

  onDblClick(event) {
    const abs_x = event.offsetX / this.ratio;
    const abs_y = event.offsetY / this.ratio;
    const point = [abs_x, abs_y];
    if ((abs_x >= 0) && (abs_x < 640) && (abs_y >= 0) && (abs_y < 640)) {
      this.controlPoints.addPoint(point);
    }
  }

  svgPath(){
    let points = [];
    let sps = this.controlPoints.solidPoints;
    for (let i=0; i < sps.length; i++) {
      points.push([sps[i][0] * this.ratio, sps[i][1] * this.ratio]);
    }
    let hps = this.controlPoints.hollowPoints;
    for (let i=0; i < hps.length; i++) {
      points.push([hps[i][0] * this.ratio, hps[i][1] * this.ratio]);
    }
    const d = points.reduce((acc, point, i, a) => i === 0
      ? `M ${point[0]},${point[1]}`
      : `${acc} ${this.bezierCommand(point, i, a)}`
    , '');
    return `M0 0, ${d}`;
  }
  controlPoint(current, previous, next, reverse){
    // When 'current' is the first or last point of the array
    // 'previous' or 'next' don't exist.
    // Replace with 'current'
    const p = previous || current
    const n = next || current
    // The smoothing ratio
    const smoothing = 0.2
    // Properties of the opposed-line
    const o = this.line(p, n)
    // If is end-control-point, add PI to the angle to go backward
    const angle = o.angle + (reverse ? Math.PI : 0)
    const length = o.length * smoothing
    // The control point position is relative to the current point
    const x = current[0] + Math.cos(angle) * length
    const y = current[1] + Math.sin(angle) * length
    return [x, y]
  }
  bezierCommand(point, i, a){
    // start control point
    const [cpsX, cpsY] = this.controlPoint(a[i - 1], a[i - 2], point, false)
    // end control point
    const [cpeX, cpeY] = this.controlPoint(point, a[i - 1], a[i + 1], true)
    return `C ${cpsX},${cpsY} ${cpeX},${cpeY} ${point[0]},${point[1]}`
  }
  line(pointA, pointB){
    const lengthX = pointB[0] - pointA[0]
    const lengthY = pointB[1] - pointA[1]
    return {
      length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
      angle: Math.atan2(lengthY, lengthX)
    }
  }
}
