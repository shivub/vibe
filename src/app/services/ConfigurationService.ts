import { Injectable } from '@angular/core'
import { API_KEY, BASE_URL } from "../shared/constants/category.const";
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, ReplaySubject, Subject } from 'rxjs';
import {ConfigurationModel} from '../models/ConfigurationModel';
@Injectable({
    providedIn: 'root'
})
export class ConfigurationService{
    private _baseUrl = BASE_URL;
    private _configurationSubject: ReplaySubject<ConfigurationModel> = new ReplaySubject();
    constructor(private _http: HttpClient){}

    public fetchImageConfiguration(): void{
        const httpParams: HttpParams = new HttpParams({fromString: `api_key=${API_KEY}`});
        this._http.get(
            this._baseUrl + 'configuration',
            {params: httpParams, responseType: 'json'}
        ).subscribe((res)=> {
            this._configurationSubject.next(res as ConfigurationModel);
        })
    }

    public getImageConfiguration(): Observable<ConfigurationModel>{
        return this._configurationSubject.asObservable();
    }
}