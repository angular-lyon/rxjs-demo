import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { exhaustMap, startWith, switchMap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Bike } from '../bike/bike';

@Component({
  selector: 'app-bike-search',
  templateUrl: './bike-search.component.html',
  styleUrls: ['./bike-search.component.css']
})
export class BikeSearchComponent {
  searchControl = new FormControl();

  bikes$ = this.searchControl.valueChanges
    .pipe(
      startWith(''),
      switchMap(query =>
        timer(0, 1000).pipe(exhaustMap(() => this._getBikes(query)))
      )
    );

  constructor(private http: HttpClient) {}

  private _getBikes(query: string): Observable<Bike[]> {
    return this.http.get<Bike[]>(environment.apiBaseUrl + '/bikes', {
      params: {
        q: query
      }
    });
  }
}
