import { Injectable } from "@angular/core";
import { TvDetailModel } from "../models/TvDetailModel";

const STORAGE_KEY = "Tv_Shows"
@Injectable({providedIn: 'root'})
export class LocalTvService{

    private tvList!: TvDetailModel[];
    constructor(){
        if(!localStorage.getItem(STORAGE_KEY)){
            this.tvList = []
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tvList));
        }
        else {
            this.tvList = JSON.parse(localStorage.getItem(STORAGE_KEY)??'');
        }
    }

    public saveTvShow(tv: TvDetailModel){
        tv.id = this.tvList.length + 1;
        this.tvList = [...this.tvList, tv];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tvList));
    }

    public getTvShow(){
        return this.tvList;
    }
}