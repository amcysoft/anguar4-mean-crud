import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from './shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  loading: boolean;

  constructor(private sharedService: SharedService) {}
  
  ngOnInit() {
    this.sharedService.isLoading.subscribe(v => this.loading = v);
  }

}
