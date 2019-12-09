import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject, timer } from 'rxjs';
import { exhaustMap, startWith, switchMap, takeUntil } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Bike } from '../bike/bike';

@Component({
  selector: 'app-bike-search',
  templateUrl: './bike-search.component.html',
  styleUrls: ['./bike-search.component.css']
})
export class BikeSearchComponent implements OnInit, OnDestroy {
  bikes: Bike[] = [];
  searchControl = new FormControl();

  private destroy = new Subject();

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(
        startWith(''),
        switchMap(query =>
          timer(0, 1000).pipe(exhaustMap(() => this._getBikes(query)))
        ),
        takeUntil(this.destroy)
      )
      .subscribe(bikes => (this.bikes = bikes));
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  private _getBikes(query: string): Observable<Bike[]> {
    return this.http.get<Bike[]>(environment.apiBaseUrl + '/bikes', {
      params: {
        q: query
      }
    });
  }
}
