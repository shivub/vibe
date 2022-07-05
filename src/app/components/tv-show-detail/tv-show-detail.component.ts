import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs';
import { ReviewModel } from 'src/app/models/ReviewModel';
import { ShowModel } from 'src/app/models/ShowModel';
import { TvDetailModel } from 'src/app/models/TvDetailModel';
import { AppInitService } from 'src/app/services/AppinitService';
import { ConfigurationService } from 'src/app/services/ConfigurationService';
import { ListService } from 'src/app/services/ListsService';
import { ShowService } from 'src/app/services/ShowService';

@Component({
  selector: 'app-tv-show-detail',
  templateUrl: './tv-show-detail.component.html',
  styleUrls: ['./tv-show-detail.component.css']
})
export class TvShowDetailComponent implements OnInit {
  private _id!: number;
  private _showDetail!: TvDetailModel;

  public imageBaseUrl!: string;
  public cardContext!: ShowModel;
  public isWatched!: boolean;
  public isFav!: boolean;
  public isWatchLater!: boolean;
  public reviews!: ReviewModel[];

  constructor(
    private _route: ActivatedRoute, 
    private _showService: ShowService,
    private _configService: ConfigurationService,
    private _cd: ChangeDetectorRef,
    private _listService: ListService,
    private _router: Router,
    private _appInit: AppInitService) { }
  

  public get showDetail(){
    return this._showDetail
  }
  public set showDetail(value){
    this._showDetail = value;
  }

  public containerStyle = {};

  ngOnInit(): void {
    const containerStyle = {
      background: '',
      minHeight: '300px',
      height: 'calc(100vh / 0.5)',
      maxHeight: '540px',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'top center',
      backgroundSize: 'cover',
      color: '#fff',
    };
    this._id = Number(this._route.snapshot.paramMap.get('id'));
    this._configService.getImageConfiguration()
    .pipe(
      mergeMap((config) => {
        console.log(config.images);
        this.imageBaseUrl = config.images.base_url;
        return this._showService.getTvShowDetails(this._id);
      })
    ).subscribe(res => {
      this.showDetail = res;
      this.showDetail.backdrop_path = this.imageBaseUrl + 'w780/' + this.showDetail.backdrop_path;
      containerStyle.background = `linear-gradient(-45deg,rgba(42, 42, 42,0.9) 70%, transparent 100%) , url("${this.showDetail.backdrop_path}")`;
      this.cardContext = {id: this.showDetail.id, title: '', name: this.showDetail.name, poster_path: this.showDetail.poster_path, media_type: 'tv'}
      this.containerStyle = containerStyle;
      this.updateFlags();
      this._cd.detectChanges();
    });

    this._showService.getTvReviews(this._id).subscribe((res) => {
      this.reviews = res.results;
    });
  }

  public markWatchLater(){
    if(!this._appInit.isUserLoggedIn()){
      this._router.navigateByUrl('/login');
      return;
    }
    this.isWatchLater = !this.isWatchLater;
    if(this.isWatchLater){
      this._listService.addToWatchLater(this.cardContext);
    }else {
      this._listService.removeFromWatchLater(this.cardContext);
    }
  }

  public markFavourite(){
    if(!this._appInit.isUserLoggedIn()){
      this._router.navigateByUrl('/login');
      return;
    }
    this.isFav = !this.isFav;
    if(this.isFav){
      this._listService.addToFavourites(this.cardContext);
    }
    else{
      this._listService.removeFromFavourites(this.cardContext);
    }
  }

  public markWatched(){
    if(!this._appInit.isUserLoggedIn()){
      this._router.navigateByUrl('/login');
      return;
    }
    if(this.isWatched)
      return;
    this.isWatched = true;
    this._listService.addToWatched(this.cardContext);
  }

  private updateFlags(){
    const val = this._listService.findList(this._id);
    this.isWatchLater = val.isWatchLater;
    this.isWatched = val.isWatched;
    this.isFav = val.isFavourite
  }

}
