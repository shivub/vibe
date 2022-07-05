import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, mergeMap } from 'rxjs';
import { MovieDetailModel } from 'src/app/models/MovieDetailModel';
import { ShowModel } from 'src/app/models/ShowModel';
import { ConfigurationService } from 'src/app/services/ConfigurationService';
import { ShowService } from 'src/app/services/ShowService';

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.css']
})
export class ShowDetailComponent implements OnInit {

  private _id?: number;
  private _showDetail!: MovieDetailModel;

  public imageBaseUrl!: string;
  public cardContext!: ShowModel;
  constructor(
    private _route: ActivatedRoute, 
    private _showService: ShowService,
    private _configService: ConfigurationService,
    private _cd: ChangeDetectorRef) { }
  

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
        return this._showService.getMovieDetails(700);
      })
    ).subscribe(res => {
      this.showDetail = res;
      this.showDetail.backdrop_path = this.imageBaseUrl + 'w780/' + this.showDetail.backdrop_path;
      containerStyle.background = `linear-gradient(-45deg,rgba(42, 42, 42,0.9) 70%, transparent 100%) , url("${this.showDetail.backdrop_path}")`;
      this.cardContext = {id: this.showDetail.id, title: this.showDetail.original_title, name: '', poster_path: this.showDetail.poster_path, media_type: 'movie'}
      console.log(this.cardContext);
      this.containerStyle = containerStyle;
      this._cd.detectChanges();
    });
  }

}
