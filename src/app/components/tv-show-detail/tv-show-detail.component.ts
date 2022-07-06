import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs';
import { ReviewModel } from 'src/app/models/ReviewModel';
import { ShowModel } from 'src/app/models/ShowModel';
import { TvDetailModel } from 'src/app/models/TvDetailModel';
import { UserService } from 'src/app/services/UserService';
import { ConfigurationService } from 'src/app/services/ConfigurationService';
import { ListService } from 'src/app/services/ListsService';
import { ShowService } from 'src/app/services/ShowService';
import { ReviewService } from 'src/app/services/ReviewService';
import { SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-tv-show-detail',
  templateUrl: './tv-show-detail.component.html',
  styleUrls: ['./tv-show-detail.component.css']
})
export class TvShowDetailComponent implements OnInit {
  private _id!: number;
  private _showDetail!: TvDetailModel;
  public user!: SocialUser;
  public imageBaseUrl!: string;
  public cardContext!: ShowModel;
  public isWatched!: boolean;
  public isFav!: boolean;
  public isWatchLater!: boolean;
  public reviews!: ReviewModel[];
  public rating!: number;
  public review!: string;
  public isReviewAdded: boolean = false;

  constructor(
    private _route: ActivatedRoute, 
    private _showService: ShowService,
    private _configService: ConfigurationService,
    private _cd: ChangeDetectorRef,
    private _listService: ListService,
    private _router: Router,
    private _userService: UserService,
    private _reviewService: ReviewService) { }
  

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

    this._reviewService.getTvReviews(this._id).subscribe((res) => {
      this.reviews = res.results;
    });

    this._userService.getUser().subscribe(user => {
      this.user = user.userDetails as SocialUser;
      this.isReviewAdded = !this.reviews?.some(r => r.author_details.username === this.user.email);
    });
  }

  public markWatchLater(){
    if(!this._userService.isUserLoggedIn()){
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
    if(!this._userService.isUserLoggedIn()){
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
    if(!this._userService.isUserLoggedIn()){
      this._router.navigateByUrl('/login');
      return;
    }
    if(this.isWatched)
      return;
    this.isWatched = true;
    this._listService.addToWatched(this.cardContext);
  }

  public onReviewSubmit()
  {
    const review = new ReviewModel(
      this.user.email,
      this.user.firstName, 
      this.rating, 
      this.review, 
      this.showDetail.id, 
      'tv'
    );
    this._reviewService.saveReview(review);
    this.reviews.push(review);
    this.isReviewAdded = true;
  }

  private updateFlags(){
    const val = this._listService.findList(this._id);
    this.isWatchLater = val.isWatchLater;
    this.isWatched = val.isWatched;
    this.isFav = val.isFavourite
  }

}
