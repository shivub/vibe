import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShowModel } from 'src/app/models/ShowModel';
import { ListService } from 'src/app/services/ListsService';
import { ShowService } from 'src/app/services/ShowService';
import { BrowseCategories, ShowCategory } from 'src/app/shared/constants/category.const';

@Component({
  selector: 'app-showlist',
  templateUrl: './showlist.component.html',
  styleUrls: ['./showlist.component.css']
})
export class ShowlistComponent implements OnInit {

  @Input()
  public browseCategory!: string;
  @Input()
  public shows!: ShowModel[];
  @Input()
  public imageBaseUrl!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
