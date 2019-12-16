import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { startWith, switchMap, exhaustMap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Bike } from '../bike/bike';
import { timer, Observable } from 'rxjs';

@Component({
  selector: 'app-bike-search',
  templateUrl: './bike-search.component.html',
  styleUrls: ['./bike-search.component.css']
})
export class BikeSearchComponent implements OnInit {
  bikes: Bike[] = [];
  searchControl = new FormControl();

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(
        startWith(''),
        switchMap(query =>
          timer(0, 1000).pipe(exhaustMap(() => this._getBikes(query)))
        )
      )
      .subscribe(bikes => (this.bikes = bikes));
  }

  private _getBikes(query: string): Observable<Bike[]> {
    return this.http.get<Bike[]>(environment.apiBaseUrl + '/bikes', {
      params: {
        q: query
      }
    });
  }
}
