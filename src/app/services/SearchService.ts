import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, of, Subject } from "rxjs";
import { ResponseWrapper } from "../models/ResponseWrapper";
import { ShowModel } from "../models/ShowModel";
import { API_KEY, BASE_URL } from "../shared/constants/category.const";

@Injectable({providedIn: "root"})
export class SearchService{
    private _searchEmitter: Subject<string> = new Subject();
    private _baseUrl : string  = BASE_URL;
    constructor(private _http: HttpClient){}

    public searchAll(text:string): Observable<ShowModel[]>{
        const params = new HttpParams()
        .set('api_key', API_KEY)
        .set('query', text)
        return this._http.get<ResponseWrapper<ShowModel[]>>(
            this._baseUrl + 'search/multi', 
            {responseType: 'json', params}
            )
            .pipe(
                map((response: ResponseWrapper<ShowModel[]>) => 
                {return response.results;}
                )
            );
    }

    public searchMovies(){}

    public searchTv(){}

    public emitSearchEmitter(text: string){
        this._searchEmitter.next(text);
    }

    public getSearchEmitter(){
        return this._searchEmitter.asObservable();
    }

}