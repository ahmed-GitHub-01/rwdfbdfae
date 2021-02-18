import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MapSetting, SmallDataService } from 'src/app/_services/smallData.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  mapTypes: MapSetting[];
  keys = {};
  constructor(private route: Router, private small: SmallDataService) {
    this.mapTypes = small.getMapTypes();
  }
  // tslint:disable-next-line:typedef
  ngOnInit() { }
  // tslint:disable-next-line:typedef
  telecome() {
    this.route.navigate(['/callCenter']);
  }
}
