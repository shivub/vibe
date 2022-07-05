import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { mergeMap, switchMap } from 'rxjs';
import { ShowModel } from 'src/app/models/ShowModel';
import { ConfigurationService } from 'src/app/services/ConfigurationService';
import { SearchService } from 'src/app/services/SearchService';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  
  public imageBaseUrl!: string;
  public showList!: ShowModel[];

  public showSearchBar: boolean = false;
  constructor(private _searchService: SearchService, private _configService: ConfigurationService) { }

  ngOnInit(): void {
    this._configService.getImageConfiguration()
    .subscribe((val) => {
      this.imageBaseUrl = val.images.base_url + '/w342'
    });

    this._searchService.getSearchEmitter()
    .pipe(switchMap((text)=> this._searchService.searchAll(text)))
    .subscribe(shows => this.showList = shows);
  }


}
