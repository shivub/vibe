import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, of } from "rxjs";
import { ResponseWrapper } from "../models/ResponseWrapper";
import { ReviewModel } from "../models/ReviewModel";
import { API_KEY, BASE_URL } from "../shared/constants/category.const";
const STORAGE_KEY = "reviews"
@Injectable({providedIn: 'root'})
export class ReviewService{

    private _reviewList: ReviewModel[] = [];
    private _baseUrl = BASE_URL;
    private _apiKey = API_KEY;

    constructor(private _http: HttpClient){
        if(!localStorage.getItem(STORAGE_KEY)){
            localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
        }
        else {
            this._reviewList = JSON.parse(localStorage.getItem(STORAGE_KEY)??'');
        }
    }

    public saveReview(review: ReviewModel){
        review.id = 'R-' + this._reviewList.length + 1;
        this._reviewList = [... this._reviewList, review];
        localStorage.setItem(STORAGE_KEY,JSON.stringify(this._reviewList));
    }

    public getMovieReviews(id: number) {
        const reviewList = JSON.parse(localStorage.getItem(STORAGE_KEY)?? '') as ReviewModel[];
        const reviews: ReviewModel[] = reviewList?.filter((review) => {return review.mediaType === 'movie' && review.showId === id});

        const params = new HttpParams({fromString: `api_key=${this._apiKey}`});
        return this._http.get<ResponseWrapper<ReviewModel[]>>(
            this._baseUrl + `movie/${id}/reviews`,
            {responseType: 'json', params}
            ).pipe(
                map(res => {
                    res.results = res.results.concat(reviews);
                    return res;
                })
            );
    }

    public getTvReviews(id: number) {
        const reviewList = JSON.parse(localStorage.getItem(STORAGE_KEY)?? '') as ReviewModel[];
        const reviews: ReviewModel[] = reviewList?.filter((review) => {return review.mediaType === 'tv' && review.showId === id})

        const params = new HttpParams({fromString: `api_key=${this._apiKey}`});
        return this._http.get<ResponseWrapper<ReviewModel[]>>(
            this._baseUrl + `tv/${id}/reviews`,
            {responseType: 'json', params}
            ).pipe(
                map(res => {
                    res.results = res.results.concat(reviews);
                    return res;
                })
            );
    }
}