import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bike-detail',
  templateUrl: './bike-detail.component.html',
  styleUrls: ['./bike-detail.component.css']
})
export class BikeDetailComponent {
  bike$ = this.route.paramMap.pipe(
    map(paramMap => paramMap.get('bikeId')),
    switchMap(bikeId =>
      this.httpClient.get(
        `${environment.apiBaseUrl}/bikes/${encodeURIComponent(bikeId)}`
      )
    )
  );

  constructor(private httpClient: HttpClient, private route: ActivatedRoute) {}

}
