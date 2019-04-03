import { Injectable } from '@angular/core';
import { BackendService } from '../services/backend.service';

@Injectable({
  providedIn: 'root'
})
export class ControlPointsService {
  
  image: string;
  solidPoints: any = [];
  hollowPoints: any = [];

  constructor(
    public backend: BackendService,
  ) {
    this.solidPoints = [];
  }

  addPoint(point) {
    this.solidPoints.push(point);
    this._update();
  }

  autoFill() {
    if (this.hollowPoints.length)
      this.solidPoints.push(this.hollowPoints[0]);
    this._update();
  }

  clear() {
    this.solidPoints.length = 0;
    this.hollowPoints.length = 0;
  }

  _update() {
    let points = [];
    for (let i = 0; i < this.solidPoints.length; i++) {
      points.push({'x': this.solidPoints[i][0], 'y': this.solidPoints[i][1]});
    }
    this.backend.post('/control_points/' + this.image, {'controlpoints': {'points': points}})
      .subscribe((response) => {
        console.info("request", points);
        console.info("response", response);
        this.hollowPoints.length = 0;
        let points = response['metadata']['points'];
        for (let i = 0; i < points.length; i++) {
          this.hollowPoints.push([points[i]['x'], points[i]['y']]);
        }
      });
  }
}
