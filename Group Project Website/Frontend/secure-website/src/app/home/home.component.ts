import { Component, OnInit } from '@angular/core';
import { HomeServiceService } from '../home-service.service'
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  template: `<pdf-viewer [src]="pdfSrc" 
  [render-text]="true"
  style="display: block;"
  ></pdf-viewer>`,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  pdfSource =  "assets/BTN710 Report 2020.pdf";

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
