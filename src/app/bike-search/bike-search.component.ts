import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Bike } from '../bike/bike';

@Component({
  selector: 'app-bike-search',
  templateUrl: './bike-search.component.html',
  styleUrls: ['./bike-search.component.css']
})
export class BikeSearchComponent implements OnInit {
  bikes: Bike[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<Bike[]>('/assets/bikes.json').subscribe(bikes => (this.bikes = bikes));
  }
}
