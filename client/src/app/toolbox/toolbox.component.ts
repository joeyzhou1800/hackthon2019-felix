import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material'

import { BackendService } from '../services/backend.service';
import { ControlPointsService } from '../services/control-points.service';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.scss']
})
export class ToolboxComponent implements OnInit {

  images: string[];
  
  constructor(
    public backend: BackendService,
    public controlPoints: ControlPointsService,
  ) {
    this.getImageList();
  }

  ngOnInit() {
  }

  getImageList() {
    this.backend.get('/images/')
      .subscribe((response) => {
        this.images = response['metadata']['images'];
      });
  }
}
