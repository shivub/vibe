import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShowModel } from 'src/app/models/ShowModel';
import { AppInitService } from 'src/app/services/AppinitService';
import { ListService } from 'src/app/services/ListsService';

@Component({
  selector: 'app-showcard',
  templateUrl: './showcard.component.html',
  styleUrls: ['./showcard.component.css']
})
export class ShowcardComponent implements OnInit {

  @Input()
  public context: ShowModel = {} as ShowModel;

  @Input()
  public  imageBaseUrl!: string

  @Input()
  public showListMenu!: boolean 

  public path!: String;
  public favIcon: string = 'favorite_border';
  constructor(private _listService: ListService,
    private _appInit: AppInitService,
    private _router: Router) { }

  public ngOnInit(): void {
    console.log(this.context);
    this.path = this.context.media_type === 'movie'? '/movie-detail': '/tv-detail';
    this.updateFlags();
  }


  public addToWatchLater(){
    if(!this._appInit.isUserLoggedIn()){
      this._router.navigateByUrl('/login');
      return;
    }
    this.context.isWatchLater = !this.context.isWatchLater;
    if(this.context.isWatchLater){
      this._listService.addToWatchLater(this.context);
    }else {
      this._listService.removeFromWatchLater(this.context);
    }
    
  }

  public addToFavourites(){
    if(!this._appInit.isUserLoggedIn()){
      this._router.navigateByUrl('/login');
      return;
    }
    this.context.isfavourite = !this.context.isfavourite;
    if(this.context.isfavourite){
      this.favIcon = 'favorite';
      this._listService.addToFavourites(this.context);
    }else {
      this.favIcon = 'favorite_border';
      this._listService.removeFromFavourites(this.context);
    }
  }

  public addToWatched(){
    if(!this._appInit.isUserLoggedIn()){
      this._router.navigateByUrl('/login');
      return;
    }
    if(this.context.isWatched){
      return;
    }
    this.context.isWatched = true;
    this._listService.addToWatched(this.context);
  }

  public getPlayLists(): string[] {
    return this._listService.getListNames();
  }

  private updateFlags(){
    const val = this._listService.findList(this.context.id);
    this.context.isWatchLater = val.isWatchLater;
    this.context.isWatched = val.isWatched;
    this.context.isfavourite = val.isFavourite
  }

}
