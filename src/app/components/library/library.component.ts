import { Component, OnInit } from '@angular/core';
import { ShowModel } from 'src/app/models/ShowModel';
import { ConfigurationService } from 'src/app/services/ConfigurationService';
import { ListService } from 'src/app/services/ListsService';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  public listNames!: string[];
  public listsData!: {[id: string]: ShowModel[]};
  public imageBaseUrl!: string;
  constructor(private _listService: ListService, private _configService: ConfigurationService) { }

  ngOnInit(): void {
    this._configService.getImageConfiguration().subscribe({
      next: (res) => {
        this.imageBaseUrl = res.images.base_url + '/w185'; 
      }
    });
    this.listNames = this._listService.getListNames();
    this.listsData = this._listService.getAllLists();
  }

}
