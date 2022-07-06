import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, filter, map, mergeMap, Observable, of, ReplaySubject, Subject, tap } from "rxjs";
import { MovieDetailModel } from "../models/MovieDetailModel";
import { ResponseWrapper } from "../models/ResponseWrapper";
import { ReviewModel } from "../models/ReviewModel";
import { ShowModel } from "../models/ShowModel";
import { TvDetailModel } from "../models/TvDetailModel";
import { API_KEY, BASE_URL, BrowseCategories } from "../shared/constants/category.const";

@Injectable()
export class ShowService{
    private _baseUrl = BASE_URL;
    private _apiKey = API_KEY;
    private _browseType$: BehaviorSubject<string> = new BehaviorSubject('');
    private _showDict: {[id: string]: Subject<ShowModel[]>} = {};

    constructor(private _http: HttpClient){
        for(let key of BrowseCategories){
            this._showDict[key] = new ReplaySubject();
        }
    }

    public fetchShows(): void{
        this.fetchPopularShows();
        this.fetchNewShows();
        this.fetchTopRatedShows();
        this.fetchTrendingShows();
    }

    public getShows(browseType: string){
        switch(browseType){
            case 'movie':
                return this.getMovies();
            case 'tv':
                return this.getTvShows();
            default:
                return this._showDict;
        }
    }

    

    public emitBrowseType(type: string): void{
        this._browseType$.next(type);
    }

    public getBrowseType(): Observable<string>{
        return this._browseType$.asObservable();
    }

    public getMovieDetails(id: number){
        const params = new HttpParams({fromString: `api_key=${this._apiKey}`});
        return this._http.get<MovieDetailModel>(this._baseUrl + `/movie/${id}`, {responseType: 'json', params});
    }

    public getTvShowDetails(id:number){
        const params = new HttpParams({fromString: `api_key=${this._apiKey}`});
        return this._http.get<TvDetailModel>(this._baseUrl + `/tv/${id}`, {responseType: 'json', params});
    }

    


    private getMovies(){
        let showDict : {[id: string]: Observable<ShowModel[]>} = {};
        for(let key of Object.keys(this._showDict)){
            showDict[key] = this._showDict[key].asObservable()
            .pipe(map(shows => shows.filter(show => show.media_type === 'movie')));
        }
        return showDict;
    }

    private getTvShows(){
        let showDict : {[id: string]: Observable<ShowModel[]>} = {};
        for(let key of Object.keys(this._showDict)){
            showDict[key] = this._showDict[key].asObservable()
            .pipe(map(shows => shows.filter(show => show.media_type === 'tv')));
        }
        return showDict;
    }

    private fetchPopularShows(){
        const params = new HttpParams({fromString: `api_key=${this._apiKey}`});
        this._http.get<ResponseWrapper<ShowModel[]>>(
            this._baseUrl + 'movie/popular', 
            {responseType: 'json', params}
        )
        .pipe(
            map((res) => {
                return res.results.map((show) => {
                    return {...show, media_type : 'movie'}
                })
            }),
            mergeMap((value) => {
                return this._http.get<ResponseWrapper<ShowModel[]>>(this._baseUrl + 'tv/popular', {responseType: 'json', params})
                .pipe(
                    map((res) => {
                    const tv = res.results.map((show) => {return {...show,media_type: 'tv'}});
                    return value.concat(tv).sort((a,b) => Number(b.popularity) - Number(a.popularity))
                    }),
                    tap(shows => this._showDict[BrowseCategories[0]].next(shows))
                );
            })
        ).subscribe();
    }

    private fetchTrendingShows() {
        const params = new HttpParams({fromString: `api_key=${this._apiKey}`});
        return this._http.get<ResponseWrapper<ShowModel[]>>(this._baseUrl + 'trending/all/day', {responseType: 'json', params})
        .pipe(
            tap(res => this._showDict[BrowseCategories[2]].next(res.results))
        ).subscribe();
    }

    private fetchNewShows() {
        const params : HttpParams = new HttpParams({fromString: `api_key=${this._apiKey}`});
        return this._http.get<ResponseWrapper<ShowModel[]>>(
            this._baseUrl + 'movie/now_playing', {responseType: 'json', params}
        ).pipe(
            map(res => {
                return res.results.map(show => { return {...show, media_type: 'movie'}})
            }),
            mergeMap((value)=> {
                return this._http.get<ResponseWrapper<ShowModel[]>>(
                    this._baseUrl + 'tv/on_the_air', {responseType: 'json', params}
                ).pipe(
                    map(res => {
                        const tv: ShowModel[] = res.results.map(show => {return {...show,media_type: 'tv'}})
                        return value.concat(tv).sort((a, b) => a.id - b.id);
                    }),
                    tap(shows => this._showDict[BrowseCategories[1]].next(shows))
                )
            })
        ).subscribe();
    }

    private fetchTopRatedShows() {
        const params : HttpParams = new HttpParams({fromString: `api_key=${this._apiKey}`});
        return this._http.get<ResponseWrapper<ShowModel[]>>(
            this._baseUrl + 'movie/top_rated', {responseType: 'json', params}
        ).pipe(
            map(res => {
                return res.results.map(show => { return {...show, media_type: 'movie'}})
            }),
            mergeMap((value: ShowModel[])=> {
                return this._http.get<ResponseWrapper<ShowModel[]>>(
                    this._baseUrl + 'tv/top_rated', {responseType: 'json', params}
                ).pipe(
                    map(res => {
                        const tv: ShowModel[] = res.results.map(show => {return {...show,media_type:'tv'}});
                        return value.concat(tv).sort((a,b) => Number(b.vote_average) - Number(a.vote_average))
                    }),
                    tap((shows) => this._showDict[BrowseCategories[3]].next(shows))
                )
            })
        ).subscribe();
    }

    
}