import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Bike } from '../bike/bike';
import { FormControl } from '@angular/forms';
import { mergeMap, debounceTime } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-bike-search',
  templateUrl: './bike-search.component.html',
  styleUrls: ['./bike-search.component.css']
})
export class BikeSearchComponent implements OnInit {
  bikes: Bike[] = [];
  searchControl = new FormControl();

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<Bike[]>(environment.apiBaseUrl + '/bikes').subscribe(bikes => (this.bikes = bikes));

    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      mergeMap(query => this.http.get(environment.apiBaseUrl + '/bikes?q=' + query))
    ).subscribe(console.log);
  }
}
