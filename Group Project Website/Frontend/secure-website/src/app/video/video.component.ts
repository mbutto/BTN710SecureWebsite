import { Component, OnInit } from '@angular/core';
import { HomeServiceService } from '../home-service.service'
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  constructor(private _homeService: HomeServiceService,
    private _router: Router) { }

    isLogged = []

    ngOnInit() {
      this._homeService.getLogged()
        .subscribe(
          res => this.isLogged = res,
          err => {
            if( err instanceof HttpErrorResponse ) {
              if (err) {
                this._router.navigate(['/login'])
              }
            }
          }
        )
    }
  }
