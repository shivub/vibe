import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ShowModel } from 'src/app/models/ShowModel';
import { ConfigurationService } from 'src/app/services/ConfigurationService';
import { ShowService } from 'src/app/services/ShowService';
import { BrowseCategories } from 'src/app/shared/constants/category.const';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  public browseCat = BrowseCategories;
  public imageBaseUrl!: string;
  public showDict!: {[id: string]: Observable<ShowModel[]>};
  constructor(
    private _configService: ConfigurationService,
    private _showService: ShowService,
    ) { }

  ngOnInit(): void {
    this._configService.getImageConfiguration().subscribe({
      next: (res) => {
        this.imageBaseUrl = res.images.base_url + '/w185'; 
      }
    });
    this._showService.fetchShows();
    this._showService.getBrowseType().subscribe(val => this.showDict = this._showService.getShows(val));
  }

}
